
const fs = require("fs");
let logic = fs.readFileSync("src/clock-logic.ts", "utf8");

logic = logic.replace(/if \\(is12Hour\\) \\{/g, "if (is12Hour && !hideAmPm) {");

// Restore first if(is12Hour)
logic = logic.replace(
  `  if (is12Hour && !hideAmPm) {
    displayHour = hours % 12;
    if (displayHour === 0) displayHour = 12;
  }`,
  `  if (is12Hour) {
    displayHour = hours % 12;
    if (displayHour === 0) displayHour = 12;
  }`
);

fs.writeFileSync("src/clock-logic.ts", logic);
console.log("Done");

