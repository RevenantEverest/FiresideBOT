import { ReplyMessageOptions, InteractionReplyOptions } from 'discord.js';
import { CommandDispatch } from '../types/commands.js';

import * as errors from './errors.js';

type ReplyContent = ReplyMessageOptions | InteractionReplyOptions;

export async function sendReply(dispatch: CommandDispatch, content: ReplyContent) {

    const { interaction, message } = dispatch;

    try {
        if(interaction) {
            return interaction.editReply(content as InteractionReplyOptions);
        }
    
        if(message) {
            return message.reply(content as ReplyMessageOptions);
        }
    }
    catch(err) {
        errors.internal({ 
            err: err as Error, 
            errMessage: "Error sending reply", 
            resourceName: "Dispatch Utils - SendReply" 
        });
    };
};