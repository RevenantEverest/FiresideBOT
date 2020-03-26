const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on("ready", () => require('./controllers/DiscordEvents/onReady')(bot));
bot.on("message", (message) => require('./controllers/DiscordEvents/onMessage')(bot, message));
bot.on("error", (err) => require('./controllers/DiscordEvents/onError')(bot, err));

bot.on("guildCreate", (guild) => require('./controllers/DiscordEvents/Guild/onGuildCreate')(bot, guild));
bot.on("guildUpdate", (oldGuild, newGuild) => require('./controllers/DiscordEvents/Guild/onGuildUpdate')(bot, oldGuild, newGuild));
bot.on("guildDelete", (guild) => require('./controllers/DiscordEvents/Guild/onGuildDelete')(bot, guild));

bot.on("guildMemberAdd", (member) => require('./controllers/DiscordEvents/GuildMember/onGuildMemberAdd')(bot, member));
bot.on("guildMemberUpdate", (oldMember, newMember) => require('./controllers/DiscordEvents/GuildMember/onGuildMemberUpdate')(bot, oldMember, newMember));
bot.on("guildMemberRemove", (member) => require('./controllers/DiscordEvents/GuildMember/onGuildMemberRemove')(bot, member));

bot.on("roleCreate", (role) => require('./controllers/DiscordEvents/Role/onRoleCreate')(bot, role));
bot.on("roleUpdate", (oldRole, newRole) => require('./controllers/DiscordEvents/Role/onRoleUpdate')(bot, oldRole, newRole));
bot.on("roleDelete", (role) => require('./controllers/DiscordEvents/Role/onRoleDelete')(bot, role));

bot.on("emojiCreate", (emoji) => require('./controllers/DiscordEvents/Emoji/onEmojiCreate')(bot, emoji));
bot.on("emojiUpdate", (oldEmoji, newEmoji) => require('./controllers/DiscordEvents/Emoji/onEmojiUpdate')(bot, oldEmoji, newEmoji));
bot.on("emojiDelete", (emoji) => require('./controllers/DiscordEvents/Emoji/onEmojiDelete')(bot, emoji));

module.exports = bot;