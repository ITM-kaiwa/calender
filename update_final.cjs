
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// 1. Rename timeAttack variables and logic to handle random cycle
app = app.replace(
  "const [isTimeAttackRunning, setIsTimeAttackRunning] = useState(false);\n  const [timeAttackStep, setTimeAttackStep] = useState<\"WAIT\" | \"SHOW\">(\"WAIT\");",
  "const [isRandomRunning, setIsRandomRunning] = useState(false);\n  const [randomStep, setRandomStep] = useState<\"WAIT\" | \"SHOW\">(\"WAIT\");"
);

// Update mode reset effect
app = app.replace(
  "setIsTimeAttackRunning(false);",
  "setIsRandomRunning(false);"
);

// Update time attack effect logic
const oldEffect = `  // Time attack logic
  useEffect(() => {
    let timeout1: number;
    let timeout2: number;
    if (mode === "TIME_ATTACK" && isTimeAttackRunning) {
      const runCycle = () => {
        const randomIndex = firstDayIndex + Math.floor(Math.random() * daysInMonth);
        setActiveCellIndex(randomIndex);
        setTimeAttackStep("WAIT");
        
        timeout1 = window.setTimeout(() => {
          setTimeAttackStep("SHOW");
          timeout2 = window.setTimeout(runCycle, 3000);
        }, 2000);
      };
      runCycle();
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [mode, isTimeAttackRunning, firstDayIndex, daysInMonth]);`;

const newEffect = `  // Random mode auto-cycle logic
  useEffect(() => {
    let timeout1: number;
    let timeout2: number;
    if ((mode === "RANDOM_DAYS" || mode === "RANDOM_DATES") && isRandomRunning) {
      const runCycle = () => {
        const randomIndex = firstDayIndex + Math.floor(Math.random() * daysInMonth);
        setActiveCellIndex(randomIndex);
        setRandomStep("WAIT");
        
        timeout1 = window.setTimeout(() => {
          setRandomStep("SHOW");
          timeout2 = window.setTimeout(runCycle, 3000);
        }, 2000);
      };
      runCycle();
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [mode, isRandomRunning, firstDayIndex, daysInMonth]);`;

app = app.replace(oldEffect, newEffect);

// Update toggle handlers
app = app.replace(
  "const pickRandomDay = () => {\n    setMode(\"RANDOM_DAYS\");\n    const randomIndex = firstDayIndex + Math.floor(Math.random() * daysInMonth);\n    setActiveCellIndex(randomIndex);\n  };",
  "const toggleRandomDays = () => {\n    if (mode !== \"RANDOM_DAYS\") {\n      setMode(\"RANDOM_DAYS\");\n      setIsRandomRunning(true);\n    } else {\n      setIsRandomRunning(!isRandomRunning);\n    }\n  };"
);

app = app.replace(
  "const pickRandomDate = () => {\n    setMode(\"RANDOM_DATES\");\n    const randomIndex = firstDayIndex + Math.floor(Math.random() * daysInMonth);\n    setActiveCellIndex(randomIndex);\n  };",
  "const toggleRandomDates = () => {\n    if (mode !== \"RANDOM_DATES\") {\n      setMode(\"RANDOM_DATES\");\n      setIsRandomRunning(true);\n    } else {\n      setIsRandomRunning(!isRandomRunning);\n    }\n  };"
);

// Delete toggleTimeAttack
app = app.replace(
  /const toggleTimeAttack = \(\) => {[\s\S]*?};\n/,
  ""
);

// Update render logic in cells for random days/dates
app = app.replace(
  "} else if (mode === \"RANDOM_DAYS\" && activeCellIndex === i) {\n                bgClass = \"bg-red-100\";\n                content = fullDayLabels[col];\n              } else if (mode === \"RANDOM_DATES\" && activeCellIndex === i) {\n                bgClass = \"bg-blue-100\";\n                content = t.dateReadings[date! - 1];\n              } else if (mode === \"TIME_ATTACK\" && activeCellIndex === i) {\n                bgClass = \"bg-yellow-100\";\n                if (timeAttackStep === \"SHOW\") {\n                  content = t.dateReadings[date! - 1];\n                }\n              }",
  "} else if (mode === \"RANDOM_DAYS\" && activeCellIndex === i) {\n                bgClass = \"bg-red-100\";\n                if (randomStep === \"SHOW\") {\n                  content = fullDayLabels[col];\n                }\n              } else if (mode === \"RANDOM_DATES\" && activeCellIndex === i) {\n                bgClass = \"bg-blue-100\";\n                if (randomStep === \"SHOW\") {\n                  content = t.dateReadings[date! - 1];\n                }\n              }"
);

