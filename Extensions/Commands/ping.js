const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('봇의 지연시간을 확인하는 명령어 입니다.'),
  async execute(client, interaction) {
    await interaction.reply({
      content: `Discord Bot: \`${client.ws.ping}ms\``,
      ephemeral: true,
    });
  },
};
