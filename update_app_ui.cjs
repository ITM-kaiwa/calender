
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const oldUI = `<button 
            onClick={toggleRandomDates}
            className={\`w-full py-2 border rounded font-semibold active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all
              \${mode === "RANDOM_DATES" && isRandomRunning ? "bg-red-500 text-white border-red-600" : "bg-orange-100 hover:bg-orange-200 text-orange-900 border-orange-300"}\`}
          >
            {mode === "RANDOM_DATES" && isRandomRunning ? "Stop" : t.randomDates}
          </button>
  
        </div>`;

const newUI = `<button 
            onClick={toggleRandomDates}
            className={\`w-full py-2 border rounded font-semibold active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all
              \${mode === "RANDOM_DATES" && isRandomRunning ? "bg-red-500 text-white border-red-600" : "bg-orange-100 hover:bg-orange-200 text-orange-900 border-orange-300"}\`}
          >
            {mode === "RANDOM_DATES" && isRandomRunning ? "Stop" : t.randomDates}
          </button>
  
        </div>

        {/* Random Interval Selector */}
        <div className="w-full flex items-center justify-between bg-white rounded p-2 px-4 shadow-sm border border-brown-light/30">
          <span className="font-bold text-brown-dark text-sm">
            {(t as any).interval || "待機秒数"}: {randomInterval}s
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setRandomInterval(p => Math.max(0.5, p - 0.5))}
              className="w-8 h-8 flex items-center justify-center bg-gray-400 text-white rounded text-xl font-bold shadow-[0_2px_0_0_#4b5563] active:translate-y-0.5 active:shadow-none hover:bg-gray-500 transition-all leading-none"
            >
              -
            </button>
            <button 
              onClick={() => setRandomInterval(p => p + 0.5)}
              className="w-8 h-8 flex items-center justify-center bg-gray-400 text-white rounded text-xl font-bold shadow-[0_2px_0_0_#4b5563] active:translate-y-0.5 active:shadow-none hover:bg-gray-500 transition-all leading-none"
            >
              +
            </button>
          </div>
        </div>`;

app = app.replace(oldUI, newUI);
fs.writeFileSync("src/App.tsx", app);
console.log("Done");

