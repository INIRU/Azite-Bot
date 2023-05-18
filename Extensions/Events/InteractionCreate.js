const {
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  EmbedBuilder,
} = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const { TicketBuild } = require('../Module/createChannel');

age_role = {
  15: '929030339370819614',
  16: '903132988051714069',
  17: '809086529417904138',
  18: '807770588688941118',
  19: '807770642145476608',
  20: '756129924447731822',
};

gender_role = {
  남자: '706421032667578368',
  여자: '706421031480328245',
};

module.exports = {
  name: Events.InteractionCreate,
  async execute(client, interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`${interaction.commandName}를 찾을 수 없습니다.`);
        return;
      }

      try {
        await command.execute(client, interaction);
      } catch (error) {
        console.log(error);
      }
    } else if (interaction.isButton()) {
      if (interaction.customId == 'show') {
        const showModal = new ModalBuilder()
          .setTitle('자기소개')
          .setCustomId('show');

        const ageInput = new TextInputBuilder()
          .setCustomId('age')
          .setLabel('나이')
          .setPlaceholder('현재 기준 나이를 입력하여주세요.')
          .setMinLength(2)
          .setMaxLength(2)
          .setStyle(TextInputStyle.Short);

        const genderInput = new TextInputBuilder()
          .setCustomId('gender')
          .setLabel('성별')
          .setPlaceholder('자신의 성별을 입력하여주세요.')
          .setValue('남여')
          .setMinLength(2)
          .setMaxLength(2)
          .setStyle(TextInputStyle.Short);

        const ageInputRow = new ActionRowBuilder().addComponents(ageInput);
        const genderInputRow = new ActionRowBuilder().addComponents(
          genderInput
        );

        showModal.addComponents(ageInputRow, genderInputRow);

        await interaction.showModal(showModal);
      } else if (interaction.customId == 'tkclose') {
        const ticketUser = await client.users.fetch(interaction.channel.topic);
        const logChannel = client.channels.cache.get('848872116102889492');
        const ticketId = interaction.channel.name.substr(6);
        const attachment = await discordTranscripts.createTranscript(
          interaction.channel,
          { poweredBy: false }
        );

        const embed = new EmbedBuilder()
          .setAuthor({
            name: ticketUser.tag,
            iconURL: ticketUser.avatarURL(),
          })
          .setDescription(
            '티켓이 비활성화 되었습니다.\n`[!] 파일을 다운로드하여 대화 내역을 확인할 수 있습니다.`'
          )
          .setColor(0xe06469)
          .addFields(
            {
              name: '> 🪪 **ID**',
              value: ticketId,
              inline: true,
            },
            {
              name: '🕖 **HISTORY**',
              value: `<t:${Math.floor(new Date().getTime() / 1000)}:t>`,
              inline: true,
            }
          );

        await logChannel.send({ files: [attachment], embeds: [embed] });
        await interaction.channel.delete();

        await ticketUser.send(
          `${ticketUser}님 **문제사항** 또는 **궁금증**이 해결됐으면 좋겠습니다.\n다음에 또 비슷한 일로 문의를 하실 때는 **\`티켓 ID(${ticketId})\`**를 관리자에게 알려주세요.`
        );
      }
    } else if (interaction.isModalSubmit()) {
      if (interaction.customId == 'show') {
        const age = interaction.fields.getTextInputValue('age');
        if (age < 15) {
          await interaction.reply({
            content: '죄송합니다. **`15`**세 이상만 받고있습니다.',
            ephemeral: true,
          });
          return;
        } else if (age >= 20) {
          age = '20';
        }
        const gender = interaction.fields.getTextInputValue('gender');
        if (gender != '남자' && gender != '여자') {
          await interaction.reply({
            content: '죄송합니다. **`남자`**, **`여자`**중에서 입력하여주세요.',
            ephemeral: true,
          });
          return;
        }

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

        const response = await interaction.reply({
          content: '자신의 티어를 선택하여주세요.',
          components: [row],
          ephemeral: true,
        });

        const collectorFilter = (i) => i.user.id === interaction.user.id;
        try {
          const confirmation = await response.awaitMessageComponent({
            filter: collectorFilter,
            time: 60_000,
          });

          if (confirmation) {
            const defaultRole = interaction.guild.roles.cache.find(
              (r) => r.id === '830086230166339597'
            );
            const tierRole = interaction.guild.roles.cache.find(
              (r) => r.id === confirmation.values[0]
            );
            const ageRole = interaction.guild.roles.cache.find(
              (r) => r.id === age_role[age]
            );
            const genderRole = interaction.guild.roles.cache.find(
              (r) => r.id === gender_role[gender]
            );

            if (
              confirmation.values[0] != '896387175610998835' &&
              confirmation.values[0] != '896386994635157564'
            ) {
              await interaction.member.roles.add([
                ageRole,
                genderRole,
                tierRole,
              ]);
              await interaction.editReply({
                content: `> ${tierRole}, ${genderRole}, ${ageRole}이 **지급**되었습니다.`,
                components: [],
              });
            } else {
              await interaction.member.roles.add([ageRole, genderRole]);
              const channel = await TicketBuild(
                client,
                interaction.guild,
                interaction.user,
                'roles'
              );

              await interaction.editReply({
                content: `${channel} **채널**로 가셔서 **자신**의 **티어**를 증명하세요.\n**\`불멸\`**, **\`레디언트\`** **티어**와 **닉네임** 보이게 **경쟁전 시작화면** or **순위표** 스크린샷 해주세요.\n\`[!] 모두 현재 시즌으로 올려주세요\`
                `,
                components: [],
              });
            }
          }
        } catch (e) {
          await response.editReply({
            content: '시간이 초과되었습니다.',
            components: [],
          });
        }
      }
    }
  },
};
