const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "balance",
    permissions: [],
    aliases: ['bal', 'money'],
    cooldown: 0,
    category: 'economy',
    description: {
        usage: '.bal',
        content: "Check the user balance",
        examples: ['.bal']
    },
    execute(client, message, args, Discord, profileData) {
        if(!profileData){
            return message.reply(`**${message.author.username}** use **.createaccount** to be in the economy system`)
        }
        //let coins = profileData.coins
        //.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        const embed= new MessageEmbed()
            .setColor('#3262da')
            .setTitle(message.author.username + "'s balance", message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription("") //21B46F
            .addFields({
                    name: "Wallet",
                    value: `**${profileData.coins.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $**`,
                    inline: false
                }, {
                    name: "Bank",
                    value: `**${profileData.bank.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $**`,
                    inline: false
                }

            )

        message.reply({embeds:[embed]})
    }

}