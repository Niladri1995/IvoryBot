const Discord = require("discord.js");

// Metadata
module.exports = {
  name: 'Birthday',
  syntax: `${process.env.PREFIX}bday [../delete] <Member Name> <date> <month>`,
  description: 'Announces birthday in the mentioned channel',
  help: 'Bday command ',
  usage: [
    `\`${process.env.PREFIX}bday\` - The bot Announces birthday`,
  ],
};

module.exports.run = (client, message, args) => {
  
  if(args[0] === "delete"){
    client.birthdays.deleteAll();
    return message.channel.send("```birthdays deleted```");
  }
  
  if (!message.mentions.users.size) {
		return message.reply("you need to tag a user to register their birthday");  //to check if there,s a mention or not
	}
  
  const channel = client.channels.find(x => x.name === process.env.ANNOUNCEMENT_CHANNEL);
  const taggedMember = message.mentions.users.first();
	const member = message.mentions.members.first().id;
  const date = parseInt(args[1]);
  const month = parseInt(args[2]);
  
  client.birthdays.ensure(`${message.guild.id}-${member}`, {                       // enmap for the sign-ups
			guild: message.guild.id,
      memberName: taggedMember.username,
      date: date,
      month: month,
		});
  
  const embed = new Discord.RichEmbed()
    .setTitle('Done ✅')
    .setDescription(`I will Remind You the birthday 🎂`);
  
    return message.channel.send(embed);
  
}