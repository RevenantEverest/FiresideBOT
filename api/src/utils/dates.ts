import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import utc from 'dayjs/plugin/utc.js';

import { DateFormatOptions,FormattedDate } from '../types/dates.js';

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