
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");

app = app.replace(`<svg viewBox="0 0 100 100" className="w-full h-full p-2">`, `<svg viewBox="0 0 100 100" className="w-full h-full">`);
app = app.replace(`x1="50" y1="5" x2="50" y2="10"`, `x1="50" y1="0" x2="50" y2="6"`);
app = app.replace(`x1="50" y1="5" x2="50" y2="15"`, `x1="50" y1="0" x2="50" y2="12"`);

fs.writeFileSync("src/ClockApp.tsx", app);
console.log("Done");

