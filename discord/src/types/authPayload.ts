
export type AuthPermissions = "ADMINISTRATOR" | "FIRESIDE" | "USER";
export interface AuthPayload {
    username: string,
    discriminator: number,
    discord_id: string,
    avatar?: string | null,
    permissions: AuthPermissions
};