const Discord = require("discord.js");
const Canvas = require("canvas");
const clashApi = require("clash-of-clans-api");
let clientSc = clashApi({
  token: process.env.COC_API
});

// Metadata
module.exports = {
  name: "CwL matchup Search",
  syntax: `${process.env.PREFIX}cwl [clantag]`,
  description: "Searches the clan and shows its SCcwl matchups",
  help: "Clan search command ",
  usage: [`\`${process.env.PREFIX}cwl [clantag]\` - searches a clan`]
};

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    message.channel.send("You forgot to put a Clan Tag");
  }

  const loading = client.emojis.find(emoji => emoji.name === "loading");
  await message.channel.send("Generating...pls HODL!"+loading).then(async msg => {
    msg.delete(4000);
  });

  const canvas = Canvas.createCanvas(1200, 800);
  const ctx = canvas.getContext("2d");

  // Since the image takes time to load
  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Felevate-website-background.jpg?v=1572254308015"
  );

  //drawing Rounded Rectangle
  function roundedRectangle(x, y, w, h, radius) {
    var context = canvas.getContext("2d");
    var r = x + w;
    var b = y + h;
    context.beginPath();
    context.strokeStyle = "#000000";
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

  //legends
  ctx.font = "26px Optima";
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  for (var i = 12; i > 2; i--) {
    ctx.fillText("TH" + [i], 340 + (12 - i) * 85, 60);
  }

  var data;
  await clientSc
    .clanLeague(args[0].toUpperCase())
    .then(response => (data = response))
    .catch(err => console.log(err));

  console.log(data);
  if (data === undefined) {
    return message.channel.send(
      "Some thing went wrong! check the clan Tag.\nOr your clan is not in a Match Yet!"
    );
  }

  for (var i = 0; i < data.clans.length; i++) {
    let clanName = data.clans[i].name;
    let badge = data.clans[i].badgeUrls.small;
    let members = data.clans[i].members;
    let th12 = 0;
    let th11 = 0;
    let th10 = 0;
    let th09 = 0;
    let th08 = 0;
    let th07 = 0;
    let th06 = 0;
    let th05 = 0;
    let th04 = 0;
    let th03 = 0;
    for (var k = 0; k < members.length; k++) {
      if (members[k].townHallLevel === 12) {
        th12++;
      }
      if (members[k].townHallLevel === 11) {
        th11++;
      }
      if (members[k].townHallLevel === 10) {
        th10++;
      }
      if (members[k].townHallLevel === 9) {
        th09++;
      }
      if (members[k].townHallLevel === 8) {
        th08++;
      }
      if (members[k].townHallLevel === 7) {
        th07++;
      }
      if (members[k].townHallLevel === 6) {
        th06++;
      }
      if (members[k].townHallLevel === 5) {
        th05++;
      }
      if (members[k].townHallLevel === 4) {
        th04++;
      }
      if (members[k].townHallLevel === 3) {
        th03++;
      }
    }

    //Clan parameters
    ctx.font = "26px Optima";
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(i + 1 + ". " + clanName, 20, 150 + i * 80);
    ctx.font = "24px Optima";
    var posX = 360;
    ctx.fillText(th12, posX, 150 + i * 80);
    posX += 85;
    ctx.fillText(th11, posX, 150 + i * 80);
    posX += 85;
    ctx.fillText(th10, posX, 150 + i * 80);
    posX += 85;
    ctx.fillText(th09, posX, 150 + i * 80);
    posX += 85;
    ctx.fillText(th08, posX, 150 + i * 80);
    posX += 85;
    ctx.fillText(th07, posX, 150 + i * 80);
    posX += 85;
    ctx.fillText(th06, posX, 150 + i * 80);
    posX += 85;
    ctx.fillText(th05, posX, 150 + i * 80);
    posX += 85;
    ctx.fillText(th04, posX, 150 + i * 80);
    posX += 85;
    ctx.fillText(th03, posX, 150 + i * 80);
  }

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "cwl-clan-image.png"
  );

  await message.channel.send(attachment);
};
