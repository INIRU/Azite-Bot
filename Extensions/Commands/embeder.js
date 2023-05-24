const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');
const { createEmbed } = require('../Module/Embeder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embeder')
    .setDescription('임베드를 출력하는 명령어 입니다.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('임베드가 전송될 채널ID')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('임베드가 만들어질 타입')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const type = interaction.options.getString('type');

    const reponse = createEmbed(interaction, type);

    if (!reponse) {
      await interaction.reply({
        content: '등록이 안된 `embed`입니다.',
        ephemeral: true,
      });
      return;
    }
    await interaction.reply({
      content: `${channel}로 전송되었습니다.`,
      ephemeral: true,
    });
    await channel.send(reponse);
  },
};
