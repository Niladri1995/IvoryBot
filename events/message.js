const Enmap = require("enmap");
const fs = require("fs");

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

  if (message.isMentioned(client.user)) {
    if (message.author.id == process.env.OWNER_ID) {
      message.reply("yes boss!");
    } else if (message.author.id == process.env.DEADPOOL) {
      message.reply("Hey Hawwwtie!");
    } else {
      message.reply(
        'My prefix is "/" here, i dont work without that unless you are Dp! :smirk:'
      );
    }
  }

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  // standard argument/command name definition.
  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
