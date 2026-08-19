
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

i18n = i18n.replace(`timeAttack: "Thử thách thời gian",`, `timeAttack: "Thử thách thời gian",\n    interval: "Thời gian chờ",`);
i18n = i18n.replace(`timeAttack: "タイムアタック",`, `timeAttack: "タイムアタック",\n    interval: "待機秒数",`);
i18n = i18n.replace(`timeAttack: "Time Attack",`, `timeAttack: "Time Attack",\n    interval: "Interval",`);
i18n = i18n.replace(`timeAttack: "时间挑战 (Shíjiān tiǎozhàn)",`, `timeAttack: "时间挑战 (Shíjiān tiǎozhàn)",\n    interval: "等待秒数",`);

fs.writeFileSync("src/i18n.ts", i18n);
console.log("Done");

