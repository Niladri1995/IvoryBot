const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

// Metadata
module.exports = {
  name: 'Pupper Pics',
  syntax: `${process.env.PREFIX}woof`,
  description: 'Get a random puppy image',
  help: 'puppey command ',
  usage: [
    `\`${process.env.PREFIX}woof\` - A random puppy image`,
  ],
};


module.exports.run = (client, message, args) => {
 
  randomPuppy()
      .then(url => {
          const pic = new Discord.RichEmbed().setColor(0xffffff).setImage(url);
          message.channel.send(`Woof Woof`, {
              embed: pic
          });
          console.log(url);
      });
    message.delete(2000);
}