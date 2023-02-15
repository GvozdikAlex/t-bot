module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
      keyboard: [
        [
          {
            text: "Request Time-Off",
          },
          { text: "Time-Off Balance" },
          { text: "Report / Request Hardware" },
        ],
        [
          { text: "Vacation Policy" },
          { text: "Find Contact" },
          { text: "Health Insurance Info" },
        ],
        [
          { text: "Leave Anonymous Feedback" },
        ],
      ]
    }),
  }
};