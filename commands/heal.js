const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventory");
const items = require('../shopItems.js')
const {
	MessageEmbed,
	MessageActionRow
} = require('discord.js')
const intValues = require('../intValues')
const {
	levels
} = require('../xpLevels')

module.exports = {
		name: "heal",
		permissions: [],
		aliases: [],
		cooldown: 86400,
		category: 'economy',
		description: {
			usage: '.heal',
			content: "Heal with bandages",
			examples: ['.heal']
		},
		async execute(client, message, args, Discord, profileData) {
			inventory.findOne({
					userID: message.author.id
				}, async (err, data) => {
					if (data) {
						const userHasMedKit = Object.keys(data.Inventory).includes('med kit')
						if (!userHasMedKit) {
							message.reply(`You do not have a **med kit** to heal up`)
						} else {
							data.Inventory['med kit']--;
							let query = {
								userID: message.author.id
							}
							let updateDoc = {
								$inc: {
									"character.2.health": +40
								}
							}
							await profileModel.updateOne(query, updateDoc)
              message.reply(`You used a **med kit** to heal yourself`)
						}
						// console.log(data)
						await inventory.findOneAndUpdate({
							userID: message.author.id
						}, data)
					} else {
						message.reply(`You do not have a **med kit** to heal up`)
					}
				}
			)
		}
		}