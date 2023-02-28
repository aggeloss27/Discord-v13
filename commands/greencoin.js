const profileModel = require("../models/profileSchema");
const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'greencoins',
  permissions: [],
  aliases: ['gc'],
  cooldown: 0,
  category: 'economy',
  description: {
    usage: ".greencoins <option> <ammount>",
    content: "Exchange your normal coins for some green weird stuff",
    examples: ['.gc buy 1']
  },
  async execute(client, message, args, Discord, profileData) {
    if(args[0] === 'buy') {
      let canbebought = Math.round(profileData.coins / 1000000000)
      await profileModel.findOneAndUpdate({
        userID: message.author.id
      }, {
        $inc: {
          coins: -Math.round((canbebought * 1000000000)),
          greenCoins: canbebought
        },
      });
      message.reply(`You bought **${canbebought}** green coins`)
    } else if (args[0] === 'sell') {
      let currentgc = profileData.greenCoins
      await profileModel.findOneAndUpdate({
        userID: message.author.id
      }, {
        $inc: {
          coins: Math.round(currentgc * 500000000),
          greenCoins: -currentgc
        },
      });
      message.reply(`You sold **${currentgc}** green coins for **${(currentgc * 500000000).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`)
    } else if (args[0] === 'vip' && profileData.greenCoins >= 25) {
      const userRoles = message.member.roles;
      await userRoles.add("942530127840047185")
      await profileModel.findOneAndUpdate({
        userID: message.author.id
      }, {
        $inc: {
          greenCoins: -25
        },
      });
      message.channel.send(`**<@${message.author.id}>** just became a VIP for **25 green coins**`)
    }
  }
}