
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const oldVars = `            let content = null;
            let showMidText = false;
            let midText = "";

            if (isCurrentMonth) {`;

const newVars = `            let content = null;
            let showMidText = false;
            let midText = "";
            let midTextOffset = "-translate-y-1/2";

            if (isCurrentMonth) {`;

app = app.replace(oldVars, newVars);

const oldThisWeek = `                } else if (isThisWeek) {
                  bgClass = "bg-green-300";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\\nこんしゅう"; }
                }`;

const newThisWeek = `                } else if (isThisWeek) {
                  bgClass = "bg-green-300";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\\nこんしゅう"; midTextOffset = "translate-y-1"; }
                }`;

app = app.replace(oldThisWeek, newThisWeek);

const oldRender = `                {showMidText && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs whitespace-pre-wrap text-center font-bold z-20 shadow-md">
                    {midText}
                  </div>
                )}`;

const newRender = `                {showMidText && (
                  <div className={\`absolute top-1/2 left-1/2 -translate-x-1/2 \${midTextOffset} bg-green-600 text-white px-2 py-1 rounded text-xs whitespace-pre-wrap text-center font-bold z-20 shadow-md\`}>
                    {midText}
                  </div>
                )}`;

app = app.replace(oldRender, newRender);

fs.writeFileSync("src/App.tsx", app);

