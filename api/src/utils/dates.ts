import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import utc from 'dayjs/plugin/utc.js';

import { DateFormatOptions,FormattedDate } from '../types/dates.js';

import timezoneData from '../resources/timezoneData.json' assert { type: "json" };

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

export async function getTimestampAndFormat(options?: DateFormatOptions): Promise<FormattedDate> {

    const dateFormat = options?.dateFormat ?? "ddd MMM Do YYYY";
    const timeFormat = options?.timeFormat ?? "h:mma";

    const now = dayjs();
    const date = now.format(dateFormat);
    const time = now.format(timeFormat);

    return { date, time };
};

export function convertToTimezoneFromUTC(timestamp: string | Date, timestampFormat: string[], tzAbbreviation: string): dayjs.Dayjs {
    const tz = timezoneData.filter((timezone) =>  timezone.abbreviation.toLowerCase() === tzAbbreviation.toLowerCase())[0];

    let utcOffset = parseInt(tz.utcOffset, 10);

    if(tz.utcOffset.split("").includes(":")) {
        const utcOffsetSplit = tz.utcOffset.split(":");
        const hours = parseInt(utcOffsetSplit[0], 10);
        const minutes = parseInt(utcOffsetSplit[1], 10);

        utcOffset = (hours * 60) + minutes;
    }

    if(tz.utcOffset.split("").includes("±")) {
        utcOffset = 0;
    }

    return dayjs(timestamp, timestampFormat).utcOffset(utcOffset);
};

export function convertToTimezoneFromUTCAndFormat(timestamp: string | Date, timestampFormat: string[], tzAbbreviation: string, options?: DateFormatOptions): FormattedDate {
    const conversion = convertToTimezoneFromUTC(timestamp, timestampFormat, tzAbbreviation);

    const date = conversion.format(options?.dateFormat ?? "ddd MMM Do YYYY");
    const time = conversion.format(options?.timeFormat ?? "h:mma");

    return { date, time };
};

export function convertToUTCFromTimezone(timestamp: string | Date, timestampFormat: string[], tzAbbreviation: string): dayjs.Dayjs {
    const tz = timezoneData.filter((timezone) =>  timezone.abbreviation.toLowerCase() === tzAbbreviation.toLowerCase())[0];

    let utcOffset = parseInt(tz.utcOffset, 10);

    if(tz.utcOffset.split("").includes(":")) {
        const utcOffsetSplit = tz.utcOffset.split(":");
        const hours = parseInt(utcOffsetSplit[0], 10);
        const minutes = parseInt(utcOffsetSplit[1], 10);

        utcOffset = (hours * 60) + minutes;
    }

    if(tz.utcOffset.split("").includes("±")) {
        utcOffset = 0;
    }

    return dayjs(timestamp, timestampFormat).utcOffset(utcOffset * -1);
};

export function convertToUTCFromTimezoneAndFormat(timestamp: string | Date, timestampFormat: string[], tzAbbreviation: string, options?: DateFormatOptions): FormattedDate {
    const conversion = convertToUTCFromTimezone(timestamp, timestampFormat, tzAbbreviation);

    const date = conversion.format(options?.dateFormat ?? "ddd MMM Do YYYY");
    const time = conversion.format(options?.timeFormat ?? "h:mma");

    return { date, time };
};