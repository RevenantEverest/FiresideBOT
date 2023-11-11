import type { HandleReturn } from '@@types/promises.js';
import type { SongInfo } from '@@types/youtube.js';
import { youtube } from '@@utils/index.js';

export default function handleSearch(value: SongInfo) {
    const mock = youtube.handleSearch as jest.Mock;
    mock.mockImplementation(async (): Promise<HandleReturn<SongInfo>> => [value, undefined]);
};