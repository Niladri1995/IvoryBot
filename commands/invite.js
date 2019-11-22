// Metadata
module.exports = {
  name: 'Server Invite',
  syntax: `${process.env.PREFIX}invite`,
  description: 'shares playgrnd server invite link',
  help: 'Invite command ',
  usage: [
    `\`${process.env.PREFIX}invite\` - Server Invite`,
  ],
};


module.exports.run = (client, message, args) => {
  
  return message.channel.send("https://discord.gg/8Dk73VD");
}