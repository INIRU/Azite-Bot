const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client, interaction) {
    console.log(`${client.user.tag} is Ready!`);
  },
};
