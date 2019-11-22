const Discord = require("discord.js");

// Metadata
module.exports = {
  name: "Clan Info",
  syntax: `${process.env.PREFIX}clan [pg/snh]`,
  description: "shows clan info of Dizzy's playground, Strength and Honor.",
  help: "Clan info command ",
  usage: [
    `\`${process.env.PREFIX}ann\` - The bot shows caninfo of our allied clans`
  ]
};

module.exports.run = (client, message, args) => {
  if (args.length === 0) {
    message.channel.send("please mention pg or snh");
  }

  if (args[0] === ("pg" || "dizzys playgrnd")) {
    const embed = {
        title:"Part of Reddit Clan System (RCS)",
        description:
          " ```fix\nCLAN TAG: #UPVJL9C0```For In Game link: [Click Me](https://link.clashofclans.com/en?action=OpenClanProfile&tag=%23UPVJL9C0)",
        color: 1965138,
        author: {
          name: "🔥Dizzys Playgrnd🔥",
        }
    };
    return message.channel.send({ embed });
  }

  if (args[0] === ("snh" || "Strength & Honor")) {
    const embed = {
        title: "♨️SCCWL clan of dizzys playgrnd",
        description:
          " ```fix\nCLAN TAG: #JYJC9RRL```For In Game link: [Click Me](https://link.clashofclans.com/en?action=OpenClanProfile&tag=%23JYJC9RRL)",
        color: 1965138,
        author: {
          name: "🔥Strength & Honor🔥",
        }
    };
    message.channel.send({ embed });
  }
  
  if (args[0] === ("zav" || "zavala")) {
    const embed = {
        title: "♨️Event Clan",
        description:
          " ```fix\nCLAN TAG: #Y88R2Y9P```To Open In Game: [Click Me](https://link.clashofclans.com/en?action=OpenClanProfile&tag=Y88R2Y9P)",
        color: 1965138,
        author: {
          name: "🔥ZavaLa🔥",
        }
    };
    message.channel.send({ embed });
  }
  
};
