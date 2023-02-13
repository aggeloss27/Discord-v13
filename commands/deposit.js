const profileModel = require("../models/profileSchema");
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'deposit',
    permissions: [],
    aliases: ["dep"],
    cooldown: 0,
    category: 'economy',
    description: {
        usage: '.deposit <mmount>',
        content: 'Deposits coins into your bank',
        examples: ['.deposit 1256']
    },
    async execute(client, message, args, Discord, profileData) {
        if(!profileData){
            return message.reply(`**${message.author.username}** use **.createaccount** to be in the economy system`)
        }
        const amm = args[0];
        if (amm % 1 != 0 || amm <= 0) return //message.reply({content:"**Please enter a number**"})

        try {
            if (amm > profileData.coins) return message.reply({content:"You do not have that ammount of coins !"});
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    coins: -amm,
                    bank: amm
                }
            });

            return message.reply({content:`You deposited **${amm} $** into your bank`})
        } catch (err) {
            console.log(err)
        }
    }
}