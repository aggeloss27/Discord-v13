const profileModel = require('../../models/profileSchema');
const {MessageEmbed} = require('discord.js')

module.exports = async (Discord, client, member) => {
    try {
        await profileModel.findOneAndDelete(member.id);
    } catch (err) {
        console.log(err);
    }
};