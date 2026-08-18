
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const oldLogic = `              } else if (mode === "SPECIFIC_DAY") {
                if (specificText) {
                  bgClass = "bg-green-100";
                  content = specificText;
                } else if (isLastWeek) {
                  bgClass = "bg-green-100";
                  if (col === 3) { showMidText = true; midText = t.lastWeek; } // Center of week
                } else if (isThisWeek) {
                  bgClass = "bg-green-300";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\\nこんしゅう"; }
                } else if (isNextWeek) {
                  bgClass = "bg-blue-100";
                  if (col === 3) { showMidText = true; midText = t.nextWeek; } // Center of week
                }
              }`;

const newLogic = `              } else if (mode === "SPECIFIC_DAY") {
                if (isLastWeek) {
                  bgClass = "bg-green-100";
                  if (col === 3) { showMidText = true; midText = t.lastWeek; }
                } else if (isThisWeek) {
                  bgClass = "bg-green-300";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\\nこんしゅう"; }
                } else if (isNextWeek) {
                  bgClass = "bg-blue-100";
                  if (col === 3) { showMidText = true; midText = t.nextWeek; }
                } else if (specificText) {
                  bgClass = "bg-green-100";
                }

                if (specificText) {
                  content = specificText;
                }
              }`;

if (app.includes(oldLogic)) {
  app = app.replace(oldLogic, newLogic);
  fs.writeFileSync("src/App.tsx", app);
  console.log("Success");
} else {
  console.log("Could not find block");
}