// Add SPECIFIC_DAY button to header between year and month
app = app.replace(
  "<span className=\"text-lg font-bold text-brown-dark\">{year}{lang === \"EN\" ? \"\" : t.year}</span>\n            <button \n              onClick={nextYear}",
  "<span className=\"text-lg font-bold text-brown-dark\">{year}{lang === \"EN\" ? \"\" : t.year}</span>\n            <button \n              onClick={nextYear}"
);
// Actually, let's replace the whole year/month flex container
app = app.replace(
  /<div className="flex items-center gap-2 relative">[\s\S]*?<\/div>\n          \n          <div className="flex items-center gap-3">/,
  `<div className="flex items-center gap-2 relative">
            <button 
              onClick={prevYear} 
              className={\`px-2 py-1 bg-brown/10 rounded hover:bg-brown/20 active:scale-95 transition group \${mode === "SPECIFIC_DAY" ? "bg-brown text-cream" : ""}\`}
              title={t.lastYear}
            >
              {"<<"}
              {mode === "SPECIFIC_DAY" && <span className="absolute -top-8 left-0 bg-brown text-cream text-xs p-1 rounded whitespace-nowrap">{t.lastYear}</span>}
            </button>
            <span className="text-lg font-bold text-brown-dark">{year}{lang === "EN" ? "" : t.year}</span>
            <button 
              onClick={nextYear} 
              className={\`px-2 py-1 bg-brown/10 rounded hover:bg-brown/20 active:scale-95 transition group relative \${mode === "SPECIFIC_DAY" ? "bg-brown text-cream" : ""}\`}
              title={t.nextYear}
            >
              {">>"}
              {mode === "SPECIFIC_DAY" && <span className="absolute -top-8 right-0 bg-brown text-cream text-xs p-1 rounded whitespace-nowrap">{t.nextYear}</span>}
            </button>
          </div>

          <button 
            onClick={setSpecificDayMode}
            className={\`px-3 py-1 mx-2 rounded font-semibold active:scale-95 transition shadow-sm border border-brown-light/30 text-sm whitespace-nowrap
              \${mode === "SPECIFIC_DAY" ? "bg-brown text-white" : "bg-white hover:bg-cream text-brown"}\`}
          >
            {t.specificDay}
          </button>
          
          <div className="flex items-center gap-3">`
);

// Delete buttons at the bottom
app = app.replace(
  /<button \n          onClick={pickRandomDay}[\s\S]*?{t\.specificDay}\n        <\/button>/,
  `<button 
          onClick={toggleRandomDays}
          className={\`w-full py-2 border rounded font-semibold active:scale-[0.98] transition shadow-sm
            \${mode === "RANDOM_DAYS" && isRandomRunning ? "bg-red-500 text-white border-red-600" : "bg-green-100 hover:bg-green-200 text-green-900 border-green-300"}\`}
        >
          {mode === "RANDOM_DAYS" && isRandomRunning ? "Stop" : t.randomDays}
        </button>

        <button 
          onClick={toggleRandomDates}
          className={\`w-full py-2 border rounded font-semibold active:scale-[0.98] transition shadow-sm
            \${mode === "RANDOM_DATES" && isRandomRunning ? "bg-red-500 text-white border-red-600" : "bg-orange-100 hover:bg-orange-200 text-orange-900 border-orange-300"}\`}
        >
          {mode === "RANDOM_DATES" && isRandomRunning ? "Stop" : t.randomDates}
        </button>`
);

fs.writeFileSync("src/App.tsx", app);

