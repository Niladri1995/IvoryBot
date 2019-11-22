const Discord = require("discord.js");
// Metadata
module.exports = {
  name: "Image search",
  syntax: `${process.env.PREFIX}image [search query]`,
  description: "Googles about the image query",
  help: "Google image command ",
  usage: [
    `\`${process.env.PREFIX}image [search query]\` - The bot googles images`
  ]
};

module.exports.run = (client, message, args) => {
  var imageSearch = require("node-google-image-search");
  let query = args.slice(0).join(" ");

  const swearWords = [
    "shucks",
    "frak",
    "shite",
    "porn",
    "pussy",
    "sexy",
    "sex",
    "boobs",
    "babes",
    "nudes",
    "hot girls",
    "fuck",
    "mia malcova",
    " nipples",
    "dani Daniels",
    "mia khalifa"
  ];

  if (swearWords.some(word => message.content.includes(word))) {
    message.reply("Oh no!!! I can't search that...");
    message.delete();
    return;
  }

  var results = imageSearch(query, callback, 0, 1);

  function callback(results) {
    const pic = new Discord.RichEmbed()
      .setColor(0xffffff)
      .setImage(results[0].link);

    message.channel.send(`I found this for you...`, {
      embed: pic
    });
    console.log(results[0].link);
  }
};
