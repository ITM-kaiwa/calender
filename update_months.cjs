
const fs = require("fs");

let i18n = fs.readFileSync("src/i18n.ts", "utf8");

i18n = i18n.replace(
  /month: "Tháng",/g,
  "month: \"Tháng\",\n    monthNames: [\"Tháng 1\", \"Tháng 2\", \"Tháng 3\", \"Tháng 4\", \"Tháng 5\", \"Tháng 6\", \"Tháng 7\", \"Tháng 8\", \"Tháng 9\", \"Tháng 10\", \"Tháng 11\", \"Tháng 12\"],"
);

i18n = i18n.replace(
  /month: "月",/g,
  "month: \"月\",\n    monthNames: [\"1月\", \"2月\", \"3月\", \"4月\", \"5月\", \"6月\", \"7月\", \"8月\", \"9月\", \"10月\", \"11月\", \"12月\"],"
);

i18n = i18n.replace(
  /month: "Month",/g,
  "month: \"Month\",\n    monthNames: [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"],"
);

fs.writeFileSync("src/i18n.ts", i18n);

let app = fs.readFileSync("src/App.tsx", "utf8");
app = app.replace(
  "<span className=\"text-xl font-bold w-16 text-center\">{month + 1}{lang === \"EN\" ? \"\" : t.month}</span>",
  "<span className=\"text-xl font-bold w-auto px-2 text-center\">{lang === \"EN\" ? t.monthNames[month] : `${month + 1}${t.month}`}</span>"
);
fs.writeFileSync("src/App.tsx", app);

