
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");
app = app.replace(/midTextOffset = "translate-y-1";/, `midTextOffset = "translate-y-3";`);
fs.writeFileSync("src/App.tsx", app);

