const profileModel = require("../models/profileSchema");
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "roullete",
  permissions: [],
  aliases: ['roul'],
  cooldown: 0,
  category: "economy",
  description: {
    usage: ".roullete <colour> <money>",
    content: "Play the roullete and try your luck !",
    examples: [".roullete red 500"],
  },
  async execute(client, message, args, Discord, profileData) {

    function isOdd(num) {
      if (num % 2 == 0) return false;
      else if (num % 2 == 1) return true;
    }

    let colour = args[0];
    let money = args[1];
    let moneydb = profileData.coins;

    let random = Math.floor(Math.random() * 37);

    let moneyhelp = new MessageEmbed()
      .setColor("#5DC21E")
      .setTitle(
        `❌ Specify an amount to gamble`
      );

    let moneymore = new MessageEmbed()
      .setColor("#5DC21E")
      .setTitle(
        `❌ You are betting more than you have`
      );

    let colorbad = new MessageEmbed()
      .setColor("#5DC21E")
      .setTitle(
        `❌ Specify a color | Red [1.5x] Black [2x] Green [15x]`
      );

    if (!colour) return message.channel.send({ embeds: [colorbad] });
    colour = colour.toLowerCase();
    
    if(money == 'all') {money = profileData.coins} 
    else if (money < 250 || money > 10000000) {
      let bfyw = 10000000 
        return message.reply(`The minimum bet is **250** and the maximum bet is **${bfyw.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`)
    }
    if (!money) return message.channel.send({ embeds: [moneyhelp] });
    
    
    if (money > moneydb) return message.channel.send({ embeds: [moneymore] });

    if (colour == "b" || colour.includes("black")) colour = 0; //deafult 0
    else if (colour == "r" || colour.includes("red")) colour = 1; //deafult 1
    else if (colour == "g" || colour.includes("green")) colour = 2; //deafult 2
    else return message.channel.send({ embeds: [colorbad] });

    if (random == 0 && colour == 2) {
      // Green
      money *= 15;
      let response1 = await profileModel.findOneAndUpdate({
        userID: message.author.id,
      }, {
        $inc: {
          coins: money,
        },
      });;
      let moneyEmbed1 = new MessageEmbed()
        .setColor("#5DC21E")
        .setTitle(
          `**🟢  You won ${money} coins**`
        )
        .setDescription("*Multiplier: 15x*")
      message.channel.send({ embeds: [moneyEmbed1] });
      //console.log(`${message.author.tag} Won ${money} on green`);
    } else if (isOdd(random) && colour == 1) {
      // Red
      money = parseInt(money * 1.5);
      let response2 = await profileModel.findOneAndUpdate({
        userID: message.author.id,
      }, {
        $inc: {
          coins: money,
        },
      });;
      let moneyEmbed2 = new MessageEmbed()
        .setColor("#5DC21E")
        .setTitle(
          `**🔴  You won ${money} coins**`
        )
        .setDescription("*Multiplier: 1.5x*")
      message.channel.send({ embeds: [moneyEmbed2] });
    } else if (!isOdd(random) && colour == 0) {
      // Black
      money = parseInt(money * 2);
      let response3 = await profileModel.findOneAndUpdate({
        userID: message.author.id,
      }, {
        $inc: {
          coins: money,
        },
      });;
      let moneyEmbed3 = new MessageEmbed()
        .setColor("#5DC21E")
        .setTitle(
          `**⚫  You won ${money} coins**`
        )
        .setDescription("*Multiplier: 2x*")
      message.channel.send({ embeds: [moneyEmbed3] });
    } else {
      // Wrong
      let response4 = await profileModel.findOneAndUpdate({
        userID: message.author.id,
      }, {
        $inc: {
          coins: -money,
        },
      });;
      let moneyEmbed4 = new MessageEmbed()
        .setColor("#5DC21E")
        .setTitle(
          `**❌  You lost ${money} coins**`
        )
        .setDescription("*Multiplier: 0x*")
      message.channel.send({ embeds: [moneyEmbed4] });
    }
  },
};

