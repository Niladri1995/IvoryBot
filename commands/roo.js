// Metadata
module.exports = {
  name: 'Roo',
  syntax: `${process.env.PREFIX}roo`,
  description: 'Introduction of our Leader',
  help: 'roo command ',
  usage: [
    `\`${process.env.PREFIX}roo\` - The bot pings Roo`,
  ],
};

module.exports.run = (client, message, args) => {
  
  const thumbsup = client.emojis.find(emoji => emoji.name === "thumpsup");
  const roo = "ROO";
  
  const embed = {
  "title": roo,
  "color": 8708787,
  "thumbnail": {
    "url": "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbitmoji-20190811112514.png?v=1567318241184"
  },
  "image": {
    "url": "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Froored.jpg?v=1567318111648"
  },
  "author": {
    "name": "Ivory",
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
  },
  "fields": [
    {
      "name": "The woman",
      "value": "our Leader"
    },
    {
      "name": "The Myth",
      "value": "😱"
    },
    {
      "name": "The Legend",
      "value": "🙄"
    }
  ]
};
  return message.channel.send({ embed });
};