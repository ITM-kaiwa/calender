
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");
app = app.replace(/\\n\\n  /g, "\n\n  ");
fs.writeFileSync("src/ClockApp.tsx", app);

