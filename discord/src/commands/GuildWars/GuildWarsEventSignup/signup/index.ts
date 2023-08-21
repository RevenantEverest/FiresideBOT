import { CommandDispatch, CommandFile } from '../../../../types/commands.js';
import * as api from '../../../../api/index.js';

import { errors, dates, regex } from '../../../../utils/index.js';

async function signup(dispatch: CommandDispatch, flagRemovedArgs: string[], timezone: string, commandFile: CommandFile) {


    const eventTime = dispatch.interaction?.options.getString("time") ?? regex.parseGuildWarsEventTime(flagRemovedArgs.join(" ")) as string;
    const timeRemovedArgs = flagRemovedArgs.join(" ").replace(regex.guildwarsEventTimeRegex, "").split(" ");

    const eventName = dispatch.interaction?.options.getString("name") ?? timeRemovedArgs.join(" ");

    const eventTimePeriod = eventTime[eventTime.length - 2] + eventTime[eventTime.length - 1];
    const hasAM = Boolean(eventTimePeriod.toLowerCase() === "am");
    const hasPM = Boolean(eventTimePeriod.toLowerCase() === "pm");

    console.log(eventName, eventTime);

    if(!hasAM && !hasPM) {
        return dispatch.reply("No am/pm");
    }

    const [eventSignup, err] = await api.guildwarsEventSignups.create(dispatch, {
        discord_id: dispatch.author.id,
        event_name: eventName.trim(),
        event_time: eventTime,
        timezone: timezone
    });

    if(err || !eventSignup) {
        return errors.commandApi({
            dispatch,
            err,
            commandFile,
            resource: eventSignup,
            missingResourceMessage: "No Event Signup Returned"
        });
    }

    const title = eventSignup.event_title;
    const parsedTime = dates.convertToTimezoneFromUTCAndFormat(eventSignup.event_time, ["HH:mm"], timezone).time;

    return dispatch.reply(`You have signed up for notifications for **${title}** at **${parsedTime} ${timezone.toUpperCase()}**`);
};

export default signup;