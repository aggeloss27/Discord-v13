const {
  MessageEmbed
} = require('discord.js')
module.exports = {
  name: 'unmute',
  permissions: ["MANAGE_MESSAGES"],
  aliases: [],
  cooldown: 0,
  category: 'moderation',
  description: {
    usage: '.unmute <member>',
    content: "This unmutes a member",
    examples: ['.unmute @aggeloss27']
  },
  execute(client, message, args, Discord, profileData) {
    const target = message.mentions.users.first();
    let mainRole = message.guild.roles.cache.find(role => role.name === 'Members');
    let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

    let memberTarget = message.guild.members.cache.get(target.id);

    memberTarget.roles.remove(muteRole.id);
    message.delete()
    //memberTarget.roles.add(mainRole.id);
    let em = new Discord.MessageEmed()
      .setTitle(`**${memberTarget.username}** has been unmuted`)
      .setColor("#F3CE56")
    message.channel.send({
      embeds: [em]
    });

  }
}