
const fs = require("fs");
let logic = fs.readFileSync("src/clock-logic.ts", "utf8");

logic = logic.replace(
  `export function getClockReading(hours: number, minutes: number, lang: "JP"|"EN"|"VN"|"CN", is12Hour: boolean): string {`,
  `export function getClockReading(hours: number, minutes: number, lang: "JP"|"EN"|"VN"|"CN", is12Hour: boolean, hideAmPm: boolean = false): string {`
);

logic = logic.replace(/if \\(is12Hour\\) \\{/g, `if (is12Hour && !hideAmPm) {`);
// But wait, the first `if (is12Hour)` is:
// if (is12Hour) {
//   displayHour = hours % 12;
//   if (displayHour === 0) displayHour = 12;
// }
// I don"t want to change that one!

fs.writeFileSync("src/clock-logic.ts", logic);
console.log("Done");

