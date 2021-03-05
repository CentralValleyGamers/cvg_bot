const Discord = require('discord.js')
const Twitch = require('twitch')
const TwitchAuth = require('twitch-auth')
const { getStreamerList } = require('./utils')

const authProvider = new TwitchAuth.ClientCredentialsAuthProvider(
  process.env.TWITCH_APP_CLIENT_ID,
  process.env.TWITCH_APP_CLIENT_SECRET
)
const apiClient = new Twitch.ApiClient({ authProvider })

async function listStreamers(msg) {
  const streamers = await getStreamerList()

  const liveStreamers = streamers.map((streamer) => {
    return {
      // Zero width space below
      name: '​',
      value: `[**${streamer}**](https://twitch.tv/${streamer.toLowerCase()})`,
      inline: true,
    }
  })
  const embed = new Discord.MessageEmbed()
    .setTitle('CVG Streamers')
    .setDescription(
      'We currently host these streamers! Want to be on this list? Fill out this [form](https://airtable.com/shrBEOF40WW0LsMRZ)'
    )
    .setColor(0x0080ff)
    .addFields(liveStreamers)

  msg.channel.send(embed)
}

async function listLiveStreamers(msg) {
  const streamers = await getStreamerList()
  const result = await apiClient.helix.streams.getStreams({
    userName: streamers,
  })

  if (result.data.length === 0) {
    msg.channel.send('No CVG Streamers are live right now')
  } else {
    const liveStreamers = await Promise.all(
      result.data.map(async (data) => {
        const game = await data.getGame()
        return {
          // Zero width space below
          name: '​',
          value: `[**${data.userDisplayName}**](https://twitch.tv/${data.userName})
            Playing ${game.name}`,
          inline: true,
        }
      })
    )

    const embed = new Discord.MessageEmbed()
      .setTitle('Live CVG Streamers')
      .setDescription('These streamers are live right now!')
      .setColor(0x36e114)
      .addFields(liveStreamers)

    msg.channel.send(embed)
  }
}

module.exports = { listStreamers, listLiveStreamers }
