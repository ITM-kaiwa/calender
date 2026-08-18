
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");
app = app.replace(/\\`/g, "`");
app = app.replace(/\\\$/g, "$");
fs.writeFileSync("src/ClockApp.tsx", app);

