
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");
app = app.replace("2000);", "3500);");
fs.writeFileSync("src/ClockApp.tsx", app);

