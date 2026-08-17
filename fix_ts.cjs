
const fs = require("fs");

// Fix App.tsx
let appContent = fs.readFileSync("src/App.tsx", "utf8");
appContent = appContent.replace(
  "import { translations, Language } from \"./i18n\";",
  "import { translations } from \"./i18n\";\nimport type { Language } from \"./i18n\";"
);
appContent = appContent.replace(
  "const todayIdx = (year === todayDate.getFullYear() && month === todayDate.getMonth()) \n    ? firstDayIndex + todayDate.getDate() - 1 : -1;",
  ""
);
fs.writeFileSync("src/App.tsx", appContent);

// Fix i18n.ts
let i18nContent = fs.readFileSync("src/i18n.ts", "utf8");
i18nContent = i18nContent.replace("const numToZh = (n) => {", "const numToZh = (n: number) => {");
i18nContent = i18nContent.replace("const getPy = (n) => {", "const getPy = (n: number) => {");
fs.writeFileSync("src/i18n.ts", i18nContent);

