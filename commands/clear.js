const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'clear',
  permissions: ["ADMINISTRATOR"],
  aliases: [],
  cooldown: 20,
  category: 'utility',
  description: {
    usage: '.clear <ammount>',
    content: 'Clears messages!',
    examples: ['.clear 69']
  },
  async execute(client, message, args, Discord, profileData) {
    if (!args[0]) return //message.channel.send({content:`**${message.author.username}**, please enter a number`});
    if (isNaN(args[0])) return //message.channel.send({content:`**${message.author.username}**, please enter a number`});
    if (args[0] > 100) return //message.channel.send({content:`The delete limit is 100 messages !`});
    if (args[0] < 1) return //message.channel.send({content: `You must delete at least one message !`});

    await message.channel.messages.fetch({
      limit: args[0]
    }).then(messages => {
      message.delete()
      message.channel.bulkDelete(messages)
      let em = new MessageEmbed()
        .setTitle("Clear command")
        .setColor("#5DC21E")
        .setDescription(`Cleared **${args[0]}** messages`)
      message.channel.send({ embeds: [em] })
        .then(msg => {
          setTimeout(() => msg.delete(), 5000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    });
  }
}