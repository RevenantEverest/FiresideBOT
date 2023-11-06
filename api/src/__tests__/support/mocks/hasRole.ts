import type { HandleReturn } from '@@types/promises.js';
import { discord } from '@@utils/index.js';

export default function hasRole(value: boolean) {
    const mock = discord.hasRole as jest.Mock;
    mock.mockImplementation(async (): Promise<HandleReturn<boolean>> => [value, undefined]);
};