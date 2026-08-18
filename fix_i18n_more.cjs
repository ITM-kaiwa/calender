
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

i18n = i18n.split(`nextWeek: "来週\\nらいしゅう",
    thisWeek: "今週\\nこんしゅう",`).join(`nextWeek: "来週\\nらいしゅう",
    thisWeek: "今週\\nこんしゅう",
    thisMonth: "今月\\nこんげつ",
    thisYear: "今年\\nことし",`);

i18n = i18n.split(`nextWeek: "Next Week",
    thisWeek: "This Week",`).join(`nextWeek: "Next Week",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",`);

i18n = i18n.split(`nextWeek: "下周 (Xià zhōu)",
    thisWeek: "本周 (Běn zhōu)",`).join(`nextWeek: "下周 (Xià zhōu)",
    thisWeek: "本周 (Běn zhōu)",
    thisMonth: "本月 (Běn yuè)",
    thisYear: "今年 (Jīn nián)",`);

fs.writeFileSync("src/i18n.ts", i18n);

