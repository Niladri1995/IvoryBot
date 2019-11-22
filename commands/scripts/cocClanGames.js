const clashApi = require("clash-of-clans-api");
let clientSc = clashApi({
  token: process.env.COC_API
});
const Discord = require("discord.js");

module.exports = {
  async clanGamesPg(client) {
    var tags = [];

    await clientSc
      .clanMembersByTag("#UPVJL9C0")
      .then(response => {
        let memberCount = response.items.length;

        for (var i = 0; i < memberCount; i++) {
          tags.push(response.items[i].tag);
        }
      })
      .catch(err => console.log(err));

    for (var i = 0; i < tags.length; i++) {
      await clientSc.playerByTag(tags[i]).then(response => {
        if (
          client.cgClanPGData.has(`${process.env.CLAN_TAG}-${response.tag}`)
        ) {
          let previousCGpoints = client.cgClanPGData.get(
            `${process.env.CLAN_TAG}-${response.tag}`,
            "currentTotalGamesPoints"
          );
          let previousPointsGained = client.cgClanPGData.get(
            `${process.env.CLAN_TAG}-${response.tag}`,
            "pointsGained"
          );

          let pointsDifference =
            response.achievements[31].value - previousCGpoints;

          client.cgClanPGData.set(
            `${process.env.CLAN_TAG}-${response.tag}`,
            response.achievements[31].value,
            "currentTotalGamesPoints"
          );
          client.cgClanPGData.set(
            `${process.env.CLAN_TAG}-${response.tag}`,
            previousPointsGained + pointsDifference,
            "pointsGained"
          );
        }

        client.cgClanPGData.ensure(`${process.env.CLAN_TAG}-${response.tag}`, {
          // enmap for the war stars
          playerName: response.name,
          playerTag: response.tag,
          clanGamesPoints: response.achievements[31].value,
          pointsGained: 0
        });

        //console.log(response.name + "  :  " + response.achievements[31].value);
      });
    }

    const channel = client.channels.find(
      x => x.name === process.env.CG_DATA_CHANNEL
    );

    let cgPlayers = client.cgClanPGData.array();
    const sorted = cgPlayers.sort((a, b) => b.pointsGained - a.pointsGained);
    var total = 0;
    var color = "#5b5da7";

    channel
      .fetchMessage("646950651619966997")
      .then(message => {
        let ret = "```True   Game     Players         \n";
        ret += "CGP    CGP        Name          \n";
        ret += "--------------------------------";
        for (var i = 0; i < sorted.length; i++) {
          ret += "\n";
          for (
            var k = 0;
            k < 4 - sorted[i].pointsGained.toString().length;
            k++
          ) {
            ret += " ";
          }
          ret += sorted[i].pointsGained;
          ret += "   ";
          for (
            var k = 0;
            k < 4 - sorted[i].pointsGained.toString().length;
            k++
          ) {
            ret += " ";
          }
          if (sorted[i].pointsGained > 4000) {
            ret += 4000;
          } else {
            ret += sorted[i].pointsGained;
          }
          ret += "  ";
          ret += sorted[i].playerName;
          total += sorted[i].pointsGained;
        }
        ret += "```";
        if (total > 50000) {
          color = "#4ca64c";
        }

        let embed = new Discord.RichEmbed()
          .setColor(color)
          .setTitle("Season Nov'19       ☃️\nTotal points: " + total)
          .setDescription(ret)
          .setTimestamp()
          .setFooter("Updated");

        message.edit("Dizzys playgrnd Clan Games Live", { embed });
      })
      .catch(console.error);
    console.log("CG updated");
    return;
  }
};
