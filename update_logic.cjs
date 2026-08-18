
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// 1. Fix SPECIFIC_DAY background logic
const oldLogic = `              } else if (mode === "SPECIFIC_DAY") {
                if (specificText) {
                  bgClass = "bg-green-100";
                  content = specificText;
                } else if (isLastWeek) {
                  bgClass = "bg-green-100";
                  if (col === 3) { showMidText = true; midText = t.lastWeek; } // Center of week
                } else if (isThisWeek) {
                  bgClass = "bg-green-300";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\\\\nこんしゅう"; }
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

app = app.replace(oldLogic, newLogic);

// 2. Fix month tooltip colors
// Find all instances of month tooltips using bg-brown-dark text-cream and replace with pink styling
app = app.replace(/bg-brown-dark text-cream/g, "bg-pink-100 border border-pink-200 text-brown-dark");

fs.writeFileSync("src/App.tsx", app);

