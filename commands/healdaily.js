const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const items = require('../shopItems.js')
const {
	MessageEmbed,
	MessageActionRow
} = require('discord.js')
const intValues = require('../intValues')
const {
	levels
} = require('../xpLevels')

module.exports = {
	name: "healdaily",
	permissions: [],
	aliases: ['hdl'],
	cooldown: 86400,
	category: 'economy',
	description: {
		usage: '.healdaily',
		content: "Max your HP one time every day",
		examples: ['.hdl']
	},
	async execute(client, message, args, Discord, profileData) {
		let model = await profileModel.findOne({
			userID: message.author.id
		})
		let currentHealth = model.character[2].health
		let maxhealth = model.character[2].maxHealth

		let query = {
			userID: message.author.id
		}
		let updateDoc = {
			$set: {
				"character.2.health": maxhealth
			}
		}
		await profileModel.updateOne(query, updateDoc)
		let diff = Math.round(maxhealth - currentHealth)
		message.reply(`You healed for **${diff} HP**`)
	}
}