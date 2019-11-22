// Metadata
module.exports = {
  name: 'Dark shadow',
  syntax: `${process.env.PREFIX}ds`,
  description: 'Introduction of our DS',
  help: 'DS command ',
  usage: [
    `\`${process.env.PREFIX}roo\` - The bot pings Roo`,
  ],
};

module.exports.run = (client, message, args) => {
  
  const embed = {
  "title": "DARK SHADOW",
  "color": 8708787,
  "image": {
    "url": "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fds.jpg?v=1567318106005"
  },
  "author": {
    "name": "Ivory",
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "fields": [
    {
      "name": "Speciality",
      "value": "Spam GIF➡️3*➡️sleep➡️repeat"
    }
  ]
};
  return message.channel.send("<@"+process.env.DS+"> has been summoned !",{ embed });
};