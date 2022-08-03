import { UserSong } from '../../../../entities/index.js';
 
export interface UserSongMocks {
    handleSearch: Function
};

export interface UserSongExtraParams {
    mocks: UserSongMocks,
    createdSong?: UserSong
};