// to delete all enmap

// Metadata
module.exports = {
  name: 'delete',
  syntax: `${process.env.PREFIX}delete`,
  description: 'Deletes entry from Database.\n `For Rivu\'s use ONLY`',
  help: 'Deletes entry from Database.For Rivu\'s use ONLY',
  usage: [
    `\`${process.env.PREFIX}delete\` - deletes database entry`,
  ],
};
	
  module.exports.run = (client, message, args) => {
    
    if(message.author.id !== process.env.OWNER_ID) return;
  
    client.warStarsData.deleteAll();
    client.SnHwarStarsData.deleteAll();
    client.rcs.deleteAll();
    client.cgClanPGData.deleteAll();
    return message.reply("All Data deleted");
  
  
};