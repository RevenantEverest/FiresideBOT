const config = require('../../../config/config');

module.exports = {
  sendHelp(message, args, server) {
    let helpEmbed = new config.Discord.RichEmbed();
    helpEmbed
      .setTitle('**HELP**')
      .setDescription('This embed will describe common commands and their uses.')
      .setThumbnail('https://i.imgur.com/efYsW7T.png')
      .addBlankField()
      .addField('**COMMANDS**', '***Default Prefix: ?***')
      .addField('?play [*Insert Link or Search Request*]', 'Uses either a provided link or YouTube Search and plays it in your channel.')
      .addField('?pause', 'Pauses the current song')
      .addField('?resume', 'Resumes any previously paused song.')
      .addField('?skip', 'Skips to the next song in queue. If no songs in queue, skip will cause the bot to leave the channel.')
      .addField('?stop', 'Clears the queue and removes the bot from the channel.')
      .addField('?playnext', 'Similar to play except any request made is promoted to next in queue.')
      .addField('?playlist [*Insert Playlist Name Here*]', 'Make a playlist on our client site and request it to your Discord song queue.')
      .addField('?queue', 'Displays the current song queue.')
      .addField('?delsong [*Insert Numeric Value*]', 'Deletes a song in the queue corresponding to the number provided.')
      .addField('?promote [*Insert Numberic Value*]', 'Promotes a song to play next in the queue corresponding to the numeric value provided.')
      .addField('?volume [*Optional Numberic Value*]', 'You can view current music volume by using the command standalone. Adding a numeric value between 1 and 100 will set the volume to that level.')
      .addField('?currentsong', 'Displays the current song embed.')
      .addField('?clear', 'Removes all songs from the current queue.')
      .addField('?newpoll [*Insert New Poll Name*]', 'Creates a new poll using the name provided.')
      .addField('?pollanswer [*Insert Poll Answer*]', 'Adds a potential answer to be voted for in the poll.')
      .addField('?sendpoll', 'Sends the current poll to the text channel.')
      .addField('?vote [*Insert Numeric Value*]', 'Allows you to vote on your desired poll answer requiring the corresponding numeric value assocoiated witht the desired answer.')
      .addField('?8ball [*Ask A Question*]', 'Use 8ball to ask Fireside a Yes, No, or Maybe question!')
      .addField('?pokemon', 'Displays a sprite icon for a random Pokemon.')
      .addField('?dice [*Optional Numeric Value*]', 'If no numeric value if provided, dice will roll a 6 sided die and return the result. If a value is provided, dice will use that value as its maximum possible number.')
      .addBlankField()
      .addField('For more information, click the link below to be taken to our help docs page: ', '[Click Me](https://eee.google.com)')
      .setFooter('© 2019 RevenantEverest', 'https://i.imgur.com/efYsW7T.png')
      .setColor(0xffff00)

      message.author.send(helpEmbed)
  }
}
