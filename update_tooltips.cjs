
const fs = require("fs");

// 1. Update i18n.ts
let i18n = fs.readFileSync("src/i18n.ts", "utf8");
i18n = i18n.replace(/lastMonth: "先月",/, "lastMonth: \"先月\\nせんげつ\",");
i18n = i18n.replace(/nextMonth: "来月",/, "nextMonth: \"来月\\nらいげつ\",");
i18n = i18n.replace(/lastYear: "去年",/, "lastYear: \"去年\\nきょねん\",");
i18n = i18n.replace(/nextYear: "来年",/, "nextYear: \"来年\\nらいねん\",");
fs.writeFileSync("src/i18n.ts", i18n);

// 2. Update App.tsx
let app = fs.readFileSync("src/App.tsx", "utf8");

// We have tooltips that look like this:
// <span className="absolute -top-8 left-0 bg-brown text-cream text-xs p-1 rounded whitespace-nowrap">{t.lastYear}</span>
// <span className="absolute -top-8 right-0 bg-brown text-cream text-xs p-1 rounded whitespace-nowrap">{t.nextYear}</span>
// <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brown-dark text-cream text-xs p-1 rounded whitespace-nowrap">{t.lastMonth}</span>
// <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brown-dark text-cream text-xs p-1 rounded whitespace-nowrap">{t.nextMonth}</span>

app = app.replace(
  /absolute -top-8 left-0 bg-brown text-cream text-xs p-1 rounded whitespace-nowrap/g,
  "absolute -top-10 left-0 bg-brown text-cream text-[10px] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20"
);
app = app.replace(
  /absolute -top-8 right-0 bg-brown text-cream text-xs p-1 rounded whitespace-nowrap/g,
  "absolute -top-10 right-0 bg-brown text-cream text-[10px] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20"
);
app = app.replace(
  /absolute -top-8 left-1\/2 -translate-x-1\/2 bg-brown-dark text-cream text-xs p-1 rounded whitespace-nowrap/g,
  "absolute -top-10 left-1/2 -translate-x-1/2 bg-brown-dark text-cream text-[10px] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20"
);

fs.writeFileSync("src/App.tsx", app);

