const { Events, ChannelType, PermissionsBitField } = require('discord.js');
const { showModalBuilder, ShowSelectMenuBuilder } = require('../Module/myShow');
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
  once: false,
  async execute(interaction) {
    if (interaction.user.bot) return;
    if (interaction.channel.type == ChannelType.DM) return;

    /**Channels */
    const logChannel =
      interaction.client.channels.cache.get('848872116102889492');

    /**Slash Commands Input */
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `${interaction.commandName}는 등록되지 않은 명령어 입니다.`
        );
        return;
      }

      await command.execute(interaction);
    }

    /**Button Events */
    if (interaction.isButton()) {
      if (interaction.customId == 'show') {
        await interaction.showModal(showModalBuilder());
      }
    }

    /**Modal Events */
    if (interaction.isModalSubmit()) {
      if (interaction.customId == 'show') {
        /**Age Input Value */
        let age = interaction.fields.getTextInputValue('age');
        var regex = /[^0-9]/g;
        age = age.replace(regex, '');
        try {
          const ageParse = parseInt(age.match(/\d+/g)[0]);
          if (ageParse < 15) {
            await interaction.reply({
              content:
                '죄송합니다. 저희 서버는 **`15`**세 이상만 받고있습니다.',
              ephemeral: true,
            });
            return;
          }
        } catch (e) {
          await interaction.reply({
            content: `**숫자**만 입력하여주세요.\n> \`입력값\` : ${age}`,
            ephemeral: true,
          });
          return;
        }

        /**Gender Input Value */
        const gender = interaction.fields.getTextInputValue('gender');
        if (gender != '남자' && gender != '여자') {
          await interaction.reply({
            content: '죄송합니다. **`남자`**, **`여자`**중에서 입력하여주세요.',
            ephemeral: true,
          });
          return;
        }

        /**Tier Select Menu */
        const response = await interaction.reply({
          content: '자신의 현재 티어를 선택하여주세요.',
          components: [ShowSelectMenuBuilder()],
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
              confirmation.values[0] == '896387175610998835' ||
              confirmation.values[0] == '896386994635157564'
            ) {
              await interaction.member.roles.add([ageRole, genderRole]);
              const channel = await TicketBuild(
                interaction.client,
                interaction.guild,
                interaction.user,
                'roles'
              );

              await interaction.editReply({
                content: `${channel} **채널**로 가셔서 **자신**의 **티어**를 증명하세요.\n자신의 **티어**와 **닉네임** 보이게 **경쟁전 시작화면** or **순위표** 스크린샷 해주세요.\n\`[!] 모두 현재 시즌으로 올려주세요\`
                `,
                components: [],
              });
            }
          }

          return;
        } catch (e) {
          if (e.code == 'InteractionCollectorError') {
            await interaction.editReply({
              content: '시간이 초과되었습니다.',
              components: [],
            });
          } else console.log(e);
        }
      }
    }
  },
};
