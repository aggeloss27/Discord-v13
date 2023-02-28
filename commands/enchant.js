const profileModel = require("../models/profileSchema");
const { MessageEmbed, MessageActionRow } = require("discord.js");
const inventory = require("../models/inventory");
module.exports = {
  name: "enchant",
  permissions: [],
  aliases: ["ench", "evolve", "ignite"],
  cooldown: 25,
  category: "economy",
  description: {
    usage: ".enchant <item>",
    content: "Enchant an item to its next form",
    examples: [".enchant rose"],
  },
  async execute(client, message, args, Discord, profileData) {
    const itemsCanBeEnch = ["rose"];
    let argsItem = args.join(" ");
    itemToEnchant = argsItem.split(" ").slice(0, 2).join(" ").toLowerCase();

    if (!itemsCanBeEnch.includes(String(itemToEnchant)))
      return message.reply(`You can't enchant this item`);

    inventory.findOne({ userID: message.author.id }, async (err, data) => {
      if (data) {
        const userHasVenom = Object.keys(data.Inventory).includes("dark venom");
        if (userHasVenom) {
          data.Inventory[itemToEnchant]--;
          data.Inventory["dark venom"]--;

          let userHasBlackRose = Object.keys(data.Inventory).includes(
            "black rose"
          );
          if (userHasBlackRose) {
            data.Inventory["black rose"]++;
          } else {
            data.Inventory["black rose"] = 1;
          }
          await inventory.findOneAndUpdate({ userID: message.author.id }, data);
        } else {
          return message.reply(`You don't have **dark venom**`);
        }
      } else {
        return message.reply(`You don't have **dark venom**`);
      }
      message.reply(`You turned a **${itemToEnchant}** into a **black rose**`);
    });
  },
};
