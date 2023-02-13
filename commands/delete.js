const profileModel = require("../models/profileSchema");
module.exports = {
    name: 'delete',
    permissions: [],
    aliases: [],
    cooldown: 0,
    category: 'utility',
    description: {
        usage: ".delete <option>",
        content: "Delete your account from the bot's database",
        examples: ['.delete account']
    },
    async execute(client, message, args, Discord, profileData){
        if(!profileData) return
        if(!args) return

        if(args.length && args[0] === 'account'){
            try{
                const response = await profileModel.findOneAndDelete({
                    userID: message.author.id,
                })
    
                message.reply(`**${message.author.username}**, your account has been deleted`);
            } catch (err) {
                console.log(err);
            }
            
            

        }
  }
}