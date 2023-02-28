module.exports = {
  name: "colors",
  permissions: [],
  aliases: ['colours', 'wheel'],
  cooldown: 5000,
  category: 'fun',
  description: {
    usage: '.colors',
    content: "Spin a random wheel of colours",
    examples: ['.colours']
  },
  async execute(client, message, args, Discord, profileData) {
    try {
      const arrowUp = "⬆";
      const arrowDown = "⬇";

      const arrowRight = "➡";
      const arrowRightTop = "↗";
      const arrowRightBottom = "↘";

      const arrowLeft = "⬅";
      const arrowLeftTop = "↖";
      const arrowLeftBottom = "↙";

      var color1 = "🟥";
      var color2 = "🟦";
      var color3 = "🟩";
      var color4 = "🟨";

      const colors = [`${color1}`, `${color2}`, `${color3}`, `${color4}`];
      const endcolor =
        colors[Math.floor(Math.random() * colors.length)];

      message
        .reply({
          content: `
              🟨⬜🟥⬜🟦\n⬜⬛⬛⬛⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨
              `,
        })
        .then(async (msg) => {
          setTimeout(
            () =>
              msg.edit(
                `🟨⬜🟥⬜🟦\n⬜⬛${arrowUp}⬛⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
              ),
            1000
          );

          setTimeout(
            () =>
              msg.edit(
                `🟨⬜🟥⬜🟦\n⬜⬛⬛${arrowRightTop}⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
              ),
            2000
          );

          setTimeout(
            () =>
              msg.edit(
                `🟨⬜🟥⬜🟦\n⬜⬛⬛⬛⬜\n🟩⬛⬜${arrowRight}🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
              ),
            3000
          );

          setTimeout(
            () =>
              msg.edit(
                `🟨⬜🟥⬜🟦\n⬜⬛⬛⬛⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛${arrowRightBottom}⬜\n🟦⬜🟥⬜🟨`
              ),
            4000
          );

          setTimeout(
            () =>
              msg.edit(
                `🟨⬜🟥⬜🟦\n⬜⬛⬛⬛⬜\n🟩⬛⬜⬛🟩\n⬜⬛${arrowDown}⬛⬜\n🟦⬜🟥⬜🟨`
              ),
            5000
          );

          setTimeout(
            () =>
              msg.edit(
                `🟨⬜🟥⬜🟦\n⬜⬛⬛⬛⬜\n🟩⬛⬜⬛🟩\n⬜${arrowLeftBottom}⬛⬛⬜\n🟦⬜🟥⬜🟨`
              ),
            6000
          );

          setTimeout(
            () =>
              msg.edit(
                `🟨⬜🟥⬜🟦\n⬜⬛⬛⬛⬜\n🟩${arrowLeft}⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
              ),
            7000
          );

          setTimeout(
            () =>
              msg.edit(
                `🟨⬜🟥⬜🟦\n⬜${arrowLeftTop}⬛⬛⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
              ),
            8000
          );

          if (endcolor == color1) {
            setTimeout(
              () =>
                msg.edit(
                  `🟨⬜🟥⬜🟦\n⬜⬛${arrowUp}⬛⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
                ),
              9000
            );
          }

          if (endcolor == color2) {
            setTimeout(
              () =>
                msg.edit(
                  `🟨⬜🟥⬜🟦\n⬜⬛${arrowUp}⬛⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
                ),
              9000
            );

            setTimeout(
              () =>
                msg.edit(
                  `🟨⬜🟥⬜🟦\n⬜⬛⬛${arrowRightTop}⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
                ),
              10000
            );
          }

          if (endcolor == color3) {
            setTimeout(
              () =>
                msg.edit(
                  `🟨⬜🟥⬜🟦\n⬜⬛${arrowUp}⬛⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
                ),
              9000
            );

            setTimeout(
              () =>
                msg.edit(
                  `🟨⬜🟥⬜🟦\n⬜⬛⬛${arrowRightTop}⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
                ),
              10000
            );

            setTimeout(
              () =>
                msg.edit(
                  `🟨⬜🟥⬜🟦\n⬜⬛⬛⬛⬜\n🟩⬛⬜${arrowRight}🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
                ),
              11000
            );
          }

          if (endcolor == color4) {
            setTimeout(
              () =>
                msg.edit(
                  `🟨⬜🟥⬜🟦\n⬜⬛${arrowUp}⬛⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
                ),
              9000
            );

            setTimeout(
              () =>
                msg.edit(
                  `🟨⬜🟥⬜🟦\n⬜⬛⬛${arrowRightTop}⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
                ),
              10000
            );

            setTimeout(
              () =>
                msg.edit(
                  `🟨⬜🟥⬜🟦\n⬜⬛⬛⬛⬜\n🟩⬛⬜${arrowRight}🟩\n⬜⬛⬛⬛⬜\n🟦⬜🟥⬜🟨`
                ),
              11000
            );

            setTimeout(
              () =>
                msg.edit(
                  `🟨⬜🟥⬜🟦\n⬜⬛⬛⬛⬜\n🟩⬛⬜⬛🟩\n⬜⬛⬛${arrowRightBottom}⬜\n🟦⬜🟥⬜🟨`
                ),
              12000
            );
          }

          setTimeout(
            () =>
              message.reply(`The arrow landed on ${endcolor}`), 13000
          );

        });

    } catch (err) {
      console.log(err);
    }
  },
};

