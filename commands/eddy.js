// Metadata
module.exports = {
  name: 'Eddy',
  syntax: `${process.env.PREFIX}eddy`,
  description: 'Summons Eddy',
  help: 'Eddycommand ',
  usage: [
    `\`${process.env.PREFIX}eddy\` - The bot pings Eddy`,
  ],
};


module.exports.run = (client, message, args) => {
     const embed = {
  "title": "Eddy ⚡",
  "color": 8708787,
  "image": {
    "url": "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2F481299357539500050.gif?v=1568044533854"
  },
  "fields": [
    {
      "name": "Speciality",
      "value": "Boosting Server 🚀\nEating pizza & Hooping 🍕"
    },
    {
      "name": "He is Born Ready",
      "value": "🥋"
    }
  ]
};

  return message.channel.send("<@"+process.env.EDDY+"> has been summoned !",{ embed });
}