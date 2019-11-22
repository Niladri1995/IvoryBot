module.exports = (client, member) => {
  console.log(
    `New User "${member.user.username}" has joined "${member.guild.name}"`
  );

  const embed = {
    title: "💐 Dizzys Playgrnd 🌼",
    description:
      "A pretty chill out social clan\n**__Please post your player profile and base__**\n**For Clan [PASSWORD](https://www.reddit.com/r/redditclansystem/wiki/official_reddit_clan_system) 👈 tap this**\nWe are a part of [Reddit Clan System](https://www.reddit.com/r/RedditClanSystem/) see us here! ",
    url: "https://www.clashofstats.com/clans/dizzys-playgrnd-UPVJL9C0/members/",
    color: 5897779,
    timestamp: new Date(),
    thumbnail: {
      url:
        "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fpg2.jpg?v=1568046497950"
    },
    author: {
      name: "WELCOME ❗",
      icon_url: ""
    }
  };
  member.guild.channels
    .find(c => c.name === "new-recruits")
    .send(
      "<@" +
        member.user.id +
        "> Hii there!!",
      { embed }
    );

  member.guild.channels
    .find(c => c.name === "bot-spam")
    .send(`"${member.user.username}" has joined this server`);
};
