module.exports = {
  name: "lockdown",
  permissions: ["ADMINISTRATOR"],
  aliases: ["lockserver"],
  cooldown: 0,
  category: "utility",
  description: {
    usage: ".lockdown <option>",
    content:
      "Locks down or unlocks every channel on the server (including vc's)",
    examples: [".lockdown true", ".lockdown false"],
  },
  async execute(client, message, args, Discord, profileData) {
    if (!args[0]) return;

    if (args[0] == "true") {

      message.guild.channels.cache.forEach((channel) => {
        try {
          const x = message.guild.roles.cache.find(
            (e) => e.name.toLowerCase().trim() == "@everyone"
          );
          channel.permissionOverwrites.edit(x, {
            SEND_MESSAGES: false,
            CONNECT: false,
          });
        } catch (e) {
          console.log(e);
          return console.log(`Couldn't lock ${channel}`);
        }
      });

      message.channel.send("Lockdown");

    } else if (args[0] == "false") {

      message.guild.channels.cache.forEach((channel) => {
        try {
          const x = message.guild.roles.cache.find(
            (e) => e.name.toLowerCase().trim() == "@everyone"
          );
          channel.permissionOverwrites.edit(x, {
            SEND_MESSAGES: true,
            CONNECT: true,
          });
        } catch (e) {
          console.log(e);
          return console.log(`Couldn't unlock ${channel}`);
        }
      });

      message.channel.send("Lockdown is up");
    }
  },
};
