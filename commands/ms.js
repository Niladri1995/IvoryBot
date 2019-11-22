const Discord = require("discord.js");
const Canvas = require("canvas");
const clashApi = require("clash-of-clans-api");
let clientSc = clashApi({
  token: process.env.COC_API
});

// Metadata
module.exports = {
  name: "Clan Member Search",
  syntax: `${process.env.PREFIX}ms [clantag]`,
  description: "Searches the clan and shows its members",
  help: "Clan search command ",
  usage: [`\`${process.env.PREFIX}ms [clantag]\` - searches a clan`]
};

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    message.channel.send("You forgot to put a Clan Tag");
  }
  
  const loading = client.emojis.find(emoji => emoji.name === "loading2");
  await message.channel.send("Fetching Data...It will take time"+ loading).then(async msg => {
      msg.delete(4000);
    });

  const clanTag = args[0].toUpperCase();
  let clanName = "";
  let members = "";
  let memberTags = "";
  let memberCount = 0;

  await clientSc
    .clanByTag(clanTag)
    .then(response => {
    clanName = response.name.toString();
    })
    .catch(err => {
      return console.log(err);
    });

  await clientSc
    .clanMembersByTag(clanTag)
    .then(response => {
       memberCount = response.items.length;

      for (var i = 0; i < memberCount; i++) {
        members += i + 1;
        members += ". ";
        members += response.items[i].name;
        members += "\n";

        memberTags += response.items[i].tag;
        memberTags += "\n";
      }
    })
    .catch(err => {
      return console.log(err);
    });
  
  if(members.length === 0){
    return message.channel.send("Some thing went wrong! check the clan Tag.")
  }
    
  let length = memberCount * 22;
  
  const backArray = [
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fback4.jpg?v=1571899501421",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fback5.jpg?v=1571899515415",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fback6.jpg?v=1571899522544",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fback7.jpg?v=1571899532192"
  ];

  const n = Math.floor(Math.random() * 4 + 1) - 1;
  const backLink = backArray[n];
  
  console.log(clanName);
  
  const canvas = Canvas.createCanvas(800, (length + 300));
  const ctx = canvas.getContext("2d");

  // Since the image takes time to load, you should await it
  const background = await Canvas.loadImage(backLink);

  function roundedRectangle(x, y, w, h, radius) {
    var context = canvas.getContext("2d");
    var r = x + w;
    var b = y + h;
    context.beginPath();
    context.strokeStyle = "ffffff";
    context.lineWidth = "3";
    context.moveTo(x + radius, y);
    context.lineTo(r - radius, y);
    context.quadraticCurveTo(r, y, r, y + radius);
    context.lineTo(r, y + h - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(x + radius, b);
    context.quadraticCurveTo(x, b, x, b - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.clip();
  }

  roundedRectangle(0, 0, canvas.width, canvas.height, 30);

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.font = "22px Optima";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";

  ctx.fillText(members, 220, 105);
  ctx.fillText(memberTags, 600, 105);

  ctx.font = "25px Optima";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("MEMBERS", 190, 50);
  ctx.fillText("PLAYER TAGS", 600, 50);

  ctx.moveTo(0, 75);
  ctx.lineTo(800, 75);
  ctx.moveTo(400, 0);
  ctx.lineTo(400, canvas.height-60);
  ctx.moveTo(0, canvas.height-60);
  ctx.lineTo(800, canvas.height-60);
  ctx.stroke();

  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(clanName, canvas.width / 2, canvas.height-20);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "clan-members-image.png"
  );

  await message.channel.send(attachment);
};
