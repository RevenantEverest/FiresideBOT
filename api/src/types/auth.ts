export interface AuthPayload {
    id: string,
    username: string,
    discriminator: number,
    discord_id: string,
    avatar: string,
    token?: string
};