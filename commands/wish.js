const Discord = require("discord.js");
const Canvas = require("canvas");

// Metadata
module.exports = {
  name: "Birthday Wish",
  syntax: `${process.env.PREFIX}wish [name] or @mention`,
  description: "wishes the mentioned person",
  help: "Bday wish command ",
  usage: [
    `\`${process.env.PREFIX}wish @mention\` - wishes the mentioned person`
  ]
};

module.exports.run = async (client, message, args) => {
  let name = "";
  let avatarUrl =
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fhooman.png?v=1570256817852";

  await message.channel
    .send("Give me some time to create the card, please.")
    .then(async msg => {
      msg.delete(2000);
    });

  if (message.mentions.users.size > 0) {
    let taggedMember = message.mentions.members.first();
    let userObject = message.mentions.users.first();
    console.log(taggedMember.nickname);
    console.log(userObject.username);
    if(taggedMember.nickname != null ){
    name = taggedMember.nickname;
    }else{
      name = userObject.username;
    }
    avatarUrl = userObject.avatarURL;
  } else {
    name = args[0];
  }

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 60;

    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${(fontSize -= 2)}px Optima`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 400);

    // Return the result to use in the actual canvas
    return ctx.font;
  };

  const canvas = Canvas.createCanvas(700, 350);
  const ctx = canvas.getContext("2d");

  // Since the image takes time to load, you should await it
  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2FBday.jpeg?v=1570252636991"
  );

  function roundedRectangle(x, y, w, h, radius) {
    var context = canvas.getContext("2d");
    var r = x + w;
    var b = y + h;
    context.beginPath();
    context.strokeStyle = "green";
    context.lineWidth = "4";
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

  // This uses the canvas dimensions to stretch the image onto the entire canvas
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#6C30F4";
  // Draw a rounded rectangle with the dimensions of the entire canvas

  //ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Select the font size and type from one of the natively available fonts
  ctx.font = applyText(canvas, name);
  // Select the style that will be used to fill the text in
  ctx.fillStyle = "#34AFD6";
  // Actually fill the text with a solid color
  ctx.fillText(name.toUpperCase(), canvas.width / 2.5, canvas.height / 3);

  // Slightly smaller text placed below the member's display name
  ctx.font = "26px Optima";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    "❤️ From playgrnd family",
    canvas.width / 2.5,
    canvas.height / 1.8
  );

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(avatarUrl);
  ctx.drawImage(avatar, 25, 25, 200, 200);

  // Use helpful Attachment class structure to process the file for you
  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "Bday-image.png"
  );

  message.channel.send(attachment);
};
