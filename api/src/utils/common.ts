import { Truthy } from '../types/common.js';

export function RNG(num: number) {
    return Math.floor(Math.random() * num);
};

export function truthy<T>(value: T): value is Truthy<T> {
    return !!value;
};