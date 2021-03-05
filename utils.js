const Airtable = require('airtable').base(process.env.AIRTABLE_BASE)

async function getStreamerList() {
  let streamers = []

  await Airtable('Streamers')
    .select()
    .eachPage(function page(records, fetchNextPage) {
      records.forEach((record) => {
        streamers = streamers.concat(record.get('Name'))
      })

      fetchNextPage()
    })

  return streamers
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

module.exports = { getStreamerList, capitalize }
