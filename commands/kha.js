// Metadata
module.exports = {
  name: 'Khalissi',
  syntax: `${process.env.PREFIX}kha`,
  description: 'Summons Khalissi (without dragon!)',
  help: 'Khalissi command ',
  usage: [
    `\`${process.env.PREFIX}kha\` - The bot pings khalissi`,
  ],
};


module.exports.run = (client, message, args) => {
  
  const embed = {
  "title": "Khalissi 🐲",
  "color": 8708787,
  "thumbnail": {
    "url": "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Foutput-onlinepngtools.png?v=1567339383318"
  },
  "image": {
    "url": "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fkha.jpg?v=1567337884117"
  },
  "fields": [
    {
      "name": "Speciality",
      "value": "Eating popcorn 🍿\n farming bases 🌾"
    },
    {
      "name": "She Izz Our Bro",
      "value": "👊"
    }
  ]
};
  return message.channel.send("<@"+process.env.KHALISSI+"> has been summoned !",{ embed });
}