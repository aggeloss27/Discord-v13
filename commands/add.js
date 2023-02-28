const profileModel = require("../models/profileSchema");
const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'add',
  permissions: ["ADMINISTRATOR"],
  aliases: [],
  cooldown: 0,
  category: 'economy',
  description: {
    usage: ".add <member> <ammount>",
    content: "Add money to a users balance",
    examples: ['.add @aggeloss27 250']
  },
  async execute(client, message, args, Discord, profileData) {
    if (!args.length) return //message.reply({content:"You need to mention a player to give them coins"});
    const amm = args[1]
    const target = message.mentions.users.first();
    if (!target) return //message.reply({content:"**That user does not exist**"})

    if (amm % 1 != 0 || amm <= 0) return message.reply({ content: `Please enter a valid number` })

    try {
      const targetData = await profileModel.findOne({
        userID: target.id
      });
      if (!targetData) return message.reply({ content: `That user doesn't have a bank account` })

      await profileModel.findOneAndUpdate({
        userID: target.id
      }, {
        $inc: {
          coins: amm
        },
      });


      return message.reply({ content: `**${target.username}** recieved **${amm.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}** coins` })
    } catch (err) {
      console.log(err)
    }
  }

}