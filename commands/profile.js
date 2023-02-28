const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const items = require('../shopItems.js')
const {
	MessageEmbed,
	MessageActionRow
} = require('discord.js')
const intValues = require('../intValues')

module.exports = {
	name: "profile",
	permissions: [],
	aliases: ['character', 'char'],
	cooldown: 0,
	category: 'economy',
	description: {
		usage: '.profile',
		content: "This command displays your ingmae statistics",
		examples: ['.profile']
	},
	async execute(client, message, args, Discord, profileData) {
    if(!args[0]) return
		if (args[0].toLowerCase() === 'stats' || args[0].toLowerCase() === 'statistics') {
			let model = await profileModel.findOne({
				userID: message.author.id
			})
			let helmet = model.character[0].helmet.name
			let helmetArmor = model.character[0].helmet.armor

			let chestplate = model.character[0].chestplate.name
			let chestplateArmor = model.character[0].chestplate.armor

			let pants = model.character[0].pants.name
			let pantsArmor = model.character[0].pants.armor

			let boots = model.character[0].boots.name
			let bootsArmor = model.character[0].boots.armor

			let weapon = model.character[1].weapon
			let weaponDamage = model.character[1].damage
			let weaponAmmo = model.character[1].ammo

			let health = model.character[2].health
			let maxhealth = model.character[2].maxHealth

			let shield = model.character[2].shield.name
			let shieldArmor = model.character[2].shield.armor

			let specialprotection = model.character[2].specialProtection.name
			let specialprotectionArmor = model.character[2].specialProtection.armor

      let level = model.character[3].level
      let xp = model.character[3].currentxp

			let totalprotection = Math.round(helmetArmor + chestplateArmor + pantsArmor + bootsArmor)

			const numEmojis = 10; // number of emojis in the health bar
			const filledHeartEmoji = "❤️"; // emoji for full health
			const emptyHeartEmoji = "🖤"; // emoji for empty health
			const healthPercent = health / maxhealth; // calculate health percentage

			let healthBar = "";
			const filledCount = Math.round(numEmojis * healthPercent);

			for (let i = 0; i < filledCount; i++) {
				healthBar += filledHeartEmoji;
			}

			for (let i = filledCount; i < numEmojis; i++) {
				healthBar += emptyHeartEmoji;
			}


			let em = new MessageEmbed()
				.setColor('#5DC21E')
				.setTitle(`${message.author.username}'s character`)
				.addFields({
					name: 'Level',
					value: `Characters' level: **${level}**\nCurrent xp: **${xp}**`,
					inline: false
				},{
					name: 'Health ❤',
					value: `**${healthBar}(${health}) / ${maxhealth}, ${Math.round(healthPercent*100)}%** HP\nTotal protection: **${totalprotection}**\n\nShield: **${shield}**\nShield armor: **${shieldArmor}**\nSpecial protection: **${specialprotection}**\nSpecial Protection armor: **${specialprotectionArmor}**`,
					inline: false
				}, {
					name: 'Weapon ⚔',
					value: `Name: **${weapon}**\nDamage: **${weaponDamage}**\nAmmo: **${weaponAmmo}**`,
					inline: false
				}, {
					name: 'Helmet',
					value: `Name: **${helmet}**\nProtection: **${helmetArmor}**`,
					inline: false
				}, {
					name: 'Chestplate',
					value: `Name: **${chestplate}**\nProtection: ${chestplateArmor}`,
					inline: false
				}, {
					name: 'Pants',
					value: `Name: **${pants}**\nProtection: **${pantsArmor}**`,
					inline: false
				}, {
					name: 'Boots',
					value: `Name: **${boots}**\nProtection: **${bootsArmor}**`,
					inline: false
				}, )
			message.channel.send({
				embeds: [em]
			})
		} 
	}
}