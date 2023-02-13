const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'avatar',
    permissions: [],
    aliases: ["av"],
    cooldown: 0,
    category: 'fun',
    description: {
        usage: ".av <member>",
        content: "Shows a user's avatar",
        examples: ['.av @Phenomenal Woman']
    },
    execute(client, message, args, Discord, profileData) {
        if (!message.mentions.users.size) {
            const embed= new MessageEmbed()
                .setTitle(message.author.username)
                .setColor(0x00ffff)
                .setImage(message.author.displayAvatarURL({
                    format: 'png'
                }));
            return message.reply({embeds:[embed]});
        }

        const mention = message.mentions.members.first();
        const Embed= new MessageEmbed()
            .setTitle(message.mentions.users.first().username)
            .setColor(0x00ffff)
            .setImage(mention.user.displayAvatarURL({
                format: 'png'
            }));
        return message.reply({embeds:[Embed]});

    },
};