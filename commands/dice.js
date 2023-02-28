const Discord = require('discord.js')
const profileModel = require("../models/profileSchema")
const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'dice',
  permissions: [],
  aliases: [],
  cooldown: 45,
  category: 'economy',
  description: {
    usage: ".dice",
    content: "Roll the dice to win coins!",
    examples: ['.dice 250']
  },
  async execute(client, message, args, Discord, profileData) {

    const amm = args[0]
    let bfyw = 10000000
    if (amm < 250 || amm > 10000000) return message.reply(`The minimum bet is **250** and the maximum bet is **${bfyw.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`)
    if (amm % 1 != 0 || amm <= 0) return //message.reply({content:`**${message.author.username}**, please enter a **valid** number`})
    if (amm > profileData.coins) return message.reply({ content: `You don't have that ammount of coins.` });
    Dealerr = Math.floor(Math.random() * 12) + 2

    Playerr = Math.floor(Math.random() * 12) + 2
    let em = new MessageEmbed().setTitle("Dice command")
    if (Dealerr > Playerr) {
      em.addFields({
        name: "Your roll :",
        value: `\`${Playerr}\``,
        inline: true
      }, {
        name: "Dealer's roll :",
        value: `\`${Dealerr}\``,
        inline: true
      })
      em.setColor("#5DC21E")
      let amm2 = -amm
      await profileModel.findOneAndUpdate({
        userID: message.author.id
      }, {
        $inc: {
          coins: amm2
        }
      },);
      message.reply({ embeds: [em] })
      message.reply({ content: `**You lost ${amm2} $**` })
    }
    if (Playerr > Dealerr) {
      em.addFields({
        name: "Your roll :",
        value: `\`${Playerr}\``,
        inline: true
      }, {
        name: "Dealer's roll :",
        value: `\`${Dealerr}\``,
        inline: true
      })
      em.setColor("#5DC21E")
      let amm3 = Math.round(amm * 1.2)
      await profileModel.findOneAndUpdate({
        userID: message.author.id
      }, {
        $inc: {
          coins: amm3
        }
      },);
      message.reply({ embeds: [em] })
      message.reply({ content: `**You won ${amm3} $**` })
    }
  }
}