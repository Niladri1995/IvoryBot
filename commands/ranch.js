// Metadata
module.exports = {
  name: 'Ranch',
  syntax: `${process.env.PREFIX}ranch`,
  description: 'Summons Ranchy',
  help: 'Ranch command ',
  usage: [
    `\`${process.env.PREFIX}roo\` - The bot pings eddy`,
  ],
};


module.exports.run = (client, message, args) => {
     const embed = {
  "title": "Ranchy 🏂",
  "color": 8708787,
  "image": {
    "url": "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2F585561934619738141.gif?v=1567950565664"
  },
  "fields": [
    {
      "name": "Speciality",
      "value": "Snow Boarding ❄️\n Inconsistent 3* 🌟"
    },
    {
      "name": "He Izz Our VIP GUEST",
      "value": "😏"
    }
  ]
};

  return message.channel.send("<@"+process.env.RANCH+"> has been summoned !",{ embed });
}