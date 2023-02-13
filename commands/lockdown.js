module.exports = {
  name: "lockdown",
  permissions: ["ADMINISTRATOR"],
  aliases: [],
  cooldown: 0,
  category: "utility",
  description: {
    usage: ".lockdown",
    content: "Locks down every channel on the server",
    examples: [".lockdown"],
  },
  async execute(client, message, args, Discord, profileData) {
    message.guild.channels.cache.forEach((channel) => {
      try {
        channel.updateOverwrite(
          message.guild.roles.cache.find(
            (e) => e.name.toLowerCase().trim() == "@everyone"
          ),
          {
            SEND_MESSAGES: false,
          }
        );
      } catch (e) {
        console.log(e);
        return console.log(`Couldn't lock ${channel}`);
      }
    });

    message.channel.send("Lockdown")
  },
};
