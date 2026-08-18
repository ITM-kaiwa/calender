
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");
app = app.replace(`midTextOffset = "translate-y-4";`, `midTextOffset = "translate-y-5 md:translate-y-6";`);
fs.writeFileSync("src/App.tsx", app);

