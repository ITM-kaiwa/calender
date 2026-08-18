
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

i18n = i18n.split(`thisYear: "今年\\nことし",\n    thisWeek: "今週\\nこんしゅう",`).join(`thisYear: "今年\\nことし",`);

fs.writeFileSync("src/i18n.ts", i18n);

