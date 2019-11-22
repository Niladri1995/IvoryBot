const _ = require("lodash");
const reactions = require("../modules/reactions");

// Metadata
module.exports = {
  name: "Help",
  syntax: `${process.env.PREFIX}help`,
  description: "Display help for commands.",
  help:
    "Displays help for commands and can be used to display more information about a specific command.",
  usage: [
    `\`${process.env.PREFIX}help\` - Displays help for enabled commands only.`
  ]
};

module.exports.run = (client, message, args) => {
  const buttons = [
    reactions.one,
    reactions.two,
    reactions.three,
    reactions.four,
    reactions.five,
    reactions.six,
    reactions.seven,
    reactions.eight,
    reactions.nine
  ];

  const commandsPerPage = 5;
  let pages;

  pages = _.chunk(client.commands.array(), commandsPerPage);

  pages = pages.map(page => {
    // Generate the command fields
    const fields = page.map(command => ({
      name: `__${command.name}__`,
      value: `Description: ${command.description}\nSyntax: \`${command.syntax}\``
    }));

    return {
      embed: {
        color: 15849775,
        author: {
          name: "General Commands!",
          icon_url:
            "https://cdn.glitch.com/c9cc8547-392b-4b63-8c2e-af4bb9cd1a44%2Fbitmoji-20190811112514.png?v=1567318241184"
        },
        fields // Here are the commands!
      }
    };
  });

  //console.log(pages[0]);
  message.channel
    .send(pages[0])
    .then(async msg => {
      // send the first command page
      // Display all the number buttons
      for (const [index, _] of pages.entries()) {
        await msg.react(buttons[index]);
      }

      // Display the X button after the buttons
      await msg.react(reactions.x);
      message.delete(120000).catch();
      msg.delete(120000).catch();

      // Create a collector to listen for button presses
      const collector = msg.createReactionCollector(
        (reaction, user) => user !== client.user
      );

      // Every time a button is pressed, run this function.
      collector.on("collect", async messageReaction => {
        // If the x button is pressed, remove the message.
        if (messageReaction.emoji.name === reactions.x) {
          msg.delete(); // Delete the message
          message.delete();
          collector.stop(); // Delete the collector.
          return;
        }

        // Get the index of the page by button pressed
        const pageIndex = buttons.indexOf(messageReaction.emoji.name);

        // Return if emoji is irrelevant or the page doesnt exist (number too high)
        if (pageIndex === -1 || !pages[pageIndex]) return;

        // Edit the message to show the new page.
        msg.edit(pages[pageIndex]);

        /*
    Get the user that clicked the reaction and remove the reaction.
    This matters because if you just do remove(), it will remove the bots
    reaction which will have unintended side effects.
    */
        const notbot = messageReaction.users
          .filter(clientuser => clientuser !== client.user)
          .first();
        await messageReaction.remove(notbot);
      });
    })
    .catch(err => console.log(err));
};
