const mongoose = require('mongoose')
const Discord = require('discord.js')
const warnSchema = require('../models/warnSchema')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'deletewarning',
    permissions: ["BAN_MEMBERS"],
    aliases: ['delwarn'],
    cooldown: 0,
    category: 'utility',
    description: {
        usage: '.deletewarning <warning ID>',
        content: "Remove a user's warning",
        examples: ['.deletewarning ']
    },
    async execute(client, message, args, Discord, profileData) {
        const punishmentID = args[0];

        if (!punishmentID) return //{message.channel.send({content:"Please provide a warning ID to delete"})}

        try {
            const results = await warnSchema.findOne({
                punishmentIDE: [`${punishmentID}`]
            })
            if (results == null) {
                return message.channel.send({content:`That is not a valid ID`})
            }
            await warnSchema.deleteMany({
                punishmentIDE: [`${punishmentID}`]
            })

            message.delete()

            message.channel.send({content:`**The warning with the punishment ID:** \`${punishmentID}\` **has been cleared**`})

            //const authore = message.member
            //const channele = message.guild.channels.cache.find(c => c.name === '📜┃moderation-logs')
            //const log= new MessageEmbed()
            //    .setColor("#F3CE56")
            //    .setTitle("A members warning has been deleted")
            //    .addField(`Punishment ID: \`${punishmentID}\``)
            //    .addField(`Author: ${authore.user.username}`)
            //    .setFooter({text: `${authore.user.username}`} , authore.user.displayAvatarURL({
            //        dynamic: true
            //    }))
            //    .setTimestamp()
            //channele.send({embeds: [log]})

        } catch (err) {
            throw err;
        }
    }

}