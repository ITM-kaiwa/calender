
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

i18n = i18n.replace(
  `"\\"Nâng Cao\\"… Cho phép cài đặt ngôn ngữ học tập, thiết lập ngày bắt đầu của lịch, và truy cập Ứng dụng Học Xem Giờ.",`,
  `"\\"Nâng Cao\\"… Cho phép cài đặt ngôn ngữ, thiết lập ngày bắt đầu, và truy cập Ứng dụng Đồng Hồ / Số.",`
);

i18n = i18n.replace(
  `"\\"Advanced\\"… 学習言語や週の始まりの設定、および時間練習用の時計アプリへアクセスできます。",`,
  `"\\"Advanced\\"… 学習言語や週の始まりの設定、および時計・数字練習アプリへアクセスできます。",`
);

i18n = i18n.replace(
  `"\\"Advanced\\"… Set the learning language, the start day of the week, and access the Clock Learning App.",`,
  `"\\"Advanced\\"… Set the language, start day, and access Clock/Numbers apps.",`
);

i18n = i18n.replace(
  `"\\"Advanced\\"… 允许设置学习语言、一周的开始日期，以及访问时间练习时钟应用。",`,
  `"\\"Advanced\\"… 允许设置学习语言、一周的开始日期，以及访问时钟和数字练习应用。",`
);

fs.writeFileSync("src/i18n.ts", i18n);
console.log("Done");

