
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// Use t.clockApp and t.numbersApp instead of hardcoded strings
app = app.replace(
  />\s*時計学習アプリ\s*<\/button>/,
  `>{(t as any).clockApp || "時計学習アプリ"}</button>`
);

app = app.replace(
  />\s*数字練習アプリ\s*<\/a>/,
  `>{(t as any).numbersApp || "数字練習アプリ"}</a>`
);

fs.writeFileSync("src/App.tsx", app);
console.log(app.includes("t.clockApp") ? "SUCCESS" : "FAILED");

