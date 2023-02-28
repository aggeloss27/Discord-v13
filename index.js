const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('Welcome Home!'))

app.listen(port, () => {
  console.log("[HOSTING] Your bot is getting pinged")
})

require('dotenv').config()
const { Discord, Intents, Collection, Client } = require('discord.js');
const client = new Client({
  //ws: { properties: { $browser: "Discord iOS" }},
  intents: 32767,
  partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER'],
  allowedMentions: {
    repliedUser: false,
    parse: ['users', 'roles'],
    partials: ['CHANNEL'],
  },
    disableEveryone: false
});
//const prefix = '.';
const fs = require('fs');
const mongoose = require('mongoose')
const guild = client.guilds.cache.get('1073918974984736768')

client.commands = new Collection();
client.events = new Collection();

['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false
}).then(() => {
  console.log("[DATABASE] DiscordBotDB connected");
}).catch((err) => {
  console.log(err)
})

client.login(process.env['DISCORD_TOKEN'])