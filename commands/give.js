const profileModel = require("../models/profileSchema");
module.exports = {
    name: 'give',
    permissions: [],
    aliases: [],
    cooldown: 0,
    category: 'economy',
    description: {
        usage: ".give <player> <ammount>",
        content: "Give coins to another player",
        examples: ['.give @aggeloss 500']
    },
    async execute(client, message, args, Discord, profileData){
        if(!profileData){
            return message.reply(`**${message.author.username}** use **.createaccount** to be in the economy system`)
        }
        const target = message.mentiont.members.first();
        if(!target || !target.profileData) return;

        const coinsAmm = args[1]
        if(!coinsAmm) return;

        if(isNaN(coinsAmm)) return

        const convertedAmm = parseInt(coinsAmm)
        if (profileData.coins < convertedAmm) return;

        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                coins: -convertedAmm,
            },
        });
        const response2 = await profileModel.findOneAndUpdate({
            userID: target.id,
        }, {
            $inc: {
                coins: Math.round(convertedAmm / 2.65),
            },
        });

        message.reply({content: [`**${message.author.username}** gave \`${convertedAmm}\` to **${target.username}**`]})
  }
}