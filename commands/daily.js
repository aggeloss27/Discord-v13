const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'daily',
    permissions: [],
    aliases: [],
    cooldown: 86400,
    category: 'economy',
    description: {
        usage: ".daily",
        content: "Come back each day for coins!",
        examples: ['.daily']
    },
    async execute(client, message, args, Discord, profileData) {
        
        const profileModel = require("../models/profileSchema");
        const usercoins = profileData.coins
        const number = Math.round((20000 + (usercoins / 25)))
        const respone = await profileModel.findOneAndUpdate({
            userID: message.author.id
        }, {
            $inc: {
                coins: number
            }
        });
        message.reply({content:`**${message.author.username}** recieved **${number.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $** as their daily reward`})
    }
}