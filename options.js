module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
      keyboard: [
        [
          {
            text: "Request Time-Off",
            callback_data: "1",
          },
          { text: "Time-Off Balance", callback_data: "2" },
          { text: "Report / Request Hardware", callback_data: "3" },
        ],
        [
          { text: "Vacation Policy", callback_data: "4" },
          { text: "Find Contact", callback_data: "5" },
          { text: "Health Insurance Info", callback_data: "6" },
        ],
      ],
    }),
  },

  againOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text: "Играть еще раз", callback_data: "/again" }]],
    }),
  },
};
