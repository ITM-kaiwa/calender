
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");
app = app.split('(lang === "JP" ? \`\${month + 1}月 \` : \`\`) + t.dateReadings[date! - 1]').join('t.dateReadings[date! - 1]');
fs.writeFileSync("src/App.tsx", app);

