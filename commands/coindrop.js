const profileModel = require("../models/profileSchema");
const { MessageEmbed, MessageActionRow } = require('discord.js')
module.exports = {
  name: "coindrop",
  permissions: ['ADMINISTRATOR'],
  aliases: ['coinbomb', 'dropbomb'],
  cooldown: 0,
  category: 'economy',
  description: {
    usage: '.coindrop',
    content: "Drop a coin drop in a channel",
    examples: ['.dropbomb']
  },
  async execute(client, message, args, Discord, profileData) {
    const channel = message.mentions.channels.first()
    if(!channel) return

    const coinsammount = args[1]
    if(!coinsammount) return

    const filter = (msg) => msg.guild.id === message.guild.id && msg.content === `claim`
    message.channel.send(`**@everyone a coin bomb has started**.\nFind the channel and use \`claim\` to win the coins`)

    channel.send('💣')

    const collector = channel.createMessageCollector({filter, max: 1, time: 60000})
    
    collector.on('collect',async msg => {
        const id = msg.author.id
        const coinsToClaim = parseInt(coinsammount)

        const response = await profileModel.findOneAndUpdate({
          userID: id,
        }, {
          $inc: {
            coins: coinsToClaim,
          },
        });

        msg.channel.send(`**${msg.author.username}** you have claimed the coin bomb`)
    })
  }
}