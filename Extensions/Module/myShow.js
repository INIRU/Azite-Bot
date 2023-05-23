const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require('discord.js');

function showModalBuilder() {
  const showModal = new ModalBuilder().setTitle('자기소개').setCustomId('show');

  const year = new Date().getFullYear();

  const ageInput = new TextInputBuilder()
    .setCustomId('age')
    .setLabel('나이')
    .setPlaceholder(`${year}년도 기준 나이를 입력하여주세요.`)
    .setMinLength(2)
    .setMaxLength(2)
    .setStyle(TextInputStyle.Short);

  const genderInput = new TextInputBuilder()
    .setCustomId('gender')
    .setLabel('성별')
    .setPlaceholder('자신의 성별을 입력하여주세요.')
    .setMinLength(2)
    .setMaxLength(2)
    .setStyle(TextInputStyle.Short);

  const ageInputRow = new ActionRowBuilder().addComponents(ageInput);
  const genderInputRow = new ActionRowBuilder().addComponents(genderInput);

  showModal.addComponents(ageInputRow, genderInputRow);

  return showModal;
}

function ShowSelectMenuBuilder() {
  const select = new StringSelectMenuBuilder()
    .setCustomId('tierSelecter')
    .setPlaceholder('티어를 선택하여주세요.')
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel('아이언')
        .setValue('809832298790518845')
        .setEmoji('1102544451441799178'),
      new StringSelectMenuOptionBuilder()
        .setLabel('브론즈')
        .setValue('757754722995273849')
        .setEmoji('1102544309770788914'),
      new StringSelectMenuOptionBuilder()
        .setLabel('실버')
        .setValue('757754794889707581')
        .setEmoji('1102544556685271161'),
      new StringSelectMenuOptionBuilder()
        .setLabel('골드')
        .setValue('757754786853683241')
        .setEmoji('1102544377169072158'),
      new StringSelectMenuOptionBuilder()
        .setLabel('플래티넘')
        .setValue('757754908878569643')
        .setEmoji('1102544491019251722'),
      new StringSelectMenuOptionBuilder()
        .setLabel('다이아몬드')
        .setValue('757754997848145998')
        .setEmoji('1102545153828339743'),
      new StringSelectMenuOptionBuilder()
        .setLabel('초월자')
        .setValue('989285274456588328')
        .setEmoji('1102544272659582996'),
      new StringSelectMenuOptionBuilder()
        .setLabel('불멸')
        .setValue('896387175610998835')
        .setEmoji('1102544415836352532'),
      new StringSelectMenuOptionBuilder()
        .setLabel('레디언트')
        .setValue('896386994635157564')
        .setEmoji('1102544528893808690')
    );

  const row = new ActionRowBuilder().addComponents(select);

  return row;
}

module.exports = {
  showModalBuilder,
  ShowSelectMenuBuilder,
};
