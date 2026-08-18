
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// I want to change `translate-y-3` in midTextOffset to translate-y-3
app = app.replace(`midTextOffset = "translate-y-3";`, `midTextOffset = "translate-y-4";`);
app = app.replace(`midTextOffset = "-translate-y-1/2";`, `midTextOffset = "";`);

const oldRender = `{showMidText && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 w-[300%] -ml-[100%] pointer-events-none">
                     <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs opacity-90">{midText}</span>
                  </div>
                )}`;

const newRender = `{showMidText && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 w-[300%] -ml-[100%] pointer-events-none">
                     <span className={\`bg-green-600 text-white px-2 py-0.5 rounded text-xs opacity-90 \${midTextOffset}\`}>{midText}</span>
                  </div>
                )}`;

app = app.replace(oldRender, newRender);

fs.writeFileSync("src/App.tsx", app);

