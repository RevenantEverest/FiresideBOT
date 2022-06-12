import dotenv from 'dotenv';

dotenv.config(); 

export const IS_DEV = process.env.ENVIRONMENT === "DEV";
export const IS_TEST = process.env.NODE_ENV === "test";

export const API_URL = process.env.API_URL as string;
export const API_PORT = process.env.API_PORT as string;

export const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export const DISCORD = {
    CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
    CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,
    KEY: process.env.DISCORD_KEY as string
};

export const GOOGLE_KEY = process.env.GOOGLE_KEY as string;