
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

i18n = i18n.replace(/lastWeek: "先週\\nせんしゅう",\\r?\\n\\s*nextWeek: "来週\\nらいしゅう",/g, `lastWeek: "先週\\nせんしゅう",\\n    nextWeek: "来週\\nらいしゅう",\\n    thisWeek: "今週\\nこんしゅう",`);
i18n = i18n.replace(/lastWeek: "Last Week",\\r?\\n\\s*nextWeek: "Next Week",/g, `lastWeek: "Last Week",\\n    nextWeek: "Next Week",\\n    thisWeek: "This Week",`);
i18n = i18n.replace(/lastWeek: "上周 \\(Shàng zhōu\\)",\\r?\\n\\s*nextWeek: "下周 \\(Xià zhōu\\)",/g, `lastWeek: "上周 (Shàng zhōu)",\\n    nextWeek: "下周 (Xià zhōu)",\\n    thisWeek: "本周 (Běn zhōu)",`);

fs.writeFileSync("src/i18n.ts", i18n);

