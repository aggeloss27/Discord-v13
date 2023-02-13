const mongoose = require("mongoose")
const {MessageEmbed} = require('discord.js')

const requiredString = {
    type: String,
    required: true
}

const verbalSchema = mongoose.Schema({

    guildID: requiredString,
    userID: requiredString,
    punishmentIDE: [String],

    warningInfo: {
        type: [Object],
        required: true
    }
})

const model = mongoose.model("Verbal Warnings", warnSchema);

module.exports = model;