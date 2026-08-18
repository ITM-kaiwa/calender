
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");

// 1. Add state for isAnalog
app = app.replace(
  "const [randomInterval, setRandomInterval] = useState(3.5);",
  "const [randomInterval, setRandomInterval] = useState(3.5);\n  const [isAnalog, setIsAnalog] = useState(false);"
);

// 2. Add translations
const oldTrans = `  const t = {
    JP: { random: "ランダム", back: "カレンダー", mode24: "24時間", mode12: "12時間 (AM/PM)", interval: "待機秒数" },
    VN: { random: "Ngẫu nhiên", back: "Lịch", mode24: "24 giờ", mode12: "12 giờ (AM/PM)", interval: "Thời gian chờ" },
    EN: { random: "Random", back: "Calendar", mode24: "24-Hour", mode12: "12-Hour (AM/PM)", interval: "Interval" },
    CN: { random: "随机", back: "日历", mode24: "24小时", mode12: "12小时 (AM/PM)", interval: "等待秒数" }
  };`;

const newTrans = `  const t = {
    JP: { random: "ランダム", back: "カレンダー", mode24: "24時間", mode12: "12時間 (AM/PM)", interval: "待機秒数", analog: "アナログ", digital: "デジタル" },
    VN: { random: "Ngẫu nhiên", back: "Lịch", mode24: "24 giờ", mode12: "12 giờ (AM/PM)", interval: "Thời gian chờ", analog: "Đồng hồ kim", digital: "Đồng hồ số" },
    EN: { random: "Random", back: "Calendar", mode24: "24-Hour", mode12: "12-Hour (AM/PM)", interval: "Interval", analog: "Analog", digital: "Digital" },
    CN: { random: "随机", back: "日历", mode24: "24小时", mode12: "12小时 (AM/PM)", interval: "等待秒数", analog: "模拟", digital: "数字" }
  };`;

app = app.replace(oldTrans, newTrans);

// 3. Add analog toggle button next to 12/24 hour button
const oldHeader = `<div className="w-full flex justify-between items-center mb-8">
        <button 
          onClick={() => setIs12Hour(!is12Hour)}
          className="px-3 py-1.5 bg-white border border-brown text-brown font-bold text-sm rounded shadow-sm hover:bg-brown-light hover:text-white transition-colors"
        >
          {is12Hour ? t[lang].mode12 : t[lang].mode24}
        </button>
        <select 
          className="bg-white border border-brown text-brown text-sm p-1.5 rounded shadow-sm outline-none cursor-pointer font-bold"
          value={lang} `;

const newHeader = `<div className="w-full flex justify-between items-center mb-8">
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setIs12Hour(!is12Hour)}
            className="px-3 py-1.5 bg-white border border-brown text-brown font-bold text-sm rounded shadow-sm hover:bg-brown-light hover:text-white transition-colors"
          >
            {is12Hour ? t[lang].mode12 : t[lang].mode24}
          </button>
          <button 
            onClick={() => setIsAnalog(!isAnalog)}
            className="px-3 py-1.5 bg-white border border-brown text-brown font-bold text-sm rounded shadow-sm hover:bg-brown-light hover:text-white transition-colors"
          >
            {isAnalog ? t[lang].digital : t[lang].analog}
          </button>
        </div>
        <select 
          className="bg-white border border-brown text-brown text-sm p-1.5 rounded shadow-sm outline-none cursor-pointer font-bold"
          value={lang} `;

app = app.replace(oldHeader, newHeader);

// 4. Conditionally render the clock
const oldClock = `<div 
          onClick={advanceTime}
          className="w-full bg-black rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center border-4 border-gray-800 relative cursor-pointer active:scale-[0.98] transition-transform"
        >
          {is12Hour && (
            <div className="absolute top-4 left-6 text-cyan-500 font-bold text-xl md:text-2xl" style={{ fontFamily: "\\\"Courier New\\\", Courier, monospace" }}>
              {ampmStr}
            </div>
          )}
          <div className="text-7xl md:text-8xl font-black text-cyan-200 tracking-wider mt-4" style={{ fontFamily: "\\\"Courier New\\\", Courier, monospace", textShadow: "0 0 10px rgba(165,243,252,0.5)" }}>
            {timeStr}
          </div>
        </div>`;

const newClock = `{isAnalog ? (
          <div 
            onClick={advanceTime}
            className="w-full max-w-[280px] md:max-w-[320px] aspect-square bg-white rounded-full shadow-xl flex items-center justify-center border-8 border-gray-800 relative cursor-pointer active:scale-[0.98] transition-transform mx-auto"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full p-2">
              {/* Ticks */}
              {[...Array(12)].map((_, i) => (
                <line 
                  key={i} 
                  x1="50" y1="5" x2="50" y2="15" 
                  stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" 
                  transform={\`rotate(\${i * 30}, 50, 50)\`} 
                />
              ))}
              
              {/* Hour Hand */}
              <line x1="50" y1="50" x2="50" y2="28" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" transform={\`rotate(\${(hours % 12) * 30 + minutes * 0.5}, 50, 50)\`} />
              
              {/* Minute Hand */}
              <line x1="50" y1="50" x2="50" y2="12" stroke="#000000" strokeWidth="3" strokeLinecap="round" transform={\`rotate(\${minutes * 6}, 50, 50)\`} />
              
              {/* Center Dot */}
              <circle cx="50" cy="50" r="4" fill="#1f2937" />
            </svg>
          </div>
        ) : (
          <div 
            onClick={advanceTime}
            className="w-full bg-black rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center border-4 border-gray-800 relative cursor-pointer active:scale-[0.98] transition-transform"
          >
            {is12Hour && (
              <div className="absolute top-4 left-6 text-cyan-500 font-bold text-xl md:text-2xl" style={{ fontFamily: "\\\"Courier New\\\", Courier, monospace" }}>
                {ampmStr}
              </div>
            )}
            <div className="text-7xl md:text-8xl font-black text-cyan-200 tracking-wider mt-4" style={{ fontFamily: "\\\"Courier New\\\", Courier, monospace", textShadow: "0 0 10px rgba(165,243,252,0.5)" }}>
              {timeStr}
            </div>
          </div>
        )}`;

app = app.replace(oldClock, newClock);

fs.writeFileSync("src/ClockApp.tsx", app);
console.log("Done");

