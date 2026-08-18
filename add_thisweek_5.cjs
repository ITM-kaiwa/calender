
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

let parts = i18n.split("nextWeek: \"来週\\nらいしゅう\",");
if (parts.length > 1) {
  i18n = parts.join("nextWeek: \"来週\\nらいしゅう\",\\n    thisWeek: \"今週\\nこんしゅう\",");
}

fs.writeFileSync("src/i18n.ts", i18n);

