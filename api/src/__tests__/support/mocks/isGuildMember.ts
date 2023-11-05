import type { HandleReturn } from '@@types/promises.js';
import { discord } from '@@utils/index.js';

export default function isGuildMember(value: boolean) {
    const mock = discord.isGuildMember as jest.Mock;
    mock.mockImplementation(async (): Promise<HandleReturn<boolean>> => [value, undefined]);
};