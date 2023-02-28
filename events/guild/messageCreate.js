require("dotenv").config();
//const cooldowns = new Map();
const cooldown = require("../../models/cooldownSchema");
const profileModel = require("../../models/profileSchema");
const { MessageEmbed } = require("discord.js");
const randomstring = require("randomstring");

module.exports = async (Discord, client, message) => {
  /**
   * @param {client} client
   * @param {message} message
   */
  const prefix = process.env.PREFIX;
  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  //Features

  //let collectorChannel = message.guild.channels.cache.find(c => c.name === '📜    ┃moderation-logs')

  if (message.content.length > 500) {
    message.channel.send({
      content:
        `<@${message.author.id}> **You are not allowed to send messages above 500   
         characters**`,
    });
    message.delete();
  }

  let discordLinks = ["discord.gg/", "discord.io/", "dsc.gg/"];
  for (const link of discordLinks) {
    if (message.content.includes(link)) {
      message.delete();
      a = await message.guild.members.fetch().get(message.author.id);
      a.roles.add("1075048317555318876");
    }
  }

  //let swearwords = require("../../swearwords.json");
  //for (const word of swearwords) {
  //  if (message.content.toLowerCase().includes(word)) {
  //    message.channel.send({
  //      content: `<@${message.author.id}> **Do not cuss**`
  //    });
  //    message.delete();
  //  }
  //}
  //
  if (message.channel.id === '857335186513723402') {
    if (message.attachments.size > 0 || message.content.includes("//")) {
      message.react("⏫")
      message.react("⏬")
    }
  }
  //

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.channel.type == "dm") return;

  //Mongo DB

  let profileData;
  try {
    profileData = await profileModel.findOne({
      userID: message.author.id,
    });

    if (!profileData && command.category == "economy") {
      return message.channel.send(
        `**${message.author.username}** please use **.createaccount** if you want to participate in minigames`
      );
    }

    if (!profileData) {
      if (Math.random() >= 0.75) {
        if (message.content != ".createaccount") {
          message.reply({
            content:
              "**Tip:** please use **.createaccount** if you want to participate in minigames",
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }

  //If the command is spelled wrong
  if (!command)
    return message.channel.send({
      content: `**${message.author.username}**, This command doesn't exist`,
    });

  if (command.permissions.length) {
    let invalidPermissions = [];
    for (const perm of command.permissions) {
      if (!validPermissions.includes(perm)) {
        return console.log(`Permissions error: ${perm}`);
      }
      if (!message.member.permissions.has(perm)) {
        invalidPermissions.push(perm);
        break;
      }
    }
    if (invalidPermissions.length) return; //{
    //let em = new MessageEmbed()
    //    .setColor("#F3CE56")
    //    .setTitle(`**${message.author.username}**, you are missing these permissions: \`${invalidPermissions}\``)
    //return message.channel.send({
    //    embeds: [em]
    //})
    //}
  }

//  if(profileData.coins >= 999999999 || profileData.bank >= 999999999){
//    if(command.category === "economy" && command.name != 'balance') {
//      return message.reply(`<@${message.author.id}> you can't participate in economy minigames because you have reached the maximum ammount of coins someone //could have`)
    
  

  //console.log(message.author.id)
  //console.log(typeof message.author.id)
  //cooldown pastebin https://sourceb.in/aQiiwGYlOg
  let coolIDs = ["788352848529326130",   //mixahl
                 "771067350682304562",   //stelios
                 "1037748024396484770" ] //egw
  if (command.cooldown && !coolIDs.includes(message.author.id)) {
    const current_time = Date.now();
    const cooldown_amount = command.cooldown * 1000;

    cooldown.findOne(
      {
        userId: message.author.id,
        cmd: command.name,
      },
      async (err, data) => {
        if (data) {
          const expiration_time = data.time + cooldown_amount;

          if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;
            let desc;

            if (time_left.toFixed(1) >= 3600) {
              let hour = time_left.toFixed(1) / 3600;
              desc = `**${message.author.username}** please wait **${parseInt(
                hour
              )} hours** before using **${command.name}**`;
            } else if (time_left.toFixed(1) >= 60) {
              let minute = time_left.toFixed(1) / 60;
              desc = `**${message.author.username}** please wait **${parseInt(
                minute
              )} minutes** before using **${command.name}**`;
            } else {
              let seconds = time_left.toFixed(1);
              desc = `**${message.author.username}** please wait **${parseInt(
                seconds
              )} seconds** before using **${command.name}**`;
            }

            let embed = new MessageEmbed()
              .setTitle("Slow down buddy")
              .setDescription(desc)
              .setColor("#5DC21E");
            return message.channel.send({
              embeds: [embed],
            });
          } else {
            await cooldown.findOneAndUpdate(
              {
                userId: message.author.id,
                cmd: command.name,
              },
              {
                time: current_time,
              }
            );
            command.execute(client, message, args, Discord, profileData);
          }
        } else {
          command.execute(client, message, args, Discord, profileData);
          new cooldown({
            userId: message.author.id,
            cmd: command.name,
            time: current_time,
            cooldown: command.cooldown,
          }).save();
        }
      }
    );
  } else {
    try {
      if (
        command.category === "economy" ||
        command.name === "secretCommand" ||
        message.author.id == 788352848529326130
      ) {
        command.execute(client, message, args, Discord, profileData);
      } else {
        let IsUserInDatabase = profileModel.findOne(message.author.id);

        let r;
        if (IsUserInDatabase) {
          r = "`true`";
        } else {
          r = "`false`";
        }

        let em = new MessageEmbed()
          .setColor("#5DC21E")
          .setTitle("__🔒 *Command Logs*__")
          .setDescription(
            `**${message.author.username}** used the \`${command.name}\` command in <#${message.channel.id}>`
          )
          .addFields(
            {
              name: "__Command Information__",
              value: `**Category:** \`${command.category}\` \n**Command Description:**
                    \`${command.description.content}\`
                    \n**Command use examples:** \`${command.description.examples[0]}\``,
              inline: true,
            },
            {
              name: `__Command message Information__`,
              value: `**Command message Link:** ${message.url}`,
              inline: true,
            },
            {
              name: "__Author Information__",
              value: `**Username**: \`${message.author.username}\` 
                    \n**Profile**: <@${message.author.id}>
                    \n**User tag**: \`${message.author.tag}\` 
                    \n**Is user in economy system:** ${r}`,
              inline: false,
            }
          )
          .setTimestamp();
        const channel = client.channels.cache.find(
          (channel) => channel.name === "┝📄┆spam-logs" // to be changed
        );
        if(message.guild.id === "832169065333391421") {
        channel.send({ embeds: [em] });
        }

        command.execute(client, message, args, Discord, profileData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //if(command) command.execute(client, message, args, Discord)
  //try{
  //    command.execute(client, message, args, Discord, profileData);
  //} catch (err) {
  //    console.log(err)
  //}
};
