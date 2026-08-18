
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// Remove specific day styling for buttons
app = app.replace(/className={\`px-2 py-1 bg-brown\\/10 rounded hover:bg-brown\\/20 active:translate-y-0.5 active:shadow-none shadow-\\[0_2px_0_0_rgba\\(0,0,0,0.15\\)\\] transition-all group (relative )?\\$\\{mode === "SPECIFIC_DAY" \\? "bg-pink-100 text-brown-dark border border-pink-200" : ""\\}\`}/g, "className={`px-2 py-1 bg-brown/10 rounded hover:bg-brown/20 active:translate-y-0.5 active:shadow-none shadow-[0_2px_0_0_rgba(0,0,0,0.15)] transition-all group ${$1 || \"\"}`}");

app = app.replace(/className={\`px-3 py-1 bg-brown\\/10 rounded hover:bg-brown\\/20 active:translate-y-0.5 active:shadow-none shadow-\\[0_2px_0_0_rgba\\(0,0,0,0.15\\)\\] transition-all relative \\$\\{mode === "SPECIFIC_DAY" \\? "bg-brown-dark text-cream" : ""\\}\`}/g, "className={`px-3 py-1 bg-brown/10 rounded hover:bg-brown/20 active:translate-y-0.5 active:shadow-none shadow-[0_2px_0_0_rgba(0,0,0,0.15)] transition-all relative`}");

// Fix month thisMonth display
const oldMonth = `<span className="text-xl font-bold w-auto px-2 text-center">{lang === "EN" ? t.monthNames[month] : \`\${month + 1}\${t.month}\`}</span>`;
const newMonth = `<div className="relative flex flex-col items-center justify-center w-24">
              <span className="text-xl font-bold w-auto px-2 text-center leading-none mt-1">{lang === "EN" ? t.monthNames[month] : \`\${month + 1}\${t.month}\`}</span>
              {mode === "SPECIFIC_DAY" && <span className="absolute top-7 bg-brown-dark text-cream text-[10px] md:text-xs px-2 py-0.5 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max shadow-sm">{(t as any).thisMonth}</span>}
            </div>`;

app = app.replace(oldMonth, newMonth);

fs.writeFileSync("src/App.tsx", app);

