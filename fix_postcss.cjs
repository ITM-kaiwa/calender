
const fs = require("fs");
let p = fs.readFileSync("postcss.config.js", "utf8");
p = p.replace("tailwindcss:", "\"@tailwindcss/postcss\":");
fs.writeFileSync("postcss.config.js", p);

