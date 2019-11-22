//BOT starts from here

const http = require("http");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const coc = require("./commands/scripts/coc");
const cocLiveData = require("./commands/scripts/cocStars");
const cocLiveCGData = require("./commands/scripts/cocClanGames");

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  //coc.starsPG(client);
  //coc.starsSnH(client);
  coc.detailsSnh(client);
  coc.detailsPg(client);
  cocLiveData.warPG(client);
  cocLiveCGData.clanGamesPg(client);
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`);
}, 280000);

client.once("ready", () => {
  console.log("Ready!");
  client.user.setActivity("/help", { type: "LISTENING" });

  /*coc.starsPG(client);
  coc.starsSnH(client);
  coc.detailsSnh(client);
  coc.detailsPg(client);*/
  //cocLiveData.warPG(client);
  //cocLiveCGData.clanGamesPg(client);
  

  const channel = client.channels.find(x => x.name === "lab");
  channel.send("I am good");

  // use the message's channel (TextChannel) to send a new message
  const filtered = client.birthdays
    .filter(p => p.guild === process.env.GUILD_ID)
    .array();
  const sorted = filtered.sort((a, b) => b.month - a.month);
  const today = new Date();
  for (const data of sorted) {
    if (
      data.date === parseInt(today.getDate()) &&
      data.month === parseInt(today.getMonth() + 1)
    ) {
      const channel = client.channels.find(
        x => x.name === process.env.BDAY_CHANNEL
      );
      channel
        .send(
          "Today is " + data.memberName + "'s Birthday. Dont forget to wish"
        )
        .catch(console.error);
    }
  }
});

client.on("error", e => console.log("Discord.js error:", e.message));

// All ENMAPS
client.birthdays = new Enmap({
  name: "birthdays",
  fetchAll: true,
  autoFetch: true,
  cloneLevel: "deep"
});

client.warStarsData = new Enmap({
  name: "warStarsData",
  fetchAll: true,
  autoFetch: true,
  cloneLevel: "deep"
});

client.SnHwarStarsData = new Enmap({
  name: "SnHwarStarsData",
  fetchAll: true,
  autoFetch: true,
  cloneLevel: "deep"
});

client.SnHClanData = new Enmap({
  name: "SnHClanData",
  fetchAll: true,
  autoFetch: true,
  cloneLevel: "deep"
});

client.PgClanData = new Enmap({
  name: "PgClanData",
  fetchAll: true,
  autoFetch: true,
  cloneLevel: "deep"
});

client.cgClanPGData = new Enmap({
  name: "CgClanPGData",
  fetchAll: true,
  autoFetch: true,
  cloneLevel: "deep"
});

client.rcs = new Enmap({
  name: "rcs",
  fetchAll: true,
  autoFetch: true,
  cloneLevel: "deep"
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(process.env.TOKEN);
