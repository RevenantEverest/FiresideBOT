import { OnOrOffOptions } from '../types/boolean.js';

import * as text from './text.js';

export function onOrOff(bool: boolean, options?: OnOrOffOptions): string {
    const onEmoji = "🟢";
    const offEmoji = "🔴";
    let on = "on";
    let off = "off";

    if(options?.withCapitalization) {
        on = text.capitalizeFirstLetter(on);
        off = text.capitalizeFirstLetter(off);
    }

    if(options?.withEmojis) {
        if(options.emojisLeft) {
            on = onEmoji + " " + on;
            off = offEmoji + " " + off;
        }
        else {
            on = on + " " + onEmoji;
            off = off + " " + offEmoji;
        }
    }
    
    return bool ? on : off;
};