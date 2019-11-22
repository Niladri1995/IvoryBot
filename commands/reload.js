module.exports = {
  name: 'Reload',
  syntax: `${process.env.PREFIX}reload`,
  description: 'Restarts the Bot',
  help: 'Only Rivu can use',
  usage: [
    `\`${process.env.PREFIX}reload\` - restarts Bot`,
  ],
};

module.exports.run = (client, message, args) => {
  
	
  if(message.author.id != process.env.OWNER_ID) {
    return message.reply("You cant use this command");
  }
  
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()
    .setTitle('Done.')
    .setDescription(`Restarted in **${Math.floor(client.ping)}**ms`);
  if (message.author.id !== process.env.OWNER_ID) return;
  message.channel.send(embed).then(() => {
  process.exit(1);
})
};

