require('dotenv-flow').config()
const Axios = require('axios')
const Discord = require('discord.js')
const Airtable = require('airtable').base(process.env.AIRTABLE_BASE)
const { listLiveStreamers, listStreamers } = require('./commands')
const { capitalize } = require('./utils')

const discordClient = new Discord.Client({})

const COMMAND_PREFIX = '!cvg'

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`)
})

discordClient.on('message', async (msg) => {
  switch (msg.content) {
    case `${COMMAND_PREFIX} streamers`:
      await listStreamers(msg)
      break
    case `${COMMAND_PREFIX} live streams`:
      await listLiveStreamers(msg)
      break
    default:
      break
  }

  if (msg.content.startsWith('!how')) {
    const {
      groups: { predicate, subject, thing },
    } = msg.content.match(/!how (?<predicate>.*) (?<thing>is|are) (?<subject>.*)/i)

    msg.channel.send(`${capitalize(subject)} ${thing} ${Math.floor(Math.random() * 100)}% ${predicate}`)
  }
})

discordClient.login(process.env.DISCORD_BOT_TOKEN)
