const { Events, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  once: true,
  async execute(interaction) {
    if (interaction.user.bot) return;
    if (interaction.channel.type == ChannelType.DM) return;

    /**Slash Commands Input */
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`${interaction.commandName}는 등록되지 않은 명령어 입니다.`);
        return;
      }

      await command.execute(interaction);
    }

    /**Button Events */
    if (interaction.isButton()) {
      if (interaction.customId == 'show') {
        
      }
    }
  },
};
