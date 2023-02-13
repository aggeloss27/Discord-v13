const {
  MessageEmbed
} = require('discord.js')
module.exports = {
  name: 'ban',
  permissions: ["BAN_MEMBERS"],
  aliases: [],
  cooldown: 0,
  category: 'moderation',
  description: {
    usage: '.ban <user>',
    content: 'Bans a member',
    examples: [".ban @aggeloss27"]
  },
  execute(client, message, args, Discord, profileData) {
    const member = message.mentions.users.first();
    message.delete()
    const memberTarget = message.guild.members.cache.get(member.id);
    memberTarget.ban();
    let em = new MessageEmbed()
      .setTitle(`**${memberTarget.username}** has been **banned** | \`${memberTarget.id}\``)
      .setColor("RED")
    message.channel.send({
      embeds: [em]
    })
  }
}