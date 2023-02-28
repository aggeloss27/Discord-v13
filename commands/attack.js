const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const items = require('../shopItems.js')
const {
	MessageEmbed,
	MessageActionRow
} = require('discord.js')
const intValues = require('../intValues')
module.exports = {
	name: "attack",
	permissions: [],
	aliases: ['att', 'fight'],
	cooldown: 15,
	category: 'economy',
	description: {
		usage: '.attack',
		content: "Attack some random mobs to earn xp and/or items",
		examples: ['.attack']
	},
	async execute(client, message, args, Discord, profileData) {
		let questionembed = new MessageEmbed()
			.setTitle('**What would you want to attack?**')
			.setDescription(`0️⃣ Zombies\n1️⃣ Spiders\n2️⃣ Golems`)
			.setColor("#5DC21E")
		let availableOptions = [{
			name: 'zombies',
			minattack: 0,
			maxattack: 14,
			minxp: 3,
			maxxp: 8
		}, {
			name: 'spiders',
			minattack: 4,
			maxattack: 16,
			minxp: 5,
			maxxp: 9
		}, {
			name: 'golems',
			minattack: 48,
			maxattack: 54,
			minxp: 17,
			maxxp: 24
		}]

		message.reply({
			embeds: [questionembed]
		}).then((em) => {
			em.react('0️⃣')
			em.react('1️⃣')
			em.react('2️⃣')

			const filter = (reaction, user) => {
				return ['0️⃣', '1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id === message.author.id
			}
			let mobsChoice;

			em.awaitReactions({
					filter,
					max: 1,
					time: 20000,
					errors: ['time']
				})
				.then(async collected => {
					let emoji = collected.first().emoji.name
					if (emoji === '0️⃣') {
						mobsChoice = availableOptions[0].name
					} else if (emoji === '1️⃣') {
						mobsChoice = availableOptions[1].name
					} else if (emoji === '2️⃣') {
						mobsChoice = availableOptions[2].name
					}
					message.reply(`You chose to fight the **${mobsChoice}**`)

					let responseTitle = `You defeated the ${mobsChoice}`;
					let responeDesc;

					let successChance;
					let model = await profileModel.findOne({
						userID: message.author.id
					})
					let mobStats = availableOptions.find((mob) => mob.name.toLowerCase() === mobsChoice)
					//console.log(mobStats)
					if ((model.character[1].damage - 5) > mobStats.maxattack) {
						successChance = 69
					} else {
						successChance = Math.random()
					}

					let mobDamage;
					let xp

					if (successChance > 0.23 && successChance !== 69) {
						xp = Math.floor(Math.random() * (mobStats.maxxp - mobStats.minxp + 1)) + mobStats.minxp
						mobDamage = Math.floor(Math.random() * (mobStats.maxattack - mobStats.minattack + 1)) + mobStats.minattack
						responseDesc = `You got **${xp} xp** but lost **${mobDamage} health**`
					} else if (successChance === 69) {
						xp = Math.floor(Math.random() * (mobStats.maxxp - mobStats.minxp + 1)) + mobStats.minxp
						mobDamage = 0
						responseDesc = `You got **${xp} xp** without taking any damage`
					} else {
						xp = 0
						mobDamage = (Math.floor(Math.random() * (mobStats.maxattack - mobStats.minattack + 1)) + mobStats.minattack) + 7
						responseDesc = `You got couldn't defeat the ${mobStats.name} and lost **${mobDamage} damage**`
					}
					if ((model.character[2].health - mobDamage) <= 1) return message.reply(`You do not have enough HP to go into battle`)
					let query = {
						userID: message.author.id
					}
					let updateDoc = {
						$inc: {
							"character.2.health": -mobDamage,
							'character.3.currentxp': xp
						}
					}
					await profileModel.updateOne(query, updateDoc)

					let replyembed = new MessageEmbed()
						.setColor('#5DC21E')
						.setDescription(String(responseDesc))
					message.reply({
						embeds: [replyembed]
					})
				})
		})
	}
}