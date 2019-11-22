const Discord = require("discord.js");
const Canvas = require("canvas");
const clashApi = require("clash-of-clans-api");
let clientSc = clashApi({
  token: process.env.COC_API
});

// Metadata
module.exports = {
  name: "Player Search",
  syntax: `${process.env.PREFIX}ps [playertag]`,
  description: "Searches the player and shows profile",
  help: "Clan search command ",
  usage: [`\`${process.env.PREFIX}ps [playertag]\` - searches a player`]
};

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    return message.channel.send("You forgot to put a player Tag");
  }

  const loading = client.emojis.find(emoji => emoji.name === "loading2");
  await message.channel
    .send("Fetching Data...It will take time"+loading)
    .then(async msg => {
      msg.delete(4000);
    });

  let playerName = "";
  let tag = "";
  let exp = 0;
  let role = "Member";
  let townHall = 0;
  let Builderhall = 0;
  let king = 0;
  let queen = 0;
  let warden = 0;
  let bm = 0;
  let league =
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fno_league.png?v=1572438111297";
  let donation = 0;
  let donationReceived = 0;
  let bestTrophies = 0;
  let bestVersusTrophies = 0;
  let currentTrophies = 0;
  let currentVersusTrophies = 0;
  let warStars = 0;
  let clan = "   ";
  let heroes = [];

  await clientSc
    .playerByTag(args[0].toUpperCase())
    .then(response => {
      playerName = response.name;
      tag = response.tag;
      exp = response.expLevel;
      townHall = response.townHallLevel;
      Builderhall = response.builderHallLevel;
      donation = response.donations;
      donationReceived = response.donationsReceived;
      bestTrophies = response.bestTrophies;
      bestVersusTrophies = response.bestVersusTrophies;
      currentTrophies = response.trophies;
      currentVersusTrophies = response.versusTrophies;
      warStars = response.warStars;
      role = response.role;
      clan = response.clan.name;
      heroes = response.heroes;
      league = response.league.iconUrls.medium;
    })
    .catch(err => {
      return console.log(err);
    });

  if (playerName.length === 0) {
    return message.channel.send("Some thing went wrong! check the Player Tag.");
  }

  if (role === "admin") {
    role = "Elder";
  }
  if (role === "coLeader") {
    role = "Co-Leader";
  }
  if (role === "leader") {
    role = "Leader";
  }

  //console.log(league);

  const thpic = [
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth1.png?v=1572363592855",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth2.png?v=1572364903831",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth3.png?v=1572363708412",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth4.png?v=1572363708526",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth5.png?v=1572363709523",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth6.png?v=1572365088301",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth7.png?v=1572363710580",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth8.png?v=1572363714169",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth9.png?v=1572365030318",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth10.png?v=1572363724770",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth11.png?v=1572363726767",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fth12.png?v=1572363717299"
  ];

  const bhpic = [
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbh1.png?v=1572418199482",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbh2.png?v=1572418198313",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbh3.png?v=1572418198086",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbh4.png?v=1572418198279",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbh5.png?v=1572418199420",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbh6.png?v=1572418199457",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbh7.png?v=1572418199507",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbh8.png?v=1572418198587",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbh9.png?v=1572418199617"
  ];

  const backArray = [
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fblueback3.png?v=1572537463537",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fblueback2.png?v=1572537462132",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2F178385.png?v=1572410175742",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fblueback4.png?v=1572537505563"
  ];

  const thPicBackgroung = thpic[townHall - 1];
  const bhPicBackgroung = bhpic[Builderhall - 1];

  const n = Math.floor(Math.random() * 4 + 0);
  const backLink = backArray[n];
  
  console.log(n+"    "+backLink);

  const canvas = Canvas.createCanvas(900, 600);
  const ctx = canvas.getContext("2d");

  // Since the image takes time to load
  const background = await Canvas.loadImage(backLink);

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

  //doantions
  var length = 0;
  if (donation === 0 && donationReceived === 0) {
    ctx.beginPath();
    ctx.rect(415, 500, 0, 16);
    ctx.fillStyle = "#4ca64c";
    ctx.fill();
    ctx.font = "22px Optima";
    ctx.fillText(donation, 430, 516);

    ctx.beginPath();
    ctx.rect(415, 560, 0, 15);
    ctx.fillStyle = "#ff7f50";
    ctx.fill();

    ctx.font = "22px Optima";
    ctx.fillText(donationReceived, 430, 575);
  } else if (donation >= donationReceived) {
    length = (380 * donationReceived) / donation;
    ctx.beginPath();
    ctx.rect(415, 500, 380, 16);
    ctx.fillStyle = "#4ca64c";
    ctx.fill();
    ctx.font = "22px Optima";
    ctx.fillText(donation, 810, 516);

    ctx.beginPath();
    ctx.rect(415, 560, length, 15);
    ctx.fillStyle = "#ff7f50";
    ctx.fill();

    ctx.font = "22px Optima";
    ctx.fillText(donationReceived, 430 + length, 575);
  } else {
    length = (380 * donation) / donationReceived;
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.rect(415, 500, length, 16);
    ctx.fillStyle = "#4ca64c";
    ctx.fill();
    ctx.lineWidth = 0;
    ctx.font = "22px Optima";
    ctx.fillText(donation, 430 + length, 516);

    ctx.beginPath();
    ctx.rect(415, 560, 380, 15);
    ctx.fillStyle = "#ff7f50";
    ctx.fill();
    ctx.lineWidth = 0;

    ctx.font = "22px Optima";
    ctx.fillText(donationReceived, 810, 575);
  }
  ctx.font = "20px Optima";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Donations\nGiven:", 290, 500);
  ctx.fillText("Donations\nReceived:", 290, 560);

  //Player Details Text
  ctx.font = "42px Optima";
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(playerName, 40, 50);

  //heroes
  ctx.font = "34px Optima";
  ctx.textAlign = "left";
  for (var i = 0; i < heroes.length; i++) {
    if (heroes[i].name === "Barbarian King") {
      king = heroes[i].level;
      const kingPic = await Canvas.loadImage(
        "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fcocking.png?v=1572408538809"
      );
      var lengthKing = 360 / heroes.length;
      var widthKing = 360 / heroes.length;

      if (360 / heroes.length > 120) {
        lengthKing = 120;
        widthKing = 120;
      }
      ctx.drawImage(kingPic, 20, 140, widthKing, lengthKing);
      ctx.fillText(king, 180, 200);
    }

    if (heroes[i].name === "Archer Queen") {
      queen = heroes[i].level;
      const queenPic = await Canvas.loadImage(
        "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fqueen.png?v=1572408538553"
      );

      var lengthQueen = 360 / heroes.length;
      var widthQueen = 360 / heroes.length;

      if (360 / heroes.length > 120) {
        lengthQueen = 120;
        widthQueen = 120;
      }

      ctx.drawImage(
        queenPic,
        20,
        140 + i * (lengthQueen + 20),
        lengthQueen,
        widthQueen
      );
      var textPosY = 140 + i * (lengthQueen + 20);
      ctx.fillText(queen, 180, textPosY + 60);
    }

    if (heroes[i].name === "Grand Warden") {
      warden = heroes[i].level;
      const wardenPic = await Canvas.loadImage(
        "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fwarden.png?v=1572408538636"
      );

      var lengthGw = 360 / heroes.length;
      var widthGw = 360 / heroes.length;

      if (360 / heroes.length > 120) {
        lengthGw = 120;
        widthGw = 120;
      }

      ctx.drawImage(
        wardenPic,
        20,
        140 + i * (lengthGw + 20),
        widthGw,
        lengthGw
      );
      var textPosY = 140 + i * (lengthGw + 20);
      ctx.fillText(warden, 180, textPosY + 60);
    }

    if (heroes[i].name === "Battle Machine") {
      bm = heroes[i].level;
      const bmPic = await Canvas.loadImage(
        "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fcocbm.png?v=1572408550317"
      );

      var lengthBm = 360 / heroes.length;
      var widthBm = 360 / heroes.length;

      if (360 / heroes.length > 120) {
        lengthBm = 120;
        widthBm = 120;
      }

      ctx.drawImage(bmPic, 20, 140 + i * (lengthBm + 20), lengthBm, widthBm);
      var textPosY = 140 + i * (lengthBm + 20);
      ctx.fillText(bm, 180, textPosY + 60);
    }
  }

  //playerTag
  ctx.font = "20px Optima";
  ctx.textAlign = "left";
  ctx.fillText(args[0], 20, 100);

  //playerClan
  ctx.font = "20px Optima";
  ctx.textAlign = "left";
  ctx.fillText("Clan: " + clan + " (" + role + ")", 180, 100);

  //league
  ctx.font = "28px Optima";
  ctx.fillText("League:", 290, 160);

  //townHallDetails
  ctx.font = "24px Optima";
  ctx.fillText("Current\nTrophies:", 560, 150);
  ctx.fillText("Current\nTrophies:", 740, 150);
  ctx.fillText("Max\nTrophies:", 560, 260);
  ctx.fillText("Max\nTrophies:", 740, 260);
  ctx.fillText("War Stars:", 560, 370);
  ctx.fillStyle = "#ff7373";
  ctx.fillText(currentTrophies, 560, 220);
  ctx.fillText(currentVersusTrophies, 740, 220);
  ctx.fillText(bestTrophies, 560, 320);
  ctx.fillText(bestVersusTrophies, 740, 320);
  ctx.fillText(warStars, 560, 400);

  const avatar = await Canvas.loadImage(thPicBackgroung);
  ctx.drawImage(avatar, 585, 10, 100, 100);

  const bhavatar = await Canvas.loadImage(bhPicBackgroung);
  ctx.drawImage(bhavatar, 770, 10, 100, 100);

  ctx.globalAlpha = 0.7;
  ctx.lineWidth = 3;
  const leaguePic = await Canvas.loadImage(league);
  ctx.drawImage(leaguePic, 290, 180, 250, 250);

  //drawing lines across the canvas
  ctx.strokeStyle = "#ffffff";
  ctx.moveTo(0, 120);
  ctx.lineTo(900, 120);
  ctx.moveTo(275, 120);
  ctx.lineTo(275, 600);
  ctx.moveTo(730, 0);
  ctx.lineTo(730, 470);
  ctx.moveTo(550, 0);
  ctx.lineTo(550, 470);
  ctx.moveTo(275, 470);
  ctx.lineTo(900, 470);
  ctx.stroke();

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "player-profile-image.png"
  );

  await message.channel.send(attachment);
  return console.log("last line");
};
