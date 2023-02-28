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
    userName: {
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
    greenCoins: {
      type: Number,
      required: true
    },
    curses: {
      type: Array,
      required: true
    },
    effects: {
      type: Array,
      required : true
    },
    character: {
      type: Array,
      required: true
    }
    //company: { type: Object, required: true}
})

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;