const profileModel = require("../models/profileSchema");
module.exports = {
  name: "deleteaccount",
  permissions: [],
  aliases: [],
  cooldown: 0,
  category: "utility",
  description: {
    usage: ".deleteaccount",
    content: "Delete your account from the bot's database",
    examples: [".deleteaccount"],
  },
  async execute(client, message, args, Discord, profileData) {
    if (!profileData) return;
    if (!args) return;
    try {
      const response = await profileModel.findOneAndDelete({
        userID: message.author.id,
      });

      message.reply(
        `**${message.author.username}**, your account has been deleted`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
