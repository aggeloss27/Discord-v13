const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const itemValues = require('../intValues.js')
const { MessageEmbed, MessageActionRow } = require('discord.js')
module.exports = {
  name: "inventory",
  permissions: [],
  aliases: ['inv'],
  cooldown: 0,
  category: 'economy',
  description: {
    usage: '.inventory',
    content: "A full list of your items",
    examples: ['.inv']
  },
  async execute(client, message, args, Discord, profileData) {
    inventory.findOne({ userID: message.author.id}, async(err, data) =>{
      if(!data) return message.reply(`Your inventory is **empty**`)
      const mappedData = Object.keys(data.Inventory).map((key) =>{
        
        let findObject = itemValues.find((item) => item.item?.toLowerCase() == key )
        let {emoji} = findObject
        
        return `**${emoji} ${key}** -> (${data.Inventory[key]})`
      }).sort().join("\n").toLowerCase()

      let em = new MessageEmbed()
    .setColor('#5DC21E')
    .setTitle(`${message.author.username}'s Inventory`)
    .setDescription(String(mappedData))

    message.channel.send({ embeds : [em]})
      
    })
   
}
}