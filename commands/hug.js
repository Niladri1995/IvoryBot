const Discord = require('discord.js');
const {
  get
} = require('request-promise-native');
var fs = require('fs'); //FileSystem

// Metadata
module.exports = {
  name: 'Hug 🤗',
  syntax: `${process.env.PREFIX}hug @mention`,
  description: 'hugss the mentioned user with a gif',
  help: 'hug command ',
  usage: [
    `\`${process.env.PREFIX}pat @mention\` - The bot hugs a person`,
  ],
};

module.exports.run = (client, message, args) => {

  const options = {
    url: 'https://nekos.life//api/hug',
    json: true
  }

  get(options).then(body => {
    const hugEmb = new Discord.RichEmbed()
      .setColor(0xffffff)
      .setImage(body.url);
    const sadEmb = new Discord.RichEmbed()
      .setColor(0xffffff)
      .setImage('https://media.giphy.com/media/3oz8xLz5gnSla2STE4/giphy.gif');
    if (!args[0]) {
      message.channel.send(`<@${message.author.id}> hug <@${message.author.id}>.. Oh wait! You can't hug yourself!`, {
        embed: sadEmb
      });
      return;
    }

    if (message.mentions.users.first().id == 609712555203756032) {
      message.channel.send(`<@${message.author.id}> hug me.. Oh, thanks, b-but i\'m only a bot...`, {
        embed: hugEmb
      });
      return;
    }

    if (!message.mentions.users.first()) return message.channel.send({
      embed: {
        "description": "Please mention someone!",
        "color": 0xFF2222
      }
    }).then(msg => {
        msg.delete();
    });
    message.channel.send(`<@${message.author.id}> hugged ${args[0]}`, {
      embed: hugEmb
    });
  });

}