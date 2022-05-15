import guildPlaylistTests from './guildPlaylists/__index__.js';
import guildPlaylistRolesTests from './guildPlaylistRoles/__index__.js';

import userPlaylistTests from './userPlaylists/__index__.js';
import userSongTests from './userSongs/__index__.js';

export default () => {
    describe("guild playlist routes", guildPlaylistTests);
    describe("guild playlist role routes", guildPlaylistRolesTests);
    describe("user playlist routes", userPlaylistTests);
    describe("user song routes", userSongTests);
};