// Metadata
module.exports = {
  name: 'RoY',
  syntax: `${process.env.PREFIX}roy`,
  description: 'Summons Roy',
  help: 'Roy command ',
  usage: [
    `\`${process.env.PREFIX}eddy\` - The bot pings Roy`,
  ],
};


module.exports.run = (client, message, args) => {
     const embed = {
  "title": "Roy 🌪️",
  "color": 8708787,
  "image": {
    "url": "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2F623281243940978703.gif?v=1571055949561"
  },
  "fields": [
    {
      "name": "Speciality",
      "value": "badminton \nspamming emotes !"
    },
    {
      "name": "He loves leaderKitty",
      "value": "🐈"
    }
  ]
};

  return message.channel.send("<@"+process.env.ROY+"> has been summoned !",{ embed });
}