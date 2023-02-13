const Discord = require("discord.js")
const warnSchema = require("../models/warnSchema")
const randomstring = require("randomstring");
const {
    mongo,
    Mongoose
} = require("mongoose");
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'warnings',
    permissions: ["MANAGE_MESSAGES"],
    aliases: ["warns"],
    cooldown: 0,
    category: 'utility',
    description: {
        usage: '.warnings <member>',
        content: "Check a user's warnings",
        examples: ['.warnings @aggeloss27', '.warns 620544699190607875']
    },
    async execute(client, message, args, Discord, profileData) {
        let target = message.guild.members.cache.get(args[0])

        if (!target) {
            target = message.member
        }
        let member
        try {
            member = await message.guild.members.fetch(target);
        } catch (err) {
            member = null;
        }

        const guildID = message.guild.id
        let mentione = message.mentions.users.first()
        let mention = mentione ? mentione.id : args[0]
        const userID = mention ? mention : message.author.id

        member = message.guild.members.cache.get(userID)

        if (!message.guild.members.cache.get(userID)) {
            return //message.channel.send({content:"This user does not exist"})
        }
        const results = await warnSchema.find({
            guildID: guildID,
            userID: userID
        })

        let Array2 = []

        let num = results.length + 1
        for (let i = 1; i < num; i++) {
            Array2.push({
                reason: results[i - 1]["warningInfo"][0]["reason"],
                authorID: results[i - 1]["warningInfo"][0]["authorID"],
                time: results[i - 1]["warningInfo"][0]["time"],
                punishmentID: results[i - 1]["warningInfo"][0]["punishmentID"],
            })
        }

        for (const warningObject of Array2) {
            const {
                authorID,
                time,
                reason,
                punishmentID
            } = warningObject

            let reply = //`**Warn Author:** <@${authorID}>\n\n
            `**Time:** **${time}**\n\n **Warning Reason:** \`${reason}\`\n\n**Punishment ID:** \`${punishmentID}\`\n\n\n`

            const warnEm= new MessageEmbed()
                .setColor('#F3CE56')
                .setTitle(`${member.user.tag}'s Warning Informaion`)
                .setThumbnail(member.user.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription(`${reply}`)
                .setFooter({text:`${client.user.username}`}, client.user.displayAvatarURL())
                .setTimestamp();

            message.channel.send({embeds:[warnEm]}).catch(error => {
                if (error.code == 50006) {
                    message.channel.send({content:"This user doesn't have any warnings"})
                }
            })
        }
    }
}