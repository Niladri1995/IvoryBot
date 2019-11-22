const GoogleSearch = require('google-search');

// Metadata
module.exports = {
  name: 'Google 🔍',
  syntax: `${process.env.PREFIX}g [search query]`,
  description: 'Googles about the query',
  help: 'Google command ',
  usage: [
    `\`${process.env.PREFIX}g [search query]\` - The bot googles`,
  ],
};

  module.exports.run = (client, message, args) => {
    

      var googleSearch = new GoogleSearch({
          key: process.env.GOOGLE_API_KEY,
          cx: process.env.CUSTOM_SEARCH_ENGINE
      });
       
    
    let query = args.slice(0).join(" ");  
    
 
      googleSearch.build({
          q: query,
         num: 2,
      }, function(error, response) {
        message.channel.send(response.items[0].link);
        return console.log(response.items[0].link);
      });
    
  }