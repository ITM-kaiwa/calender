
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");

// 1. Update readingStr
const oldReading = `const readingStr = getClockReading(hours, minutes, lang, is12Hour);`;
const newReading = `const readingStr = getClockReading(hours, minutes, lang, isAnalog ? true : is12Hour, isAnalog);`;
app = app.replace(oldReading, newReading);

// 2. Hide 12/24 button when analog
const oldHeader = `<div className="w-full flex justify-between items-center mb-8">
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setIs12Hour(!is12Hour)}
            className="px-3 py-1.5 bg-white border border-brown text-brown font-bold text-sm rounded shadow-sm hover:bg-brown-light hover:text-white transition-colors"
          >
            {is12Hour ? t[lang].mode12 : t[lang].mode24}
          </button>
          <button 
            onClick={() => setIsAnalog(!isAnalog)}`;

const newHeader = `<div className="w-full flex justify-between items-center mb-8">
        <div className="flex gap-2 items-center">
          {!isAnalog && (
            <button 
              onClick={() => setIs12Hour(!is12Hour)}
              className="px-3 py-1.5 bg-white border border-brown text-brown font-bold text-sm rounded shadow-sm hover:bg-brown-light hover:text-white transition-colors"
            >
              {is12Hour ? t[lang].mode12 : t[lang].mode24}
            </button>
          )}
          <button 
            onClick={() => setIsAnalog(!isAnalog)}`;

app = app.replace(oldHeader, newHeader);

fs.writeFileSync("src/ClockApp.tsx", app);
console.log("Done");

