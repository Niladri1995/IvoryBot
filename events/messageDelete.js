module.exports = (client, message) => {
  
  if (message.author.bot) return;
  
  if(message.channel.type == 'text') {

        //post in the guild's log channel
        var log = message.guild.channels.find(c => c.name === "bot-spam");
        if (log != null)
            log.send('**[Message Deleted]** ' + message.author.username + ': ' + message.cleanContent);

    }
  
    function formatConsoleMessage(message) {
      return message.cleanContent.replace(new RegExp('\n', 'g'), '\n\t');
  }
};