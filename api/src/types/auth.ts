export type AuthPermissions = "ADMINISTRATOR" | "FIRESIDE" | "USER";

export interface AuthPayload {
    id: number,
    username: string,
    discriminator: number,
    discord_id: string,
    avatar: string,
    token?: string,
    permissions: AuthPermissions
};