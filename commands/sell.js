const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const { MessageEmbed, MessageActionRow } = require("discord.js");
const itemValues = require("../intValues.js");
module.exports = {
  name: "sell",
  permissions: [],
  aliases: ["sl"],
  cooldown: 0,
  category: "economy",
  description: {
    usage: ".sell <item> <ammount>",
    content: "Sell your items st the shop",
    examples: [".sell pizza 2"],
  },
  async execute(client, message, args, Discord, profileData) {
    if (!args[0]) return;
    //if(!args[1]) return
    let argsItem = args.join(" ");
    let itemToSell = argsItem.toLowerCase();

    //
    var r = /\d+/;
    let indx3 = itemToSell.match(r);
    if(!indx3) return
    let amm = parseInt(indx3[0])
    //console.log(amm)
    let x
    if (!amm | amm === 1) {
      x = 1
    } else {
      x = amm
    }
    //console.log(`x: ${x}`)

    itemToSell = argsItem.split(' ').slice(0,2).join(' ')
    //console.log(itemToSell)
    

    const validItem = !!itemValues.find(
      (val) => val.item.toLowerCase() === itemToSell
    );
    //console.log(validItem)
    if (!validItem) return;

    try
    {inventory.findOne({ userID: message.author.id }, async (err, data) => {
      if (data) {
        const hasItem = Object.keys(data.Inventory).includes(itemToSell);
        if (hasItem) {
          data.Inventory[itemToSell] -= x;
        } else {
          return message.reply(`You don't have a **${itemToSell}** to sell!`);
        }
        //console.log(data)
        await inventory.findOneAndUpdate({ userID: message.author.id }, data)
        let itemCoins = itemValues.find((val) => (val.item.toLowerCase()) === itemToSell).value
        let itemFinalCoins = Math.round((itemCoins / 2) * x);
        await profileModel.findOneAndUpdate(
          { userID: message.author.id },
          {
            $inc: {
              coins: itemFinalCoins,
            },
          }
        );
        message.reply(
          `You sold **${x} ${itemToSell}(s)** for **${itemFinalCoins}** coins!`
        );
      } else {
        return message.reply(`You don't have a **${itemToSell}** to sell!`);
      }
    }
    )} catch (err) {
      console.log(err);
    }
  }
}
