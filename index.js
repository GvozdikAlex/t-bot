const TelegramApi = require("node-telegram-bot-api");
const { gameOptions } = require("./options");
const {
  token,
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
  await bot.sendMessage(idChat,'Hello world');
});
