const TelegramApi = require("node-telegram-bot-api");
const { gameOptions } = require("./options");
const {
  token,
  getTime,
  sendVacationOrSickLeaveDays,
  getArrayOfStaff,
  sendEveryDayMessage,
  sendReportWorkingDays,
} = require("./helper");

const bot = new TelegramApi(token, {
  polling: {
    interval: 300,
    autoStart: true,
    params: { timeout: 10 },
  },
});

bot.setMyCommands([{ command: "/start", description: "Let's get started" }]);

bot.on("message", async (msg) => {
  const {
    date,
    text,
    chat: { id: idChat },
    from: { first_name: name, username: userTag },
  } = msg;
  const { yearFunction } = getTime(date);
  const arrayOfStaff = await getArrayOfStaff();
  switch (text) {
    case "Leave Anonymous Feedback":
      await bot.sendMessage(idChat, "FEEDBACK");
      break;
    case "Request Time-Off":
      await bot.sendMessage(
        idChat,
        "[PRESS HERE](https://forms.gle/spPW4wrz5PGHK9xcA)",
        { parse_mode: "Markdown" }
      );
      break;
    case "Time-Off Balance":
      const { resVacation, resSickLeave } = sendVacationOrSickLeaveDays(
        arrayOfStaff,
        userTag
      );
      await bot.sendMessage(
        idChat,
        `*You still have ${31 - resVacation} days of vacation and ${
          31 - resSickLeave
        } days of sick leave to use by the end of this year ${yearFunction} *`,
        { parse_mode: "Markdown" }
      );
      break;
    case "Report / Request Hardware":
      await bot.sendMessage(
        idChat,
        "https://docs.google.com/forms/d/e/1FAIpQLSfuIzUzkzzWvwd4IPkC8PSMVlX0c582D3kD6p3lR_iKrW_3FQ/viewform"
      );
      break;
    case "Vacation Policy":
      await bot.sendMessage(
        idChat,
        "https://drive.google.com/file/d/1vFmtAodiOFzu7GO-a-HBLqe778O08DeI/view?usp=share_link"
      );
      break;
    case "Find Contact":
      await bot.sendMessage(
        idChat,
        "https://drive.google.com/file/d/1E467YasZzhSuvaXR26-t1vwlF1Yx8ZA7/view?usp=share_link"
      );
      break;
    case "Health Insurance Info":
      await bot.sendMessage(
        idChat,
        "https://drive.google.com/file/d/1LQom3Geayvt9BYH6wXMFCmk3PMstlCW8/view?usp=sharing"
      );
      break;
    case "/start":
      await bot.sendMessage(
        idChat,
        `Welcome ${name} and let's get started !`,
        gameOptions
      );
      await sendReportWorkingDays(bot, idChat, date);
      sendEveryDayMessage(bot, idChat, date, arrayOfStaff);
      break;
    default:
      await bot.sendMessage(idChat, `Hello Mr -  ${name}`);
      break;
  }
});

bot.on("callback_query", async (btn_msg) => {
  const {
    data,
    message: {
      chat: { id },
    },
  } = btn_msg;
  console.log("btn_msg AFTER PRESS BUTTON", btn_msg);
  await bot.sendMessage(id, `You press on button ${data}`);
});
