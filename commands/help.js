const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  permissions: [],
  aliases: ["commands"],
  cooldown: 0,
  category: "utility",
  description: {
    usage: ".help",
    content: "Display all the conmmands",
    examples: [".help economy", ".help moderation kick", ".help balance"],
  },
  async execute(client, message, args, Discord, profileData) {
    const HELP_EMBED = new MessageEmbed()
      .setColor("#3262da")
      .setTitle("Help")
      .setDescription(
        "For additional info on each command, type `.help <command>`"
      )
      .addFields(
        {
          name: "🔑 Moderation",
          value: `\`.help moderation\``,
          inline: true,
        },
        {
          name: "💰 Economy",
          value: `\`.help economy\``,
          inline: true,
        },
        {
          name: "🔨 Utility",
          value: `\`.help utility\``,
          inline: true,
        },
        {
          name: "😁 Fun",
          value: `\`.help fun\``,
          inline: true,
        }
      );

    if (!args[0]) return await message.reply({embeds:[HELP_EMBED]});
    let totalCategorys = client.commands.map((cmd) => cmd.category);
    let categories = totalCategorys.filter((dub, index) => {
      return totalCategorys.indexOf(dub) === index;
    });

    if (categories.includes(args[0].toLowerCase())) {
      const CategoryEmbed = new MessageEmbed()
        .setColor("#3262da")
        .setTitle(
          `${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands`
        )
        .setDescription(
          `\`${client.commands
            .filter((cmd) => cmd.category === args[0])
            .map((cmd) => cmd.name)
            .join("`, `")}\``
        )
        .setFooter("Tip: use the . prefix before each command");
      return await message.reply({
        embeds: [CategoryEmbed],
      });
    }

    const COMMAND =
      client.commands.get(args[0]) ||
      client.commands.find((a) => a.aliases && this.aliases.includes(args[0]));
    if (!COMMAND) return; //message.reply({content:"Invalid **command** or **category**, please try again"})

    let aliases;
    if (COMMAND.aliases.length) {
      aliases = COMMAND.aliases.join("` `");
    } else {
      aliases = "none";
    }

    const COMMAND_EMBED = new MessageEmbed()
      .setColor("#3262da")
      .setTitle(`\`${COMMAND.name} command\``)
      .addFields(
        {
          name: "Description",
          value: COMMAND.description.content,
        },
        {
          name: "Aliases",
          value: `\`${aliases}\``,
        },
        {
          name: "Usage",
          value: `\`${COMMAND.description.usage}\``,
        },
        {
          name: "Examples",
          value: `\`${COMMAND.description.examples.join(" \n")}\``,
        }
      );

    await message.reply({
      embeds: [COMMAND_EMBED],
    });
  },
};
