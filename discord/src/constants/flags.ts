import { Flag } from '../types/flags.js';
import timezoneData from '../resources/timezoneData.json' assert { type: "json" };

export const INFO: Flag = {
    name: "Inspect/Info",
    usageSymbol: ["i", "info", "inspect"],
    permissions: [],
    description: "Displays more information about certain aspects of a command",
    example: "playlist MyPlaylist -i"
};

export const SHUFFLE: Flag = {
    name: "Shuffle",
    usageSymbol: ["s", "shuffle"],
    permissions: [],
    description: "Used in some music commands to shuffle a playlists songs before adding it to the queue",
    example: "playlist MyPlaylist -s"
};

export const PRIVATE_TOGGLE: Flag = {
    name: "Public/Private",
    usageSymbol: ["p"],
    permissions: [],
    description: "Used in some playlists commands to toggle public/private feature on custom playlists",
    example: "editPlaylist MyPlaylist -p"
};

export const SERVER_PLAYLIST: Flag = {
    name: "Server Playlist",
    usageSymbol: ["s"],
    permissions: ["ADMINISTRATOR"],
    description: "Used in some playlist commands to specify that this command should run for server playlists instead of user playlists",
    example: "createPlaylist MyPlaylist -s"
};

export const GUILD_PLAYLIST_ROLES: Flag = {
    name: "Guild Playlist Role Inspect",
    usageSymbol: ["r"],
    permissions: [],
    description: "Used in server playlist command to display only the roles associated with the given server playlist",
    example: "serverPlaylist OurPlaylist -r"
};

export const TIMEZONE: Flag = {
    name: "Timezone",
    usageSymbol: timezoneData.map((tz) => tz.abbreviation.toLowerCase()),
    permissions: [],
    description: "Used in commands that require specific timezones to convert to from UTC to be displayed properly",
    example: "guildwarsEvents -est"
};

export const UPCOMING: Flag = {
    name: "Upcoming",
    usageSymbol: ["upcoming", "up"],
    permissions: [],
    description: "Used in Guild Wars Event command to display upcoming events in the next 10 minutes",
    example: "guildwarsEvents -upcoming"
};