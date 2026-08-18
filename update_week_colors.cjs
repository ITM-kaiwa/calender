
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const oldRender = `} else if (isLastWeek) {
                  bgClass = "bg-green-300/80";
                  if (col === 3) { showMidText = true; midText = t.lastWeek; } // Center of week
                } else if (isThisWeek) {
                  bgClass = "bg-green-200/80";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\\nこんしゅう"; }
                } else if (isNextWeek) {
                  bgClass = "bg-green-200/60";`;

const newRender = `} else if (isLastWeek) {
                  bgClass = "bg-green-100";
                  if (col === 3) { showMidText = true; midText = t.lastWeek; } // Center of week
                } else if (isThisWeek) {
                  bgClass = "bg-green-300";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\\nこんしゅう"; }
                } else if (isNextWeek) {
                  bgClass = "bg-blue-100";`;

app = app.replace(oldRender, newRender);

fs.writeFileSync("src/App.tsx", app);

