let {findExp, levels, getPlayerLevel, getXpToLevelUp} = require('../xpLevels')
const profileModel = require('../models/profileSchema')
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
    message.reply(`**${message.author.username}** don't worry everything is fine !`)
  }
}