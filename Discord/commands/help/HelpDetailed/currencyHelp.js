const Balance = [
  {name: "Description", value: "Displays your current balance for that server"},
  {name: "Example", value: "`?Balance`"}
];

const Give = [
  {name: "Description", value: "Gives "},
  {name: "Example", value: "`?Give @RevenantEverest 20`"}
];

const Currency_Help = [
  {command: "balance", fields: Balance},
  {command: "give", fields: Give}
];

module.exports = Currency_Help;
