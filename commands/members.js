const Discord = require("discord.js");
const Canvas = require("canvas");
const clashApi = require("clash-of-clans-api");
let clientSc = clashApi({
  token: process.env.COC_API
});

module.exports = {
  name: "Clan members",
  syntax: `${process.env.PREFIX}members [snh, pg]`,
  description: "Shows current clan members",
  help: "clan members for snh",
  usage: [`\`${process.env.PREFIX}member\` - Shows current clan members`]
};

module.exports.run = async (client, message, args) => {
  if (args.length === 0) {
    message.channel.send("please mention pg or snh");
  }

  if (args[0] === ("snh" || "Strength & Honor")) {
    await message.channel.send("Fetching Data...").then(async msg => {
      msg.delete(7000);
    });
    
    let members = "";
    let th = "";
    let thTrophies = "";
    let bh = "";
    let bhTrophies = "";
    var i = 1;

    const array = await client.SnHClanData.array();
    const sorted = array
      .sort((a, b) => b.trophies - a.trophies);
    
    console.log(array.length);
      
    for (const data of sorted) {
      members += i;
      members +=". ";
      members += data.playerName
      members +="\n";
      
      th += data.townHall;
      th += "\n";
      
      bh += data.builderHall;
      bh += "\n";
      
      if(parseInt(data.trophies) < 1000){
        thTrophies += "  ";
      }
      thTrophies += data.trophies;
      thTrophies += "\n";
      
      if(parseInt(data.versusTrophies) < 1000){
        bhTrophies += "  ";
      }
      bhTrophies += data.versusTrophies;
      bhTrophies += "\n";
      i++;
    }
    
    console.log(members.length);
    
    const canvas = Canvas.createCanvas(800, 1400);
    const ctx = canvas.getContext("2d");

    // Since the image takes time to load, you should await it
    const background = await Canvas.loadImage(
      "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fback.jpg?v=1571728076042"
    );

    function roundedRectangle(x, y, w, h, radius) {
      var context = canvas.getContext("2d");
      var r = x + w;
      var b = y + h;
      context.beginPath();
      context.strokeStyle = "red";
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

    roundedRectangle(0, 0, canvas.width, canvas.height, 28);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = "22px Optima";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(members, 150, 100);
    ctx.fillText(th, 390, 100);
    ctx.fillText(thTrophies, 500, 100);
    ctx.fillText(bh, 610, 100);
    ctx.fillText(bhTrophies, 710, 100);

    ctx.font = "24px Optima";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("MEMBERS", 110, 50);
    ctx.fillText("TH", 390, 50);
    ctx.fillText("     TH\nTROPHIES", 500, 30)
    ctx.fillText("BH", 610, 50);
    ctx.fillText("      BH\nTROPHIES", 720, 30)

    ctx.moveTo(0, 75);
    ctx.lineTo(800, 75);
    ctx.moveTo(350, 0);
    ctx.lineTo(350, 1340);
    ctx.moveTo(430, 0);
    ctx.lineTo(430, 1340);
    ctx.moveTo(570, 0);
    ctx.lineTo(570, 1340);
    ctx.moveTo(650, 0);
    ctx.lineTo(650, 1340);
    ctx.moveTo(0, 1340);
    ctx.lineTo(800, 1340);
    ctx.stroke();

    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "#f6546a";
    ctx.textAlign = "center";
    ctx.fillText("Strenth & Honor", canvas.width / 2, 1380);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      "members-image.png"
    );

    await message.channel.send(attachment);
  }
  
  if (args[0] === ("pg" || "Dizzys playgrnd")) {
    await message.channel.send("Fetching Data...").then(async msg => {
      msg.delete(7000);
    });
    
    let members = "";
    let th = "";
    let thTrophies = "";
    let bh = "";
    let bhTrophies = "";
    var i = 1;

    const array = await client.PgClanData.array();
    const sorted = array
      .sort((a, b) => b.trophies - a.trophies);
    
    console.log(array.length);
      
    for (const data of sorted) {
      members += i;
      members +=". ";
      members += data.playerName
      members +="\n";
      
      th += data.townHall;
      th += "\n";
      
      bh += data.builderHall;
      bh += "\n";
      
      if(parseInt(data.trophies) < 1000){
        thTrophies += "  ";
      }
      thTrophies += data.trophies;
      thTrophies += "\n";
      
      if(parseInt(data.versusTrophies) < 1000){
        bhTrophies += "  ";
      }
      bhTrophies += data.versusTrophies;
      bhTrophies += "\n";
      i++;
    }
    
    console.log(members.length);
    
    const canvas = Canvas.createCanvas(800, 1400);
    const ctx = canvas.getContext("2d");

    // Since the image takes time to load, you should await it
    const background = await Canvas.loadImage(
      "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fback2.jpg?v=1571846120334"
    );

    function roundedRectangle(x, y, w, h, radius) {
      var context = canvas.getContext("2d");
      var r = x + w;
      var b = y + h;
      context.beginPath();
      context.strokeStyle = "#00ced1";
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

    roundedRectangle(0, 0, canvas.width, canvas.height, 28);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = "22px Optima";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(members, 150, 100);
    ctx.fillText(th, 390, 100);
    ctx.fillText(thTrophies, 500, 100);
    ctx.fillText(bh, 610, 100);
    ctx.fillText(bhTrophies, 710, 100);

    ctx.font = "24px Optima";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffa500";
    ctx.fillText("MEMBERS", 110, 50);
    ctx.fillText("TH", 390, 50);
    ctx.fillText("     TH\nTROPHIES", 500, 30)
    ctx.fillText("BH", 610, 50);
    ctx.fillText("      BH\nTROPHIES", 720, 30)

    ctx.moveTo(0, 75);
    ctx.lineTo(800, 75);
    ctx.moveTo(350, 0);
    ctx.lineTo(350, 1340);
    ctx.moveTo(430, 0);
    ctx.lineTo(430, 1340);
    ctx.moveTo(570, 0);
    ctx.lineTo(570, 1340);
    ctx.moveTo(650, 0);
    ctx.lineTo(650, 1340);
    ctx.moveTo(0, 1340);
    ctx.lineTo(800, 1340);
    ctx.stroke();

    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "#f6546a";
    ctx.textAlign = "center";
    ctx.fillText("Dizzys Playgrnd", canvas.width / 2, 1380);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      "members-image.png"
    );

    await message.channel.send(attachment);
  }
};
