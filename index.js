const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options");
const token = "5819119074:AAGp4VAj3w7v_UlympzUmHPx00_hgbPq3As";
const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Lets get started" },
  { command: "/info", description: "your name is ....." },
  { command: "/get", description: "Do you wanna get sticker ???" },
  { command: "/check", description: "Are you following us ?" },
]);

bot.on("message", async (msg) => {
  const {
    text,
    chat: { id: idChat },
    from: { first_name: name },
  } = msg;
  console.log("msg FROM TELEGRAM:>> ", { text, idChat });

  if (text === "Request Time-Off") {
    await bot.sendMessage(idChat, "https://forms.gle/spPW4wrz5PGHK9xcA");
  }

  // bot.sendMessage(idChat, `You wrote me ${text}`)
  let pass = await bot.getChatMember("@ulbitvchat", idChat);
  if (text === "/check") {
    await bot.sendMessage(idChat, `PASS STATUS ${pass.status}`);
    console.log("MEMBER ? :>> ", pass);
  }
  if (text === "/start") {
    await bot.sendPhoto(idChat, "https://telegram.org/img/t_logo.png");
    // await bot.sendAudio(
    //   idChat,
    //   './test.mp3',
    //   { caption: "Sent by: " + name }
    // );
    // await bot.sendSticker(
    //   idChat,
    //   "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/4.webp"
    // );
    await bot.sendMessage(
      idChat,
      `Let's get started with this text -  ${text}`,
      gameOptions
    );
  }
  if (text === "/info") {
    await bot.sendMessage(idChat, `Hello Mr -  ${name}`);
    // await bot.close();
    // await bot.getMe();
  }
  if (text === "/get") {
    // await bot.getFile(
    //   idChat,
    //   "BQACAgIAAxkBAAEb8Q5jv-_bMLRShTqkdK34rLQltC-skAACSyEAApKbAAFKVtBI7MUGKEktBA"
    // );
    await bot.sendAnimation(
      idChat,
      "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/4.webp"
    );
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
  //   console.log(`You press on button ${data}`);
  await bot.sendMessage(id, `You press on button ${data}`);
});
