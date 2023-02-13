const inspect = require('util')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'secretCommand',
    permissions: [],
    aliases: ["eval"],
    cooldown: 0,
    category: 'secret_command',
    description: {
        usage: "secret_command",
        content: "secret_command",
        examples: ['secret_command']
    }, 
    async execute(client, message, args, Discord, profileData) {
        if (message.author.id !== "1037748024396484770") return;

        const code = args.join(" ");
        if (!code) return //message.channel.send({content:`**${message.author.username}**, Please provide some code to evaluate`});

        try {
            const result = await eval(code);
            let output = result;
            //if(typeof output !== 'string') {
            //    output = inspect(result)
            //}
            let em= new MessageEmbed()
                .setTitle("Evaluation")
                .setColor("#21B46F")
                .setDescription(`Evaluated in: *${client.ws.ping}ms*`)
                .addFields({
                    name: "Input",
                    value: `\`\`\`js\n${code}\`\`\``,
                    inline: false
                }, {
                    name: "Output",
                    value: `\`\`\`js\n${output}\`\`\``,
                    inline: false
                }, {
                    name: "Type",
                    value: "```" + typeof output + '```',
                    inline: false
                }, )
            message.channel.send({embeds: [em]})
        } catch (err) {
            console.log(err)
        }

    }
}