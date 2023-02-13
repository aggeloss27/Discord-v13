const mongoose = require('mongoose');
const {MessageEmbed} = require('discord.js')


const profileSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    serverID: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        default: 250
    },
    bank: {
        type: Number,
        required: true
    },
    //company: { type: Object, required: true}
})

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;