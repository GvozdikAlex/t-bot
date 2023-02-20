require("dotenv").config();
const schedule = require("node-schedule");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const token = process.env.TOKEN;

const doc = new GoogleSpreadsheet(process.env.SPREAD_SHEET_ID);

// const arrayOfMonths = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

async function getArrayOfStaff() {
  await doc.useServiceAccountAuth({
    client_email: process.env.EMAIL,
    private_key: process.env.PRIVATE_KEY,
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  const rows = await sheet.getRows();
  const arrayOfStaff = rows.map((obj) => {
    const [
      timestamp,
      fullName,
      emailAddress,
      type,
      startDate,
      endDate,
      comment,
      fullNameAgain,
      telegramUserTag,
      birthday,
      holiday,
    ] = obj["_sheet"]["headerValues"];
    const [
      timestampData,
      fullNameData,
      emailAddressData,
      typeData,
      startDateData,
      endDateData,
      commentData,
      fullNameAgainData,
      telegramUserTagData,
      birthdayData,
      holidayData,
    ] = obj._rawData;
    return {
      timestamp: timestampData,
      fullName: fullNameData,
      emailAddress: emailAddressData,
      type: typeData,
      startDate: startDateData,
      endDate: endDateData,
      comment: commentData,
      fullNameAgain: fullNameAgainData,
      telegramUserTag: telegramUserTagData,
      birthday: birthdayData,
      holiday: holidayData,
    };
  });

  return arrayOfStaff;
}

// function sendEveryDayMessage(bot, idChat, timestamp, arrOfStaff) {
//   const { hours, dayOfWeek, dateFunction, yearFunction, monthOfYear } =
//     getTime(timestamp);
//   console.log("ALEX");
//   const timeUkraine = +hours + 2;
//   const fixedDay = +dayOfWeek;
//   const currentDate = `${+dateFunction}/${+monthOfYear + 1}/${+yearFunction}`;
//   const checkHolidayDate = `${+dateFunction + 1}/${
//     +monthOfYear + 1
//   }/${+yearFunction}`;
//   const resultBirthdaysArray = [];
//   const resultHolidaysArray = [];
//   const res = arrOfStaff.forEach((obj) => {
//     const [bDay, bMonth, bYear] = obj.birthday.split("/");
//     const [hDay, hMonth, hYear] = obj.holiday.split("/");
//     const birthdayStr = `${+bDay}/${+bMonth}/${+bYear}`;
//     const holidayStr = `${+hDay}/${+hMonth}/${+hYear}`;
//     if (birthdayStr === currentDate) {
//       resultBirthdaysArray.push(obj);
//     } else if (holidayStr === checkHolidayDate) {
//       resultHolidaysArray.push(obj);
//     }
//   });
//   if (resultBirthdaysArray.length || resultHolidaysArray.length) {
//     const strPeople = resultBirthdaysArray.reduce((acc, obj) => {
//       return (acc += `${obj.fullName} `);
//     }, "");
//     const strHolidays = resultHolidaysArray.reduce((acc, obj) => {
//       return (acc += `${obj.fullName} `);
//     }, "");
//     if (timeUkraine <= 9) {
//       job = schedule.scheduleJob(
//         { hour: 9, minute: 00, day: fixedDay },
//         function () {
//           bot.sendMessage(
//             idChat,
//             `${
//               resultBirthdaysArray.length
//                 ? `${
//                     resultBirthdaysArray.length > 1
//                       ? `Today ${strPeople}  celebrate their Birthdays! Congratulations!`
//                       : `Today ${strPeople}  celebrates the Birthdays! Congratulations!`
//                   }`
//                 : ""
//             } ${
//               resultHolidaysArray.length
//                 ? `${
//                     resultHolidaysArray.length > 1
//                       ? `ALSO We will have  ${strHolidays} tomorrow, thus we all are off!
// (If you agree with the client to work, inform your Account Manager right away)`
//                       : `ALSO It's ${strHolidays} tomorrow, thus we all are off!
// (If you agree with the client to work, inform your Account Manager right away)`
//                   }`
//                 : ""
//             }`
//           );
//         }
//       );
//     } else {
//       job = schedule.scheduleJob(
//         { hour: 9, minute: 00, day: fixedDay + 1 },
//         function () {
//           bot.sendMessage(
//             idChat,
//             `${
//               resultBirthdaysArray.length
//                 ? `${
//                     resultBirthdaysArray.length > 1
//                       ? `Today ${strPeople}  celebrate their Birthdays! Congratulations!`
//                       : `Today ${strPeople}  celebrates the Birthdays! Congratulations!`
//                   }`
//                 : ""
//             } ${
//               resultHolidaysArray.length
//                 ? `${
//                     resultHolidaysArray.length > 1
//                       ? `ALSO We will have  ${strHolidays} tomorrow, thus we all are off!
// (If you agree with the client to work, inform your Account Manager right away)`
//                       : `ALSO It's ${strHolidays} tomorrow, thus we all are off!
// (If you agree with the client to work, inform your Account Manager right away)`
//                   }`
//                 : ""
//             }`
//           );
//         }
//       );
//     }
//   }
// }

// function getTime(timestamp) {
//   let dateObj = new Date(timestamp * 1000);

//   let monthOfYear = dateObj.getUTCMonth().toString().padStart(2, 0);
//   let dayOfWeek = dateObj.getUTCDay().toString().padStart(2, 0);
//   let yearFunction = dateObj.getUTCFullYear().toString().padStart(2, 0);
//   let dateFunction = dateObj.getUTCDate().toString().padStart(2, 0);
//   let hours = dateObj.getUTCHours().toString().padStart(2, 0);
//   let minutes = dateObj.getUTCMinutes().toString().padStart(2, 0);
//   let seconds = dateObj.getUTCSeconds().toString().padStart(2, 0);

//   return {
//     hours,
//     minutes,
//     seconds,
//     dayOfWeek,
//     dateFunction,
//     yearFunction,
//     monthOfYear,
//   };
// }

// function sendVacationOrSickLeaveDays(arr, userTag) {
//   let resVacation = 0;
//   let resSickLeave = 0;
//   const informationObj = arr
//     .reduce(
//       (acc, obj) => (obj.telegramUserTag === userTag ? [...acc, obj] : acc),
//       []
//     )
//     .reduce((acc, obj) => {
//       const startDay = +obj.startDate.split("/")[0];
//       const startMonth = +obj.startDate.split("/")[1];
//       const startYear = +obj.startDate.split("/")[2];
//       const endDay = +obj.endDate.split("/")[0];
//       const endMonth = +obj.endDate.split("/")[1];
//       const endYear = +obj.endDate.split("/")[2];

//       let birthday = obj.birthday;

//       if (obj.type === "Vacation") {
//         if (endMonth === startMonth) {
//           resVacation += endDay - startDay;
//           acc += resVacation;
//         } else {
//           if (startDay === 31) {
//             resVacation = endDay + 1;
//             acc += resVacation;
//           } else {
//             resVacation += 31 - startDay;
//             acc += resVacation;
//           }
//         }
//       } else if (obj.type === "Sick Leave") {
//         if (endMonth === startMonth) {
//           resSickLeave += endDay - startDay;
//           acc += resSickLeave;
//         } else {
//           if (startDay === 31) {
//             resSickLeave += endDay + 1;
//             acc += resSickLeave;
//           } else {
//             resSickLeave += 31 - startDay;
//             acc += resSickLeave;
//           }
//         }
//       }
//       return acc;
//     }, 0);
//   return { informationObj, resVacation, resSickLeave };
// }

// function checkLeapYear(year) {
//   if (year % 4 === 0) {
//     if (year % 100 === 0) {
//       if (year % 400 === 0) {
//         return 29;
//       } else {
//         return 28;
//       }
//     } else {
//       return 29;
//     }
//   } else {
//     return 28;
//   }
// }

// async function sendReportWorkingDays(bot, idChat, timestamp) {
//   const { dateFunction, yearFunction, monthOfYear } = getTime(timestamp);
//   if (+dateFunction === 1) {
//     await bot.sendMessage(
//       idChat,
//       `Dear developers, please report your working hours for ${
//         +monthOfYear === 0 ? arrayOfMonths[11] : arrayOfMonths[+monthOfYear - 1]
//       } to your Account Manager.Thank you!`
//     );
//   }
//   const isLeap = checkLeapYear(yearFunction) === 29;
//   if (isLeap && +monthOfYear === 1) {
//     if (+dateFunction === 29) {
//       await bot.sendMessage(
//         idChat,
//         `Dear developers, please report your working hours for ${
//           arrayOfMonths[+monthOfYear]
//         }  at the end of the day to your Account Manager.Thank you!`
//       );
//     }
//   } else if (
//     +monthOfYear === 0 ||
//     +monthOfYear === 2 ||
//     +monthOfYear === 4 ||
//     +monthOfYear === 6 ||
//     +monthOfYear === 7 ||
//     +monthOfYear === 9 ||
//     +monthOfYear === 11
//   ) {
//     if (+dateFunction === 31) {
//       await bot.sendMessage(
//         idChat,
//         `Dear developers, please report your working hours for ${
//           arrayOfMonths[+monthOfYear]
//         }  at the end of the day to your Account Manager.Thank you!`
//       );
//     }
//   } else if (
//     +monthOfYear === 3 ||
//     +monthOfYear === 5 ||
//     +monthOfYear === 8 ||
//     +monthOfYear === 10
//   ) {
//     if (+dateFunction === 30) {
//       await bot.sendMessage(
//         idChat,
//         `Dear developers, please report your working hours for ${
//           arrayOfMonths[+monthOfYear]
//         }  at the end of the day to your Account Manager.Thank you!`
//       );
//     }
//   }
// }

module.exports = {
  token,
  getArrayOfStaff,
};
