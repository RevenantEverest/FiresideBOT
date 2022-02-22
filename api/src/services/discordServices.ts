import axios, { AxiosResponse } from 'axios';

const baseUrl = "https://discordapp.com/api";
const clientId = process.env.DISCORD_CLIENT_ID as string;
const clientSecret = process.env.DISCORD_CLIENT_SECRET as string;

export async function getToken(code: string, redirect: string): Promise<AxiosResponse> {
    return axios({
        method: "POST",
        url: `${baseUrl}/oauth2/token`,
        params: {
            grant_type: "authorization_code",
            code: code,
            redirect: redirect
        },
        headers: {
            "Authorization": `Basic ${clientId}:${clientSecret}`
        }
    });
};

export async function refreshToken(refreshToken: string): Promise<AxiosResponse> {
    return axios({
        method: "POST",
        url: `${baseUrl}/oauth2/token`,
        params: {
            grant_type: "refresh_token",
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            scope: "guilds identify guilds.join email messages.read",
            redirect_uri: process.env.DISCORD_BACKEND_REDIRECT as string
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};

export async function getUserInfo(token: string): Promise<AxiosResponse> {
    return axios({
        method: "GET",
        url: `${baseUrl}/users/@me`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export async function getUserGuilds(token: string): Promise<AxiosResponse> {
    return axios({
        method: "GET",
        url: `${baseUrl}/users/@me/guilds`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};