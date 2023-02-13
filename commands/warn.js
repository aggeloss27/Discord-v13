const Discord = require("discord.js")
const warnSchema = require("../models/warnSchema")
const randomstring = require("randomstring");
const {
    mongo
} = require("mongoose");
const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'warn',
    permissions: ["MANAGE_MESSAGES"],
    aliases: [],
    cooldown: 0,
    category: 'moderation',
    description: {
        usage: '.warn <member> <reason>',
        content: "Warn a member because of their actions",
        examples: ['.warn @aggeloss27 very smort guy']
    },
    async execute(client, message, args, Discord, profileData) {
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!user) return //message.channel.send({content:'You didn\'t mention anyone!'});

        const punishmentID = randomstring.generate(30)
        const punishmentIDE = [`${punishmentID}`]

        let member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }

        if (!member) return // message.channel.send({content:'The user that you mentioned isn\'t in the server'});

        function formatAM(date) {
            let hours = date.getHours()
            let minutes = date.getMinutes()
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes
            let stringTime = hours + ':' + minutes + ' ' + ampm
            return stringTime;
        }

        const guildID = message.guild.id
        const userID = user.id
        const authorID = message.author.id
        const today = new Date()
        const time = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + ' at ' + formatAM(new Date)

        let reason = args.splice(1).join(' ');
        if (!reason) return //message.channel.send({content:'You need to add a reason for me to punish this user!'});
        //if (message.author.id === user.id) return //message.channel.send({content:'You cannot warn yourself!'});

        const warningsInfoObject = {
            authorID: authorID,
            time: time,
            punishmentID: punishmentID,
            reason: reason
        }

        message.delete()

        let warnEmbed = new MessageEmbed()
            .setColor('#F3CE56')
            .setDescription(`<@${user.id}> has been successfully warned`)
        //.setFooter('This message will auto-delete in 10 seconds.')
        message.channel.send({
            embeds: [warnEmbed]
        });

        //const logChannel = message.guild.channels.cache.find(c => c.name === '📜┃moderation-logs')    
        //const logEmbe= new MessageEmbed()
        //.setColor("#F3CE56")
        //.setTitle("A member was warned")
        //.setDescription("Warnings Information Displayed Below")
        //.addField("Member Warned:", `<@${userID}> ┃ \`${userID}\``)
        //.addField("Warn Author:", `<@${authorID}> ┃ \`${authorID}\``)
        //.addField("Reason:", `\`${reason}\``)
        //.addField("Time:", `${time}`)
        //logChannel.send(logEmbe)


        //info: reason, punishmentID, authorID, userID, time

        try {
            const warnData = {
                guildID,
                userID,
                punishmentIDE,
                warningInfo: warningsInfoObject
            }
            await new warnSchema(warnData).save()

            let embed = new MessageEmbed()
                .setColor('#3262da')
                .setTitle('You were warned by **GREEK SHADOWS**!')
                .setDescription('Server: **Greek Shadows**')
                .addField('Reason:', `${reason}`)
            user.send({
                embeds: [embed]
            })
        } catch (err) {
            console.log(err)
        }


    }
}