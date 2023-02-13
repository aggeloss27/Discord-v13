const mongoose = require('mongoose')
const {MessageEmbed} = require('discord.js')

let schema = new mongoose.Schema({
    userId: String,
    cmd: String,
    time: Number,
    cooldown: Number,
})

module.exports = mongoose.model('cooldowns', schema)