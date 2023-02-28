const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const { MessageEmbed, MessageActionRow } = require("discord.js");
const itemValues = require("../intValues.js");
module.exports = {
  name: "coinflip",
  permissions: [],
  aliases: ["cflp", 'flip'],
  cooldown: 0,
  category: "economy",
  description: {
    usage: ".coinflip <side> <bet>",
    content: "Flip a coin to test your luck !",
    examples: [".coinflip heads 250"]
  },
  async execute(client, message, args, Discord, profileData) {
     // Get user input for their guess
  let guess = args[0].toLowerCase();
    let amm = parseInt(args[1])
    let bfyw = 10000000
    if (amm < 250 || amm > 10000000) return message.reply(`The minimum bet is **250** and the maximum bet is **${bfyw.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`)
    if (amm % 1 != 0 || amm <= 0) return 
    if (amm > profileData.coins) return message.reply({ content: `You don't have that ammount of coins.` });
  
  // Check if user input is valid
  if (guess !== "heads" && guess !== "tails") {
    message.reply("**Invalid input!** Please enter either `heads` or `tails`.");
    return;
  }
  
  // Generate a random number (0 or 1) to represent heads or tails
  let randomNumber = Math.floor(Math.random() * 2);
  
  // Use the random number to determine the result (0 = heads, 1 = tails)
  let result = (randomNumber === 0) ? "heads" : "tails";
  
  // Check if the user's guess matches the result
  if (guess === result) {
    amm = Math.round(amm * 1.5)
    message.reply(`**You won ${amm} coins!** The result was ` + result + ".");
  } else {
    amm = -amm
    message.reply(`**You lost ${amm} coins!** The result was ` + result + ".");
  }
    await profileModel.findOneAndUpdate({userID: message.author.id}, {
      $inc : {
        coins: amm
      }
    })
  }
}