const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require('discord.js');

function createEmbed(interaction, type) {
  let embed = null;
  let row = null;
  let content = null;
  if (type === 'show') {
    embed = new EmbedBuilder()
      .setColor(0x212a3e)
      .setTitle('자기소개')
      .setDescription(
        `${interaction.client.user}에게 **자신**을 소개하여 주세요.`
      )
      .addFields({
        name: '> ‼️**주의 사항**',
        value:
          '``` 자기소개를 작성할 경우 아지트 약관에 동의하신걸로 간주합니다.\n허위로 작성하는 경우 제재를 받습니다.```',
      });

    const button = new ButtonBuilder()
      .setCustomId('show')
      .setLabel('🙋‍♂️ 자기소개')
      .setStyle(ButtonStyle.Primary);

    row = new ActionRowBuilder().addComponents(button);
  } else if (type === 'ticket') {
    embed = new EmbedBuilder()
      .setColor(0x16b077)
      .setTitle('문의 하기')
      .setDescription('해당되는 지원 항목을 선택하여주세요.')
      .addFields({
        name: '> 📌 **주의사항**',
        value:
          '`- 지원채널 생성후 먼저 문제사항을 제시해주세요.`\n`- 장난으로 지원채널을 생성하지 말아주세요.`\n`- 관리팀을 존중하여 주세요.`',
      });

    const select = new StringSelectMenuBuilder()
      .setCustomId('ticket')
      .setPlaceholder('지원 항목을 선택하여주세요.')
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('불레디 인증')
          .setDescription('불멸, 레디언트 티어 인증 티켓 생성')
          .setEmoji('1102544528893808690')
          .setValue('roles'),
        new StringSelectMenuOptionBuilder()
          .setLabel('유저 신고')
          .setDescription('규칙을 어긴 유저 신고 티켓 생성')
          .setEmoji('🚨')
          .setValue('report'),
        new StringSelectMenuOptionBuilder()
          .setLabel('프로 인증')
          .setDescription('프로 인증 티켓 생성')
          .setEmoji('🎮')
          .setValue('game'),
        new StringSelectMenuOptionBuilder()
          .setLabel('유튜버 인증')
          .setDescription('유튜버 인증 티켓 생성')
          .setEmoji('🎬')
          .setValue('youtube'),
        new StringSelectMenuOptionBuilder()
          .setLabel('기타 문의')
          .setDescription('그 외 문의사항')
          .setEmoji('🗂️')
          .setValue('etc')
      );

    row = new ActionRowBuilder().addComponents(select);
  } else {
    return false;
  }
  return { content: content, embeds: [embed], components: [row] };
}

module.exports = {
  createEmbed,
};
