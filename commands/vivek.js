// Metadata
module.exports = {
  name: 'Vivek',
  syntax: `${process.env.PREFIX}Vivek [summon]`,
  description: 'Pings and gives Vivek momos',
  help: 'BVivek command ',
  usage: [
    `\`${process.env.PREFIX}vivek [summon]\` - The bot pings Vivek lodu`,
  ],
};

module.exports.run = (client, message, args) => {
  
  if(args[0] === ("summon" || "summoned")){
    
     message.channel.send("<@"+process.env.VIVEK+"> I have momos for you !")
    .then(() => message.channel.send('https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2FFried_momos-e1492212999573-735x413.jpg?v=1567318177350'));
    return;
  }
  
  return message.channel.send("<@"+process.env.VIVEK+"> is the MOMO man !");
  
};