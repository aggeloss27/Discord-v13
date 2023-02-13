const profileModel = require("../models/profileSchema");
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'withdraw',
    permissions: [],
    aliases: ["wd"],
    cooldown: 0,
    category: 'economy',
    description: {
        usage: '.deposit <ammount>',
        content: 'Withdraw coins from your bank',
        examples: ['.withdraw 647']
    },
    async execute(client, message, args, Discord, profileData) {
        
        const amm = args[0];
        if (amm % 1 != 0 || amm <= 0) return //message.reply({content:"**Please enter a valid number**"})

        try {
            if (amm > profileData.bank) return message.reply({content:"You don't have that ammount of coins !"});
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    coins: amm,
                    bank: -amm
                }
            });

            return message.reply({content:`You withdrawn **${amm} $** from your bank`})
        } catch (err) {
            console.log(err)
        }
    }
}