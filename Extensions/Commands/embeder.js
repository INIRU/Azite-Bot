const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

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
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(client, interaction) {
    const channel = interaction.options.getChannel('channel');

    const embed = new EmbedBuilder()
      .setColor(0x212a3e)
      .setTitle('자기소개')
      .setDescription(`${client.user}에게 **자신**을 소개하여 주세요.`)
      .addFields({
        name: '> ‼️**주의 사항**',
        value:
          '``` 자기소개를 작성할 경우 아지트 약관에 동의하신걸로 간주합니다.\n허위로 작성하는 경우 제재를 받습니다.```',
      });

    const button = new ButtonBuilder()
      .setCustomId('show')
      .setLabel('🙋‍♂️ 자기소개')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await channel.send({ embeds: [embed], components: [row] });
    await interaction.reply({
      content: `${channel}로 전송되었습니다.`,
      ephemeral: true,
    });
  },
};
