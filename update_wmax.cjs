
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// Add w-max to all 4 tooltips
app = app.replace(
  /absolute -top-10 left-0 bg-brown text-cream text-\[10px\] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20/g,
  "absolute -top-10 left-0 bg-brown text-cream text-[10px] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max"
);
app = app.replace(
  /absolute -top-10 right-0 bg-brown text-cream text-\[10px\] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20/g,
  "absolute -top-10 right-0 bg-brown text-cream text-[10px] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max"
);
app = app.replace(
  /absolute -top-10 left-1\/2 -translate-x-1\/2 bg-brown-dark text-cream text-\[10px\] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20/g,
  "absolute -top-10 left-1/2 -translate-x-1/2 bg-brown-dark text-cream text-[10px] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max"
);

fs.writeFileSync("src/App.tsx", app);

