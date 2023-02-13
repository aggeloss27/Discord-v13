const {MessageEmbed} = require('discord.js')
module.exports = {
  name: 'ping',
  permissions: ["ADMINISTRATOR"],
  aliases: [],
  cooldown: 0,
  category: 'utility',
  description: {
    usage: '.ping',
    content: 'This is a basic ping command',
    examples: ['.ping']
  },
  execute(client, message, args, Discord, profileData) {
    try {
      let em = new MessageEmbed()
        .setTitle("Pong!")
        .setColor("#21B46F")
        .setDescription(`The ping is: **${client.ws.ping} ms**`)
      message.channel.send({embeds: [em], allowedMentions: {repliedUser: false}});
    } catch (e) {
      console.log(e)
    }

  }
}