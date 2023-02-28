const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const items = require('../shopItems.js')
const {
	MessageEmbed,
	MessageActionRow
} = require('discord.js')
const intValues = require('../intValues')
const {levels} = require('../xpLevels')

module.exports = {
	name: "levelup",
	permissions: [],
	aliases: [],
	cooldown: 45,
	category: 'economy',
	description: {
		usage: '.levelup',
		content: "If you have enough xp, level up",
		examples: ['.levelup']
	},
	async execute(client, message, args, Discord, profileData) {
    let model = await profileModel.findOne({userID: message.author.id})

    let level = model.character[3].level
    let currentxp = model.character[3].currentxp

    let playerLevel = levels.find((lvl) => lvl.level === level)
    //console.log(playerLevel)
    let reqxp = playerLevel.requiredxp

    if(currentxp >= reqxp && level<20) {
      let levelupembed = new MessageEmbed()
      .setColor('#5DC21E')
      .setTitle(`Level UP`)

      let query = {
						userID: message.author.id
					}
					let updateDoc = {
						$inc: {
							"character.3.level": +1,
							'character.3.currentxp': -reqxp
						}
					}
					await profileModel.updateOne(query, updateDoc)
      levelupembed.setDescription(`You leveled up **1 level** for **${reqxp} xp points**`)
      message.reply({embeds: [levelupembed]})
    } else {
      message.reply(`You can not level up`)
    }
  }
}