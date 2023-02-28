const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const items = require('../shopItems.js')
const { MessageEmbed, MessageActionRow } = require('discord.js')
const intValues = require('../intValues')
module.exports = {
  name: "blackmagic",
  permissions: [],
  aliases: ['bm'],
  cooldown: 0,
  category: 'economy',
  description: {
    usage: '.blackmagic <option> <target(optional)>',
    content: "Use a black magic item to cast some dark spells",
    examples: ['.blackmagic steal']
  },
  async execute(client, message, args, Discord, profileData) {
    let magicOption = args[0]
    if(!magicOption) return
    let target = message.mentions.users.first();

    let availableMagicOptions = ['steal']
    if(!availableMagicOptions.includes(String(magicOption).toLowerCase())) return message.reply(`You can't do that!`)

    inventory.findOne({ userID: message.author.id }, async (err, data) => {
      if (data) {
        const userHasBlackRose = Object.keys(data.Inventory).includes("black rose");
        if(userHasBlackRose) {
          data.Inventory['black rose']--
        } else {
          return message.reply(`You do not have a black rose`)
        }
        await inventory.findOneAndUpdate({userID: message.author.id}, data)
      } else {
        return message.reply(`You do not have a black rose`)
      }
    }
  )
  }
}