
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

const jpDateReadings = i18n.match(/dateReadings:\s*\[[\s\S]*?\],/)[0];
// replace VN dateReadings
i18n = i18n.replace(/dateReadings: Array.from\(\{length: 31\}, \(_, i\) => \`Ngày \$\{i \+ 1\}\`\),/, jpDateReadings);

fs.writeFileSync("src/i18n.ts", i18n);

