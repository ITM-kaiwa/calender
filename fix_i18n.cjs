
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

i18n = i18n.split(`nextWeek: "来週\\nらいしゅう",`).join(`nextWeek: "来週\\nらいしゅう",
    thisWeek: "今週\\nこんしゅう",`);

fs.writeFileSync("src/i18n.ts", i18n);

