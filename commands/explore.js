const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const items = require('../shopItems.js')
const {
	MessageEmbed,
	MessageActionRow
} = require('discord.js')
const intValues = require('../intValues')
module.exports = {
	name: "explore",
	permissions: [],
	aliases: [],
	cooldown: 45,
	category: 'economy',
	description: {
		usage: '.explore',
		content: "Explore th uknown to find what may be hiding there",
		examples: ['.explore']
	},
	async execute(client, message, args, Discord, profileData) {
    
  }
}