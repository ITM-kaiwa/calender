
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const target = "<span className={`font-bold text-sm md:text-base ${isSat ? \"text-blue-600\" : isSun ? \"text-red-600\" : \"text-brown-dark\"}`}>";
const replacement = "<span className={`font-bold text-sm md:text-base transition-opacity ${isSat ? \"text-blue-600\" : isSun ? \"text-red-600\" : \"text-brown-dark\"} ${content ? \"opacity-20\" : \"\"}`}>";

app = app.split(target).join(replacement);

fs.writeFileSync("src/App.tsx", app);

