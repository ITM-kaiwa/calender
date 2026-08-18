
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");

// Add advanceTime function
const toggleRandom = "const toggleRandom = () => setIsRandoming(!isRandoming);";
const advanceTime = `const advanceTime = () => {
    let m = minutes + 30;
    let h = hours;
    if (m >= 60) {
      m -= 60;
      h = (h + 1) % 24;
    }
    setMinutes(m);
    setHours(h);
  };`;

app = app.replace(toggleRandom, toggleRandom + "\\n\\n  " + advanceTime);

// Add onClick to clock window
const clockWindow = `<div className="w-full bg-black rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center border-4 border-gray-800 relative">`;
const newClockWindow = `<div 
          onClick={advanceTime}
          className="w-full bg-black rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center border-4 border-gray-800 relative cursor-pointer active:scale-[0.98] transition-transform"
        >`;

app = app.replace(clockWindow, newClockWindow);

fs.writeFileSync("src/ClockApp.tsx", app);

