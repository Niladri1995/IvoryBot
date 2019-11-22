const clashApi = require("clash-of-clans-api");
let clientSc = clashApi({
  token: process.env.COC_API
});
const Discord = require("discord.js");

module.exports = {
  async warPG(client) {
    var warData;
    await clientSc
      .clanCurrentWarByTag("#UPVJL9C0")
      .then(response => {
        warData = response;
      })
      .catch(err => console.log(err));

    var color = "#0099ff";
    if (warData.state === "inWar") {
      color = "#fc5754";
    }
    if (warData.state === "preparation") {
      color = "#ffcd00";
    }

    const channel = client.channels.find(
      x => x.name === process.env.WAR_DATA_CHANNEL
    );

    var starEmoji = ["0⃣", "1⃣", "2⃣", "🔥"];

    channel
      .fetchMessage("644832975921348608")
      .then(message => {
        if (warData.state === "notInWar") {
          let messageEmbed = new Discord.RichEmbed()
            .setTitle("Not In War")
            .setDescription(`No war DATA to Show`);
          message.edit(messageEmbed);
          return;
        }

        var inwar = [];
        inwar = warData.clan.members;
        const sorted = inwar.sort((a, b) => a.mapPosition - b.mapPosition);

        //Clan Members in War
        let ret = "\n";
        ret += "\n🛡️\t\t⚔️\t\t⚔️\t\t\t**Players**";
        for (var i = 0; i < warData.teamSize; i++) {
          ret += "\n";

          if (inwar[i].opponentAttacks === 0) {
            ret += "✅   ";
          } else {
            if (
              inwar[i].bestOpponentAttack.stars > 0 &&
              inwar[i].bestOpponentAttack.stars < 3
            ) {
              ret += "⚠️   ";
            }
            if (inwar[i].bestOpponentAttack.stars === 3) {
              ret += "🔴   ";
            }
          }

          if (inwar[i].hasOwnProperty("attacks")) {
            if (inwar[i].attacks.length === 1) {
              ret += "\t" + starEmoji[inwar[i].attacks[0].stars] + "\t\t";
              ret += "❄️";
            }
            if (inwar[i].attacks.length === 2) {
              ret += "\t" + starEmoji[inwar[i].attacks[0].stars];
              ret += "\t\t" + starEmoji[inwar[i].attacks[1].stars];
            }
          } else {
            ret += "\t" + "❄️" + "\t\t" + "❄️";
          }
          ret += "    ";
          ret += inwar[i].name;
        }

        var title = "➡️";
        for (var k = 1; k <= 16 - warData.clan.stars.toString().length; k++) {
          title += " ";
        }
        title +=
          warData.clan.stars.toString() +
          "  ⭐  " +
          warData.opponent.stars.toString();
        title += "\n➡️";
        for (var k = 1; k <= 16 - warData.clan.attacks.toString().length; k++) {
          title += " ";
        }
        title +=
          warData.clan.attacks.toString() +
          "  ⚔️  " +
          warData.opponent.attacks.toString() +
          "\n";

        let embed = new Discord.RichEmbed()
          .setColor(color)
          .setTitle(title)
          .setDescription(ret)
          .setTimestamp()
          .setFooter("Updated at");

        message.edit("Dizzys playgrnd VS " + warData.opponent.name, { embed });
      })
      .catch(console.error);
    console.log("war updated!");
    return;
  }
};
