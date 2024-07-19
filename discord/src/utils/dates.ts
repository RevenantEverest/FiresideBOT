import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import duration from 'dayjs/plugin/duration.js';
import utc from 'dayjs/plugin/utc.js';

import { DateFormatOptions, FormattedDate } from '../types/dates.js';

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(duration);

export async function getTimestampAndFormat(options?: DateFormatOptions): Promise<FormattedDate> {

    const dateFormat = options?.dateFormat ?? "ddd MMM Do YYYY";
    const timeFormat = options?.timeFormat ?? "h:mma";

    const now = dayjs();
    const date = now.format(dateFormat);
    const time = now.format(timeFormat);

    return { date, time };
};

export function parseSeconds(durationInSeconds: number): string {
    const formattedDuration = dayjs.duration(durationInSeconds, "seconds").format("H:mm:ss");

    return formattedDuration.replace(/\b0+[a-z]+\s*/gi, '').trim();
};

export function format(timestamp: string | Date, options?: DateFormatOptions): FormattedDate {

    if(timestamp instanceof Date && Object.prototype.toString.call(timestamp) === "[object Date]") {
        timestamp = timestamp.toISOString();
    }

    const timestampFormat = ["YYYY-MM-DDTHH:mm:ssZZ"];
    const parsedDate = dayjs(timestamp, timestampFormat).utc();

    const date = dayjs(parsedDate).utc().format(options?.dateFormat ?? "ddd MMM Do YYYY");
    const time = dayjs(parsedDate).utc().format(options?.timeFormat ?? "h:mma");

    return { date, time };
};