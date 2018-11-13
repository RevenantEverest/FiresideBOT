const Music_Help = require('./HelpDetailed/musicHelp');
const Currency_Help = require('./HelpDetailed/currencyHelp');

// const Help_Desc = [
//   {category: "music", commands: Music_Help},
//   {category: "currency", commands: Currency_Help}
// ];

const Help_Desc = [Music_Help, Currency_Help];

module.exports = Help_Desc;
