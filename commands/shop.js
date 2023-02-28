const items = require('../shopItems.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "shop",
  permissions: [],
  aliases: ['itemlist', 'items'],
  cooldown: 0,
  category: 'economy',
  description: {
    usage: '.shop',
    content: "Check what items are available at the shop",
    examples: ['.items']
  },
  execute(client, message, args, Discord, profileData) {
    //console.log(items)
    if(items.length === 0) return

    const shopList = items
      .map((value, index) => {
        return `**${index+1})** ${value.item} - **${value.price.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}** coins!\n`
      })

    let em = new MessageEmbed()
    .setColor('#5DC21E')
    .setTitle("Today's shop")
    .setDescription(String(shopList).replaceAll(',',''))

    message.channel.send({ embeds : [em]})
  }
}