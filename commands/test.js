module.exports = {
  name: 'test',
  permissions: [],
  aliases: [],
  cooldown: 0,
  category: 'utility',
  description: {
    usage: ".test",
    content: "Test if everything is ok !",
    examples: ['.test']
  },
  async execute(client, message, args, Discord, profileData) {
    message.channel.send(`**${message.author.username}** Everything is ok`)
  }
}