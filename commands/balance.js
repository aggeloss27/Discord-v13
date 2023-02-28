const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "balance",
  permissions: [],
  aliases: ['bal', 'money'],
  cooldown: 0,
  category: 'economy',
  description: {
    usage: '.bal',
    content: "Check the user balance",
    examples: ['.bal']
  },
  execute(client, message, args, Discord, profileData) {

    //let coins = profileData.coins
    //.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const embed = new MessageEmbed()
      .setColor('#5DC21E')
      .setTitle(message.author.username + "'s balance", message.member.user.displayAvatarURL)
      .setDescription("") //21B46F
      .addFields({
        name: "Wallet",
        value: `**${profileData.coins.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $**`,
        inline: true
      }, {
        name: "🟢 𝓒𝓸𝓲𝓷𝓼",
        value: `**${profileData.greenCoins.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`,
        inline: true
      }, {
        name: "Bank",
        value: `**${profileData.bank.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $**`,
        inline: false
      },

      )

    message.reply({ embeds: [embed] })
  }

}