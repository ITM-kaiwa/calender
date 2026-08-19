
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// Update useEffect timeout values
app = app.replace(
  `          timeout1 = window.setTimeout(() => {\n            setRandomStep("SHOW");\n            timeout2 = window.setTimeout(runCycle, 3000);\n          }, 2000);`,
  `          timeout1 = window.setTimeout(() => {\n            setRandomStep("SHOW");\n            timeout2 = window.setTimeout(runCycle, 2000);\n          }, randomInterval * 1000);`
);

app = app.replace(
  `}, [mode, isRandomRunning, firstDayIndex, daysInMonth]);`,
  `}, [mode, isRandomRunning, firstDayIndex, daysInMonth, randomInterval]);`
);

fs.writeFileSync("src/App.tsx", app);
console.log("Done");

