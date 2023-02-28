const profileModel = require('../models/profileSchema')
const {findExp,levels} = require('../xpLevels')
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
                userName: message.author.username,
                coins: 250,
                bank: 0,
                greenCoins: 0,
                curses: [],
                effects: [],
                character: [
                  {helmet: {name:'empty', armor:0},
                   chestplate: {name:'empty', armor:0},
                   pants: {name: 'empty', armor:0},
                   boots: {name: 'empty', armor:0}
                  }, 
                  {weapon: 'Fists', damage:1, ammo: 0},
                  {health: 100, maxHealth: 100, shield:{name: 'empty', armor:0}, specialProtection: {name: 'empty', armor: 0}},
                  {level: 0, currentxp:0}
                ]
            });
            profile.save();
          message.reply({
            content: `**${message.author.username}** your account has been created !!!!`
        })
    } else {
          return message.reply("You have already created an account")
    }

        
    }
}
