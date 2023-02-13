const profileModel = require('../models/profileSchema')
module.exports = {
    name: 'createaccount',
    permissions: [],
    aliases: [],
    cooldown: 0,
    category: 'utility',
    description: {
        usage: ".createaccount",
        content: "Create a bank account so you can start interacting with our economy system",
        examples: ['.createaccount']
    },
    async execute(client, message, args, Discord, profileData) {
        profileData = await profileModel.findOne({
            userID: message.author.id
        });
        
        if(!profileData){
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 250,
                bank: 0,
                //company: {
                //    wokers: 1,
                //    company_tier: 1,
                //    hourly_proit: 100
                //}
            });
            profile.save();
    }

        message.reply({
            content: `**${message.author.username}** your account has been created !!!!`
        })
    }
}
