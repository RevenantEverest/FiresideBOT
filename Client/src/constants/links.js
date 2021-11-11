import env from '../environment';

export const SITE_URL = env.SITE_URL;
export const INVITE_LINK = `https://discordapp.com/oauth2/authorize?client_id=${env.CLIENT_ID}&permissions=8&scope=bot`;
export const DISCORD_LOGIN = `https://discordapp.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&redirect_uri=${encodeURIComponent(env.REDIRECT)}&response_type=code&scope=guilds%20identify%20guilds.join%20email%20messages.read`;