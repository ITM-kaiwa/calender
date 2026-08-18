
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");
app = app.replace("}, [isRandoming]);", "}, [isRandoming, randomInterval]);");
fs.writeFileSync("src/ClockApp.tsx", app);

