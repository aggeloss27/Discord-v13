const {
  MessageEmbed
} = require('discord.js')
module.exports = {
  name: 'kick',
  permissions: ["KICK_MEMBERS"],
  aliases: [],
  cooldown: 0,
  category: 'moderation',
  description: {
    usage: '.kick <member>',
    content: 'Kicks a member',
    examples: ['.kick @aggeloss27']
  },
  execute(client, message, args, Discord, profileData) {
    const member = message.mentions.users.first();
    message.delete()
    const memberTarget = message.guild.members.cache.get(member.id);

    memberTarget.kick();
    let em = new MessageEmbed()
      .setTitle(`**${memberTarget.username}** has been **kicked** | \`${memberTarget.id}\``)
      .setColor("#F3CE56")
    message.channel.send({
      embeds: [em]
    })
  }
}