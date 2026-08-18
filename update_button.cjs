
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const oldHeader = `<div className="w-full flex justify-between items-center mb-4 mt-2">
        <h1 className="text-xl font-bold text-brown-dark">Calendar</h1>
        <div className="relative" ref={advancedMenuRef}>`;

const newHeader = `<div className="w-full flex justify-between items-center mb-4 mt-2">
        <h1 className="text-xl font-bold text-brown-dark">Calendar</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowInstructions(true)} 
            className="px-3 py-1 bg-brown text-white hover:bg-brown-dark rounded font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-none transition-all text-xs"
          >
            {t.howToUse}
          </button>
          <div className="relative" ref={advancedMenuRef}>`;

app = app.split(oldHeader).join(newHeader);

const oldClose = `              {t.advanced} ▼
            </button>`;
const newClose = `              {t.advanced} ▼
            </button>\n          </div>`;
app = app.split(oldClose).join(newClose);

fs.writeFileSync("src/App.tsx", app);

