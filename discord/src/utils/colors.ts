import * as common from './common.js';

export const success: number =  0x00ff00;
export const warning: number = 0xff9900;
export const error: number = 0xff0000;

export const topgg: number = 0xff3366;
export const banana: number = 0xffcc00;

export function random(this: object): number {
    const self = this;

    const keys = Object.keys(self).filter((key: string) => key !== "random");
    const randomKey = keys[common.RNG(keys.length - 1)];

    return (self as any)[randomKey] as number;
};