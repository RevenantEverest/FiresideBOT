import { UserPlaylist } from '../../../../entities/index.js';

export interface UserPlaylistExtraParams {
    createdPlaylist?: UserPlaylist,
    secondaryPlaylist?: UserPlaylist
};