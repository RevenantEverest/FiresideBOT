import { Flag } from '../types/flags.js';

export const INFO: Flag = {
    name: "Inspect/Info",
    usageSymbol: ["i", "info", "inspect"],
    description: "Displays more information about certain aspects of a command",
    example: "playlist MyPlaylist -i"
};

export const SHUFFLE: Flag = {
    name: "Shuffle",
    usageSymbol: ["s", "shuffle"],
    description: "Used in some music commands to shuffle a playlists songs before adding it to the queue",
    example: "playlist MyPlaylist -s"
};

export const PRIVATE_TOGGLE: Flag = {
    name: "Public/Private",
    usageSymbol: ["p"],
    description: "Used in some playlists commands to toggle public/private feature on custom playlists",
    example: "editplaylist MyPlaylist -p"
};