
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

i18n = i18n.replace(/nextWeek:\s*"来週\\r?\\nらいしゅう",/g, `nextWeek: "来週\\nらいしゅう",\n    thisWeek: "今週\\nこんしゅう",`);

fs.writeFileSync("src/i18n.ts", i18n);

