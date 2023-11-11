import type { SongInfo } from '@@types/youtube.js';

export interface Mocks {
    hasPermission: (value: boolean) => void,
    isGuildMember: (value: boolean) => void,
    hasRole: (value: boolean) => void,
    handleSearch: (payload: SongInfo) => void
};