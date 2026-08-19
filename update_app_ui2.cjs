
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const oldCode = `{mode === "RANDOM_DATES" && isRandomRunning ? "Stop" : t.randomDates}
          </button>
  
            </div>`;

const newCode = `{mode === "RANDOM_DATES" && isRandomRunning ? "Stop" : t.randomDates}
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
                  className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-lg text-2xl font-bold shadow-[0_3px_0_0_#4b5563] active:translate-y-1 active:shadow-none hover:bg-gray-500 transition-all leading-none"
                >
                  -
                </button>
                <button 
                  onClick={() => setRandomInterval(p => p + 0.5)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-lg text-2xl font-bold shadow-[0_3px_0_0_#4b5563] active:translate-y-1 active:shadow-none hover:bg-gray-500 transition-all leading-none"
                >
                  +
                </button>
              </div>
            </div>`;

app = app.replace(oldCode, newCode);
fs.writeFileSync("src/App.tsx", app);
console.log("Done");

