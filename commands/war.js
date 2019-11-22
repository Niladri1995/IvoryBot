const Discord = require("discord.js");
const Canvas = require("canvas");
const clashApi = require("clash-of-clans-api");
let clientSc = clashApi({
  token: process.env.COC_API
});

// Metadata
module.exports = {
  name: "War Summary",
  syntax: `${process.env.PREFIX}war [clan tag]`,
  description: "shows war summary of the tagged clan",
  help: "Clan war search command ",
  usage: [
    `\`${process.env.PREFIX}war [clan tag]\` - shows war summary of the tagged clan`
  ]
};

module.exports.run = async (client, message, args) => {
  var warData;
  await clientSc
    .clanCurrentWarByTag(args[0].toUpperCase())
    .then(response => {
      warData = response;
    })
    .catch(err => console.log(err));

    if (warData.state === "notInWar") {
    return message.channel.send(
      "Seems like a peace loving Clan. i mean they are not in war!"
    );
  }
  
  const loading = client.emojis.find(emoji => emoji.name === "loading");
  await message.channel
    .send("Generating...pls HODL!" + loading)
    .then(async msg => {
      msg.delete(4000);
    });

  let teamSize = warData.teamSize;
  let clanTownHalls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let clanAttacksRemaining = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let clanBasesStanding = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let opponentsTownhalls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let opponentsAttacksRemaining = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let opponentsBasesStanding = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //have to put an if condition in case the clan is in preparation day
  //tagged Clan details
  let clanName = warData.clan.name;
  let clanBadge = warData.clan.badgeUrls.small;
  let clanAttacks = warData.clan.attacks;
  let clanStars = warData.clan.stars;
  let clanDestruction = warData.clan.destructionPercentage;

  //opponent Clan Details
  let opponentName = warData.opponent.name;
  let opponentBadge = warData.opponent.badgeUrls.small;
  let opponentAttacks = warData.opponent.attacks;
  let opponentStars = warData.opponent.stars;
  let opponentDestruction = warData.opponent.destructionPercentage;

  for (var i = 0; i < teamSize; i++) {
    clanTownHalls[warData.clan.members[i].townhallLevel - 3] += 1;
    opponentsTownhalls[warData.opponent.members[i].townhallLevel - 3] += 1;
    }
  
  for(var i = 10;i >=0;i--){
    clanAttacksRemaining[i] = clanTownHalls[i] * 2;
    opponentsAttacksRemaining[i] = opponentsTownhalls[i]*2;
  }

  for (var i = 0; i < teamSize; i++) {
    if (warData.opponent.members[i].hasOwnProperty("attacks")) {
      opponentsAttacksRemaining[warData.opponent.members[i].townhallLevel - 3] -= warData.opponent.members[i].attacks.length;
    }
    if (warData.clan.members[i].hasOwnProperty("attacks")) {
      clanAttacksRemaining[warData.clan.members[i].townhallLevel - 3] -= warData.clan.members[i].attacks.length;
    }

    if (warData.clan.members[i].opponentAttacks === 0) {
      clanBasesStanding[warData.clan.members[i].townhallLevel - 3] += 1;
    }
    if (warData.clan.members[i].opponentAttacks > 0) {
      if (  warData.clan.members[i].bestOpponentAttack.destructionPercentage < 100) {
        clanBasesStanding[warData.clan.members[i].townhallLevel - 3] += 1;
      }
    }
    if (warData.opponent.members[i].opponentAttacks === 0) {
      opponentsBasesStanding[warData.opponent.members[i].townhallLevel - 3] += 1;
    }

    if (warData.opponent.members[i].opponentAttacks > 0) {
      if (warData.opponent.members[i].bestOpponentAttack.destructionPercentage < 100 ) {
        opponentsBasesStanding[warData.opponent.members[i].townhallLevel - 3] += 1;
      }
    }
  }

  const { registerFont } = require('canvas')
    registerFont("/app/modules/sc-font.ttf", { family: 'sc-font' })
  const canvas = Canvas.createCanvas(1200, 850);
  const ctx = canvas.getContext("2d");

  // Since the image takes time to load
  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fback_2.jpg?v=1573743826552"
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

  roundedRectangle(0, 0, canvas.width, canvas.height, 40);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  //drawing lines across the canvas
  ctx.strokeStyle = "#000000";
  ctx.moveTo(0, 100);
  ctx.lineTo(1200, 100);
  ctx.moveTo(0, 280);
  ctx.lineTo(1200, 280);
  ctx.moveTo(0, 360);
  ctx.lineTo(1200, 360);
  ctx.moveTo(0, 400);
  ctx.lineTo(1200, 400);
  ctx.moveTo(0, 450);
  ctx.lineTo(1200, 450);
  ctx.moveTo(0, 500);
  ctx.lineTo(1200, 500);
  ctx.moveTo(0, 540);
  ctx.lineTo(1200, 540);
  ctx.moveTo(0, 590);
  ctx.lineTo(1200, 590);
  ctx.moveTo(0, 640);
  ctx.lineTo(1200, 640);
  ctx.moveTo(0, 680);
  ctx.lineTo(1200, 680);
  ctx.moveTo(0, 730);
  ctx.lineTo(1200, 730);
  ctx.moveTo(0, 780);
  ctx.lineTo(1200, 780);

  ctx.stroke();

  //drawing rectangles
  ctx.lineWidth = "2";
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.rect(0, 280, 1200, 80);
  ctx.fillStyle = "#00b8ff";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  

  ctx.globalAlpha = 1;
  for (var i = 0; i <= 10; i++) {
    ctx.strokeStyle = "#000000";
    ctx.moveTo(199+(i)*91, 280);
    ctx.lineTo(199+(i)*91, 360);
    
    ctx.moveTo(199+(i)*91, 400);
    ctx.lineTo(199+(i)*91, 500);
    
    ctx.moveTo(199+(i)*91, 540);
    ctx.lineTo(199+(i)*91, 640);
    
    ctx.moveTo(199+(i)*91, 680);
    ctx.lineTo(199+(i)*91, 780);
    ctx.stroke();
  }
  
    ctx.moveTo(500, 100);
    ctx.lineTo(500, 280);
    ctx.moveTo(700, 100);
    ctx.lineTo(700, 280);
    ctx.moveTo(500, 160);
    ctx.lineTo(700, 160);
    ctx.moveTo(500, 220);
    ctx.lineTo(700, 220);
    ctx.stroke();
  
  
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.rect(0, 360, 1200, 40);
  ctx.fillStyle = "#cfcd00";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(0, 500, 1200, 40);
  ctx.fillStyle = "#ff80ed";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(0, 640, 1200, 40);
  ctx.fillStyle = "#bada55";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.globalAlpha = 1;
  var color = "";
  var optColor = ""
  if (clanStars > opponentStars) {
    color = "#32ff32";
    optColor = "#ff4040";
  }
  if (clanStars < opponentStars) {
    color = "#ff4040";
    optColor = "#32ff32";
  }
  if (clanStars === opponentStars) {
    color = "#ffd700";
    optColor = "#ffd700";
  }
  
  ctx.textAlign = "right";
  ctx.font = "29px sc-font";
  ctx.fillStyle = color;
  ctx.fillText(clanName, 450, 70);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "21px sc-font";
  ctx.fillText(" VS\n("+teamSize+")", 600, 50);
  ctx.textAlign = "left";
  ctx.font = "29px sc-font";
  ctx.fillStyle = optColor;
  ctx.fillText(opponentName, 750, 70);

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "22px sc-font";
  ctx.fillText ("TownHalls", 100, 330);
  ctx.font = "bold 26px Calibri";
  ctx.fillText ("Base Distribution", 600, 388);
  ctx.fillText ("Attacks Left", 600, 528);
  ctx.fillText ("Bases Standing", 600, 668);
  
  ctx.fillStyle = "#ffffff";
  ctx.font = "28px Calibri";
  ctx.fillText ("Your Clan", 100, 435);
  ctx.fillText ("Opponent", 100, 485);
  ctx.fillText ("Your Clan", 100, 575);
  ctx.fillText ("Opponent", 100, 625);
  ctx.fillText ("Your Clan", 100, 715);
  ctx.fillText ("Opponent", 100, 765);
  
  ctx.fillStyle = "#ffff00";
  ctx.font = "22px sc-font";
  ctx.fillText ("⚔️ Attacks ⚔️", 600, 200);
  ctx.font = "20px sc-font";
  ctx.fillText ("Destruction", 600, 260);
  
  for (var i = 10; i >= 0; i--) {
    ctx.fillStyle = "#000000";
    ctx.font = "24px sc-font";
    ctx.fillText(i + 3, 152 + 91 * (11 - i), 330);
    ctx.fillStyle = "#ffffff";
    ctx.font = "28px Calibri";
    ctx.fillText(clanTownHalls[i], 152 + 91 * (11 - i), 435);
    ctx.fillText(opponentsTownhalls[i], 152 + 91 * (11 - i), 485);
    ctx.fillText(clanAttacksRemaining[i], 152 + 91 * (11 - i), 575);
    ctx.fillText(opponentsAttacksRemaining[i], 152 + 91 * (11 - i), 625);
    ctx.fillText(clanBasesStanding[i], 152 + 91 * (11 - i), 715);
    ctx.fillText(opponentsBasesStanding[i], 152 + 91 * (11 - i), 765);
  }
  
  ctx.font = "22px sc-font";
  ctx.fillStyle = "#ffffff";
  ctx.fillText (warData.state.toUpperCase(), 600, 830);
  
  ctx.beginPath();
  ctx.rect(480-(320*clanStars/(teamSize*3)), 120, 320*clanStars/(teamSize*3), 20);
  ctx.fillStyle = "#00b8ff";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  
  ctx.beginPath();
  ctx.rect(480-(320*clanAttacks/(teamSize*2)), 180, 320*clanAttacks/(teamSize*2), 20);
  ctx.fillStyle = "#cfcd00";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  
  ctx.beginPath();
  ctx.rect(480-(320*clanDestruction/100), 240, 320*clanDestruction/100, 20);
  ctx.fillStyle = "#ff80ed";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  
  ctx.beginPath();
  ctx.rect(720, 120, 320*opponentStars/(teamSize*3), 20);
  ctx.fillStyle = "#00b8ff";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  
  ctx.beginPath();
  ctx.rect(720, 180, 320*opponentAttacks/(teamSize*2), 20);
  ctx.fillStyle = "#cfcd00";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  
  ctx.beginPath();
  ctx.rect(720, 240, 320*opponentDestruction/100, 20);
  ctx.fillStyle = "#ff80ed";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  
    ctx.fillStyle = "#ffffff";
    ctx.fillText(clanAttacks+"/"+teamSize*2, 420-(320*clanAttacks/(teamSize*2)), 200);
    ctx.fillText(clanDestruction.toFixed(2)+"%", 400-(320*clanDestruction/100), 260);
    ctx.fillText(opponentAttacks+"/"+(teamSize*2), 780+320*opponentAttacks/(teamSize*2), 200);
    ctx.fillText(opponentDestruction.toFixed(2)+"%", 800+320*opponentDestruction/100, 260);
    ctx.font = "24px sc-font"; 
    ctx.fillText(clanStars+"/"+teamSize*3, 420-(320*clanStars/(teamSize*3)), 140);
    ctx.fillText(opponentStars+"/"+(teamSize*3), 780+320*opponentStars/(teamSize*3), 140);
 
  
  const clanImage = await Canvas.loadImage(clanBadge);
  ctx.drawImage(clanImage, 460, 10, 80, 80);
  const opponentImage = await Canvas.loadImage(opponentBadge);
  ctx.drawImage(opponentImage, 660, 10, 80, 80);
  const starImage = await Canvas.loadImage("https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Ffile3-starspng-three-stars-png-477_216.png?v=1573742807599");
  ctx.drawImage(starImage, 535, 100, 130, 58);
  

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "clan-war-image-"+clanName+".png"
  );

  await message.channel.send(attachment);
  return;
};
