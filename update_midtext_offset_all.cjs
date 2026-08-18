
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// Set default
app = app.replace(`let midTextOffset = "";`, `let midTextOffset = "translate-y-5 md:translate-y-6";`);

// Remove from isThisWeek
const oldThisWeek = `                } else if (isThisWeek) {
                  bgClass = "bg-green-300";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\\nこんしゅう"; midTextOffset = "translate-y-5 md:translate-y-6"; }
                }`;

const newThisWeek = `                } else if (isThisWeek) {
                  bgClass = "bg-green-300";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\\nこんしゅう"; }
                }`;

app = app.replace(oldThisWeek, newThisWeek);

fs.writeFileSync("src/App.tsx", app);

