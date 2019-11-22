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
  
  if (message.author.id !== process.env.OWNER_ID) return;
  if (args[0] === ("add")) {
    const key = `${process.env.CLAN_TAG}-${args[1]}`;
    const point = client.cgClanPGData.get(key, "pointsGained");
    const name =  client.cgClanPGData.get(key, "playerName");
    console.log(name+"  :  "+point);
    const toAdd = parseInt(args[2]);
    client.cgClanPGData.set(key,point+toAdd,"pointsGained");
    //client.cgClanPGData.set(key,args[3]+" "+args[4],"playerName");
    message.channel.send("Done");
    return;
    
  }
  if (args[0] === ("delete")) {
    const key = `${process.env.CLAN_TAG}-${args[1]}`;
    const name =  client.cgClanPGData.get(key, "playerName");
    console.log(name+" deleted");
    client.cgClanPGData.delete(key);
    return;
  }
}