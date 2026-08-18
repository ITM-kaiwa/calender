
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");

// Add randomInterval state
app = app.replace(
  "const [is12Hour, setIs12Hour] = useState(false);",
  "const [is12Hour, setIs12Hour] = useState(false);\n  const [randomInterval, setRandomInterval] = useState(3.5);"
);

// Update setInterval
app = app.replace(
  /interval = window\.setInterval\(\(\) => \{[\s\S]*?\}, 3500\);/,
  `interval = window.setInterval(() => {
        setHours(Math.floor(Math.random() * 24));
        setMinutes(Math.floor(Math.random() * 60));
      }, randomInterval * 1000);`
);

// Add the controls above the random button
const randomBtn = `<button
            onClick={toggleRandom}`;

const controls = `<div className="w-full flex items-center justify-between bg-white/70 rounded-xl p-2 px-4 shadow-sm border border-brown-light/30">
            <span className="font-bold text-brown-dark text-sm">
              {t[lang].interval || "Interval"}: {randomInterval}s
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setRandomInterval(p => Math.max(0.5, p - 0.5))}
                className="w-8 h-8 flex items-center justify-center bg-brown-light text-white rounded-lg font-bold shadow-[0_3px_0_0_#5a3a2a] active:translate-y-1 active:shadow-none hover:bg-brown transition-all"
              >
                -
              </button>
              <button 
                onClick={() => setRandomInterval(p => p + 0.5)}
                className="w-8 h-8 flex items-center justify-center bg-brown-light text-white rounded-lg font-bold shadow-[0_3px_0_0_#5a3a2a] active:translate-y-1 active:shadow-none hover:bg-brown transition-all"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={toggleRandom}`;

app = app.replace(randomBtn, controls);

// Update translations
app = app.replace(
  `JP: { random: "ランダム", back: "カレンダー", mode24: "24時間", mode12: "12時間 (AM/PM)" },`,
  `JP: { random: "ランダム", back: "カレンダー", mode24: "24時間", mode12: "12時間 (AM/PM)", interval: "待機秒数" },`
);
app = app.replace(
  `VN: { random: "Ngẫu nhiên", back: "Lịch", mode24: "24 giờ", mode12: "12 giờ (AM/PM)" },`,
  `VN: { random: "Ngẫu nhiên", back: "Lịch", mode24: "24 giờ", mode12: "12 giờ (AM/PM)", interval: "Thời gian chờ" },`
);
app = app.replace(
  `EN: { random: "Random", back: "Calendar", mode24: "24-Hour", mode12: "12-Hour (AM/PM)" },`,
  `EN: { random: "Random", back: "Calendar", mode24: "24-Hour", mode12: "12-Hour (AM/PM)", interval: "Interval" },`
);
app = app.replace(
  `CN: { random: "随机", back: "日历", mode24: "24小时", mode12: "12小时 (AM/PM)" }`,
  `CN: { random: "随机", back: "日历", mode24: "24小时", mode12: "12小时 (AM/PM)", interval: "等待秒数" }`
);

fs.writeFileSync("src/ClockApp.tsx", app);

