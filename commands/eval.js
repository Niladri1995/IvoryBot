module.exports = {
  name: "Mystery",
  syntax: `${process.env.PREFIX} like i will tell you`,
  description: "happens mysterious things",
  help: "Eval command ",
  usage: [`\`${process.env.PREFIX}eval\` - ike i will tell you`]
};

module.exports.run = (client, message, args) => {
  if (message.author.id !== process.env.OWNER_ID) return;

  const channel = client.channels.find(
    x => x.name === "lab"
  );
  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    channel.send(clean(evaled), { code: "xl" });
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }

  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
};
