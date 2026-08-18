
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

i18n = i18n.split(`nextWeek: "来週\nらいしゅう",`).join(`nextWeek: "来週\nらいしゅう",\n    thisWeek: "今週\nこんしゅう",`);
i18n = i18n.split(`nextWeek: "Next Week",`).join(`nextWeek: "Next Week",\n    thisWeek: "This Week",`);
i18n = i18n.split(`nextWeek: "下周 (Xià zhōu)",`).join(`nextWeek: "下周 (Xià zhōu)",\n    thisWeek: "本周 (Běn zhōu)",`);

fs.writeFileSync("src/i18n.ts", i18n);

