const Discord = require("discord.js");
const Canvas = require("canvas");
const clashApi = require("clash-of-clans-api");
let clientSc = clashApi({
  token: process.env.COC_API
});

// Metadata
module.exports = {
  name: "Clan Search",
  syntax: `${process.env.PREFIX}cs [clantag]`,
  description: "Searches the clan and shows its profile",
  help: "Clan search command ",
  usage: [`\`${process.env.PREFIX}search [clantag]\` - searches a clan`]
};

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    message.channel.send("You forgot to put a Clan Tag");
  }

  const loading = client.emojis.find(emoji => emoji.name === "loading1");
  await message.channel
    .send("Fetching Data"+loading+" ...It will take time")
    .then(async msg => {
      msg.delete(4000);
    });

  const clanTag = args[0].toUpperCase();
  let clanName = "";
  let description = "";
  let label_1 = "None";
  let label_2 = "    ";
  let label_3 = "    ";
  let level = "";
  let memberCount = 0;
  let winCount = 0;
  let loseCount = 0;
  let drawCount = 0;
  let color = "";
  let badgeUrl = "";

  await clientSc
    .clanByTag(clanTag)
    .then(response => {
      clanName = response.name;
      description = response.description;
      level = response.clanLevel;
      memberCount = response.members;
      winCount = response.warWins;
      loseCount = response.warLosses;
      drawCount = response.warTies;
      badgeUrl = response.badgeUrls.small;
      label_1 = response.labels[0].name;
      label_2 = response.labels[1].name;
      label_3 = response.labels[2].name;
    })
    .catch(err => {
      return console.log(err);
    });

  if (clanName.length === 0) {
    return message.channel.send("Some thing went wrong! check the clan Tag.");
  }

  const backArray = [
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fclanback1.jpg?v=1571917723302",
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fclanback2.jpg?v=1571917736656"
  ];

  if (parseInt(memberCount) < 21) {
    color = "#fb4c19";
  } else if (parseInt(memberCount) < 36 && parseInt(memberCount) > 20) {
    color = "#ffff00";
  } else {
    color = "#4ca64c";
  }

  console.log("badge : " + badgeUrl);

  const n = Math.floor(Math.random() * 2 + 1) - 1;
  const backLink = backArray[n];

  console.log(clanName + "  " + level);

  const canvas = Canvas.createCanvas(800, 500);
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

  //drawing lines across the canvas
  ctx.strokeStyle = "#000000";
  ctx.moveTo(0, 90);
  ctx.lineTo(800, 90);
  ctx.moveTo(575, 0);
  ctx.lineTo(575, 90);
  ctx.moveTo(0, 280);
  ctx.lineTo(800, 280);
  ctx.moveTo(320, 280);
  ctx.lineTo(320, 500);
  ctx.stroke();

  //Clan Name
  ctx.strokeStyle = "#ffffff";
  ctx.font = "37px Optima";
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(clanName, 60, 60);

  //Clan parameters
  ctx.font = "25px Optima";
  ctx.textAlign = "left";
  ctx.fillStyle = "#40e0d0";
  ctx.fillText("Clan Parameters:", 60, 360);
  ctx.fillText(label_1, 60, 400);
  ctx.fillText(label_2, 60, 430);
  ctx.fillText(label_3, 60, 460);

  //Member Count Bar
  ctx.beginPath();
  ctx.rect(0, 280, (258 * memberCount) / 50, 15);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 0;
  ctx.strokeStyle = "black";
  ctx.stroke();

  // for drawing pie Chart
  var drawPieChart = function(data, colors) {
    var ctx = canvas.getContext("2d");
    var x = 450;
    var y = 390;
    var color,
      startAngle,
      endAngle,
      total = getTotal(data);
    if(total === 0){
      total = 1;
    }

    for (var i = 0; i < data.length; i++) {
      color = colors[i];
      startAngle = calculateStart(data, i, total);
      endAngle = calculateEnd(data, i, total);

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.moveTo(x, y);
      ctx.arc(x, y, 90, startAngle, endAngle);
      ctx.fill();
      ctx.rect(canvas.width - 230, y - i * 30 + 40, 17, 17);
      ctx.fill();
      ctx.font = "18px sans-serif";
      ctx.fillText(
        data[i].label +
          " - " +
          data[i].value +
          " (" +
          calculatePercent(data[i].value, total) +
          "%)",
        canvas.width - 230 + 20,
        y - i * 30 + 56
      );
    }
  };

  var calculatePercent = function(value, total) {
    return ((value / total) * 100).toFixed(2);
  };

  var getTotal = function(data) {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
      sum += data[i].value;
    }

    return sum;
  };

  var calculateStart = function(data, index, total) {
    if (index === 0) {
      return 0;
    }

    return calculateEnd(data, index - 1, total);
  };

  var calculateEndAngle = function(data, index, total) {
    var angle = (data[index].value / total) * 360;
    var inc = index === 0 ? 0 : calculateEndAngle(data, index - 1, total);

    return angle + inc;
  };

  var calculateEnd = function(data, index, total) {
    return degreeToRadians(calculateEndAngle(data, index, total));
  };

  var degreeToRadians = function(angle) {
    return (angle * Math.PI) / 180;
  };

  var data = [
    { label: "WIN", value: winCount },
    { label: "LOSS", value: loseCount },
    { label: "TIE", value: drawCount }
  ];
  var colors = ["#4ca3dd", "#ff7f50", "#ffd700"];

  drawPieChart(data, colors);

  //Wraping Clan description Text
  ctx.font = "22px Optima";
  ctx.fillStyle = "#fff68f";
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(" ");
    var line = "";

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  wrapText(ctx, description, 50, 120, 720, 28);

  //Numeric Member count text
  ctx.font = "20px Optima";
  ctx.textAlign = "left";
  ctx.fillText(memberCount + "/50", (258 * memberCount) / 50 + 3, 296);

  const avatar = await Canvas.loadImage(badgeUrl);
  ctx.drawImage(avatar, 650, 7, 80, 80);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "clan-image.png"
  );

  await message.channel.send(attachment);
};
