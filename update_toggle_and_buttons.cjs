
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// 1. Fix Specific Day toggle
app = app.replace(
  "const setSpecificDayMode = () => {\n    setMode(\"SPECIFIC_DAY\");\n  };",
  "const setSpecificDayMode = () => {\n    setMode(mode === \"SPECIFIC_DAY\" ? \"NONE\" : \"SPECIFIC_DAY\");\n  };"
);

// 2. Fix the useEffect bug that resets isRandomRunning
app = app.replace(
  "useEffect(() => {\n    setActiveCellIndex(null);\n    setIsRandomRunning(false);\n  }, [mode, currentDate]);",
  "useEffect(() => {\n    setActiveCellIndex(null);\n  }, [mode, currentDate]);"
);

// 3. Improve button click effects for all mode buttons and advanced button
// Let's replace `active:scale-95 transition shadow-sm` and `active:scale-[0.98] transition shadow-sm`
// with `active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all`
app = app.replace(
  /active:scale-95 transition shadow-sm/g,
  "active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all"
);
app = app.replace(
  /active:scale-\[0\.98\] transition shadow-sm/g,
  "active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all"
);

// Advanced button in header
app = app.replace(
  "active:scale-95 transition",
  "active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all"
);

// Year/Month buttons
app = app.replace(
  /active:scale-95 transition/g,
  "active:translate-y-0.5 active:shadow-none shadow-[0_2px_0_0_rgba(0,0,0,0.15)] transition-all"
);

// We need to ensure that when switching to non-random modes, we stop the random running state just in case,
// but since the random loop checks \`mode === "RANDOM_DAYS" || mode === "RANDOM_DATES"\`, it will automatically stop the loop.
// So removing \`setIsRandomRunning(false)\` from the useEffect is perfectly safe.

fs.writeFileSync("src/App.tsx", app);

