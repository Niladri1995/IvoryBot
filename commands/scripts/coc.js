const clashApi = require("clash-of-clans-api");
let clientSc = clashApi({
  token: process.env.COC_API
});
const Discord = require("discord.js");

module.exports = {
  // script to store war star data
  starsPG(client) {
    var tags = [];

    clientSc
      .clanMembersByTag("#UPVJL9C0")
      .then(response => {
        let memberCount = response.items.length;
        console.log("PG Total members: " + memberCount);

        for (var i = 0; i < memberCount; i++) {
          tags.push(response.items[i].tag);
        }

        warStar(tags);
      })
      .catch(err => console.log(err));

    function warStar(tags) {
      for (var i = 0; i < tags.length; i++) {
        clientSc
          .playerByTag(tags[i])
          .then(response => {
            if (
              client.warStarsData.has(`${process.env.CLAN_TAG}-${response.tag}`)
            ) {
              let previousWarStar = client.warStarsData.get(
                `${process.env.CLAN_TAG}-${response.tag}`,
                "currentWarStars"
              );
              let previousStarGained = client.warStarsData.get(
                `${process.env.CLAN_TAG}-${response.tag}`,
                "starGained"
              );
              let starGained = response.warStars - previousWarStar;

              client.warStarsData.set(
                `${process.env.CLAN_TAG}-${response.tag}`,
                response.warStars,
                "currentWarStars"
              );
              client.warStarsData.set(
                `${process.env.CLAN_TAG}-${response.tag}`,
                previousStarGained + starGained,
                "starGained"
              );
            }

            client.warStarsData.ensure(
              `${process.env.CLAN_TAG}-${response.tag}`,
              {
                // enmap for the war stars
                playerName: response.name,
                playerTag: response.tag,
                townHall: parseInt(response["townHallLevel"]),
                currentWarStars: response.warStars,
                starGained: 0
              }
            );
          })
          .catch(e => console.log(e.message));
      }
    }
  },

  // new script
  starsSnH(client) {
    var tags = [];

    clientSc
      .clanMembersByTag("#JYJC9RRL")
      .then(response => {
        let memberCount = response.items.length;
        console.log("SnH Total members: " + memberCount);

        for (var i = 0; i < memberCount; i++) {
          tags.push(response.items[i].tag);
        }

        warStar(tags);
      })
      .catch(err => console.log(err));

    function warStar(tags) {
      for (var i = 0; i < tags.length; i++) {
        clientSc
          .playerByTag(tags[i])
          .then(response => {
            if (
              client.SnHwarStarsData.has(
                `${process.env.CLAN_TAG_SNH}-${response.tag}`
              )
            ) {
              let previousWarStar = client.SnHwarStarsData.get(
                `${process.env.CLAN_TAG_SNH}-${response.tag}`,
                "currentWarStars"
              );
              let previousStarGained = client.SnHwarStarsData.get(
                `${process.env.CLAN_TAG_SNH}-${response.tag}`,
                "starGained"
              );
              let starGained = response.warStars - previousWarStar;

              client.SnHwarStarsData.set(
                `${process.env.CLAN_TAG_SNH}-${response.tag}`,
                response.warStars,
                "currentWarStars"
              );
              client.SnHwarStarsData.set(
                `${process.env.CLAN_TAG_SNH}-${response.tag}`,
                previousStarGained + starGained,
                "starGained"
              );
            }

            client.SnHwarStarsData.ensure(
              `${process.env.CLAN_TAG_SNH}-${response.tag}`,
              {
                // enmap for the war stars
                playerName: response.name,
                playerTag: response.tag,
                townHall: parseInt(response["townHallLevel"]),
                currentWarStars: response.warStars,
                starGained: 0
              }
            );
          })
          .catch(e => console.log(e.message));
      }
    }
  },

  detailsSnh(client) {
    var tags = [];

    client.SnHClanData.deleteAll();

    clientSc
      .clanMembersByTag("#JYJC9RRL")
      .then(response => {
        let memberCount = response.items.length;

        for (var i = 0; i < memberCount; i++) {
          tags.push(response.items[i].tag);
        }
        fetchMember(tags);
      })
      .catch(err => console.log(err));

    async function fetchMember(tags) {
      for (var i = 0; i < tags.length; i++) {
        await clientSc
          .playerByTag(tags[i])
          .then(response => {
            client.SnHClanData.ensure(
              `${process.env.CLAN_TAG_SNH}-${response.tag}`,
              {
                // enmap for the war stars
                playerName: response.name,
                townHall: parseInt(response["townHallLevel"]),
                builderHall: parseInt(response["builderHallLevel"]),
                trophies: response.trophies,
                versusTrophies: response.versusTrophies
              }
            );
          })
          .catch(e => console.log(e.message));
      }
      console.log("Snh members updated");
    }
  },

  detailsPg(client) {
    var tags = [];

    client.PgClanData.deleteAll();

    clientSc
      .clanMembersByTag("#UPVJL9C0")
      .then(response => {
        let memberCount = response.items.length;

        for (var i = 0; i < memberCount; i++) {
          tags.push(response.items[i].tag);
        }
        fetchMember(tags);
      })
      .catch(err => console.log(err));

    async function fetchMember(tags) {
      for (var i = 0; i < tags.length; i++) {
        await clientSc
          .playerByTag(tags[i])
          .then(response => {
            client.PgClanData.ensure(
              `${process.env.CLAN_TAG_SNH}-${response.tag}`,
              {
                // enmap for the war stars
                playerName: response.name,
                townHall: parseInt(response["townHallLevel"]),
                builderHall: parseInt(response["builderHallLevel"]),
                trophies: response.trophies,
                versusTrophies: response.versusTrophies
              }
            );
          })
          .catch(e => console.log(e.message));
      }
      console.log("Pg members updated");
    }
  }
};
