// Metadata
module.exports = {
  name: 'Deadpool',
  syntax: `${process.env.PREFIX}dp`,
  description: 'Summons Deadpool',
  help: 'Deadpool command ',
  usage: [
    `\`${process.env.PREFIX}dp\` - The bot pings Deadpool`,
  ],
};


module.exports.run = (client, message, args) => {
  
  const embed = {
  "title": "Deadpool 🦸",
  "color": 8708787,
  "image": {
    "url": "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fcavkingcharlessmalldogs.jpg?v=1567438564821"
  },
  "fields": [
    {
      "name": "Speciality",
      "value": "Right hand Of Roo ✌️\nNuking bases 💣"
    },
    {
      "name": "He loves Dogs 🐕 and Hawwwwt chicks 👯",
      "value": "😗"
    }
  ]
};
  return message.channel.send("<@"+process.env.DEADPOOL+"> has been summoned !",{ embed });
}