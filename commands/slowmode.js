const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'slowmode',
  permissions: ["MANAGE_MESSAGES"],
  aliases: ["sm"],
  cooldown: 0,
  category: 'utility',
  description: {
    usage: '.slowmode <ammount>',
    content: "Raises or lowers the slowmode in a channel",
    examples: ['.slowmode 90']
  },
  execute(client, message, args, Discord, profileData) {
    if (args[0]) {
      message.channel.setRateLimitPerUser(args[0])
      let em = new MessageEmbed()
        .setTitle("Slowmode Command")
        .setDescription(`Succesfully set the slowmode to **${args[0]} seconds**`)
        .setColor("#5DC21E")
      message.channel.send({ embeds: [em] })

      if (args[0] == 0) {
        message.channel.setRateLimitPerUser(null);
      }
    } else if (!args[0]) {
      return
      //message.channel.send({content:`**${message.author.username}**, please declare how many seconds you want the slowmode to be`})

    } else if (args[0] === 0) return;
  }
}