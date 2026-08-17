
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// Change cell height
app = app.replace(
  /h-16 md:h-20/g,
  "h-12 md:h-14"
);

fs.writeFileSync("src/App.tsx", app);

