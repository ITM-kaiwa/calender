
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

// Add translations
i18n = i18n.replace(`randomDates: "Ngày ngẫu nhiên",`, `randomDates: "Ngày ngẫu nhiên",\n    clockApp: "Ứng dụng Đồng Hồ",\n    numbersApp: "Ứng dụng Số",`);
i18n = i18n.replace(`randomDates: "ランダム日付練習",`, `randomDates: "ランダム日付練習",\n    clockApp: "時計学習アプリ",\n    numbersApp: "数字練習アプリ",`);
i18n = i18n.replace(`randomDates: "Random Dates",`, `randomDates: "Random Dates",\n    clockApp: "Clock App",\n    numbersApp: "Numbers App",`);
i18n = i18n.replace(`randomDates: "随机日期",`, `randomDates: "随机日期",\n    clockApp: "时钟学习应用",\n    numbersApp: "数字练习应用",`);

fs.writeFileSync("src/i18n.ts", i18n);
console.log(i18n.includes("Ứng dụng Đồng Hồ") ? "SUCCESS" : "FAILED");

