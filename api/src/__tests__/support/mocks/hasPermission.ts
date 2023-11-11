import type { HandleReturn } from '@@types/promises.js';
import { discord } from '@@utils/index.js';

export default function hasPermission(value: boolean) {
    const mock = discord.checkMemberPermissions as jest.Mock;
    mock.mockImplementation(async (): Promise<HandleReturn<boolean>> => [value, undefined]);
};