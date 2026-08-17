
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

app = app.replace(
  /<span className={\`font-bold text-sm md:text-base \\\${isSat \? "text-blue-600" : isSun \? "text-red-600" : "text-brown-dark"}\`}>\n\s*{date}\n\s*<\/span>/,
  "<span className={`font-bold text-sm md:text-base transition-opacity ${isSat ? \"text-blue-600\" : isSun ? \"text-red-600\" : \"text-brown-dark\"} ${content ? \"opacity-20\" : \"\"}`}>\n                    {date}\n                  </span>"
);

// also add z-10 to the content absolute div to ensure it is above the number
app = app.replace(
  /<div className="absolute inset-0 flex items-center justify-center p-1">/g,
  "<div className=\"absolute inset-0 flex items-center justify-center p-1 z-10 pointer-events-none\">"
);

fs.writeFileSync("src/App.tsx", app);

