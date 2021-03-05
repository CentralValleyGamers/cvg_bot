# CVG Bot

Bot used in the CVG Discord.

## Dev

Needed environment variables in `.env`:

```
DISCORD_BOT_TOKEN
TWITCH_APP_CLIENT_ID
TWITCH_APP_CLIENT_SECRET
AIRTABLE_API_KEY
AIRTABLE_BASE
```

Start dev with `yarn dev`

## Usage

When running locally: `yarn start`

When running Docker:

1. `docker build . cvg_bot`
1. `docker run -it --rm -d --env-file ./.env --name cvg_bot cvg_bot`
