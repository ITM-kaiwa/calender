
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");

app = app.replace(`stroke="#111827" strokeWidth="1.5" strokeLinecap="round"`, `stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"`);

fs.writeFileSync("src/ClockApp.tsx", app);
console.log("Done");

