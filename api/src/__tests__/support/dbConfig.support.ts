import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import DiscordToken from '../../entities/DiscordToken.js';
import User from '../../entities/User.js';
import UserPlaylist from '../../entities/UserPlaylist.js';
import UserSong from '../../entities/UserSong.js';
import VoteLog from '../../entities/VoteLog.js';
import VoteRecord from '../../entities/VoteRecord.js';

dotenv.config();

const TESTING_DB_PORT = parseInt(process.env.TESTING_DB_PORT!, 10);

const dbConfig: ConnectionOptions = {
    type: "postgres",
    host: process.env.TESTING_DB_HOST!,
    port: TESTING_DB_PORT,
    database: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    synchronize: true,
    logging: false,
    entities: [
        DiscordToken, User, UserPlaylist, UserSong, VoteLog, VoteRecord
    ]
};

export default dbConfig;