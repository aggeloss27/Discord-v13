const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const items = require("../shopItems.js");
const fishList = require("../fishList.js");
const { MessageEmbed, MessageActionRow } = require("discord.js");

module.exports = {
  name: "fish",
  permissions: [],
  aliases: [],
  cooldown: 35,
  category: "economy",
  description: {
    usage: ".fish <option>",
    content: "Fish in the sea to find what lives there or to see the prices",
    examples: [".fish catch", ".fish price"],
  },
  async execute(client, message, args, Discord, profileData) {
    if (!args[0]) return message.reply(`**Wrong syntax** use .help fish`);

    let successChance = Math.random();

    if (args[0] === "catch") {
      inventory.findOne({ userID: message.author.id }, async (err, data) => {
        if (data) {
          const hasItem = Object.keys(data.Inventory).includes("fishing rod");
          if (!hasItem) {
            return message.reply(
              `<@${message.author.id}> you **don't** have a fishing rod`
            );
          } else {
            //--------------------------------
            if (successChance <= 0.78) {
              function getRandomFish() {
                const raritySum = fishList.reduce(
                  (sum, fish) => sum + fish.rarity,
                  0
                );
                const randomNum = Math.floor(Math.random() * raritySum) + 1;

                let currentSum = 0;
                for (let i = 0; i < fishList.length; i++) {
                  currentSum += fishList[i].rarity;
                  if (randomNum <= currentSum) {
                    return fishList[i];
                  }
                }
              }

            } else {
              return message.reply("**Nice try** but the fish just don't like you");
            }
            let fishName = getRandomFish().name.toLowerCase()


            const hasFish = Object.keys(data.Inventory).includes(
              String(fishName)
            );
            if (!hasFish) {
              data.Inventory[fishName] = 1;
            } else {
              data.Inventory[fishName]++;
            }
            await inventory.findOneAndUpdate({ userID: message.author.id }, data);
            message.reply(`You caught a **${fishName}**`);
          }


        } else {
          return message.reply(
            `<@${message.author.id}> you **don't** have a fishing rod`
          );
        }
      });
    } else if (args[0] === "price") {
      let list = fishList.map((value, index) => {
        return `**${index + 1}**) **${value.name}** - *${value.value}*\n`;
      });

      let em = new MessageEmbed()
        .setColor("#5DC21E")
        .setTitle("🐟 Fish Market")
        .setDescription(String(list).replaceAll(",", ""));
      message.channel.send({ embeds: [em] });
    }
  },
};
