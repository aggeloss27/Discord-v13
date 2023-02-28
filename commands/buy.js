const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const items = require('../shopItems.js')
const { MessageEmbed, MessageActionRow } = require('discord.js')
const intValues = require('../intValues')
module.exports = {
  name: "buy",
  permissions: [],
  aliases: [],
  cooldown: 0,
  category: 'economy',
  description: {
    usage: '.buy',
    content: "Buy an item from the shop!",
    examples: ['.buy']
  },
  async execute(client, message, args, Discord, profileData) {
    let argsItem = args.join(" ");
    let itemToBuy = argsItem.toLowerCase();

    //
    var r = /\d+/;
    let indx3 = itemToBuy.match(r);
    if(!indx3) return
    let amm = parseInt(indx3[0])
    //zconsole.log(amm)
    let x
    if (!amm | amm === 1) {
      x = 1
    } else {
      x = amm
    }
    itemToBuy = argsItem.split(' ').slice(0,2).join(' ')
    //console.log(x)
    //console.log(itemToBuy)

    const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy)
    if(!validItem) return

    const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price

    const userBalance = profileData.coins
    if(userBalance < (itemPrice * x)) return // message.reply

    inventory.findOne({userID: message.author.id}, async(err, data) => {
      if(data) {
        const hasItem = Object.keys(data.Inventory).includes(itemToBuy)
        if(!hasItem) {
          data.Inventory[itemToBuy] += x;
        } else {
          data.Inventory[itemToBuy] += x;
        }
        // console.log(data)
        await inventory.findOneAndUpdate({userID: message.author.id}, data)
      } else {
        new inventory({
          userID: message.author.id,
          Inventory: {
            [itemToBuy]: x
          }
        }
        ).save()
      }
      message.reply(`You have bought **${x} ${itemToBuy}(s)**`)

      const response = await profileModel.findOneAndUpdate({
        userID: message.author.id,
      }, {
        $inc: {
          coins: -(itemPrice * x),
        },
      });
    })
    
  }
}