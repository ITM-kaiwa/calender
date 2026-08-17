
const fs = require("fs");

// 1. Update i18n.ts
let i18n = fs.readFileSync("src/i18n.ts", "utf8");
i18n = i18n.replace(/today: "今日",/, "today: \"今日\\nきょう\",");
i18n = i18n.replace(/yesterday: "昨日",/, "yesterday: \"昨日\\nきのう\",");
i18n = i18n.replace(/dayBeforeYesterday: "一昨日",/, "dayBeforeYesterday: \"一昨日\\nおととい\",");
i18n = i18n.replace(/tomorrow: "明日",/, "tomorrow: \"明日\\nあした\",");
i18n = i18n.replace(/dayAfterTomorrow: "明後日",/, "dayAfterTomorrow: \"明後日\\nあさって\",");
i18n = i18n.replace(/lastWeek: "先週",/, "lastWeek: \"先週\\nせんしゅう\",");
i18n = i18n.replace(/nextWeek: "来週",/, "nextWeek: \"来週\\nらいしゅう\",");
// also update CN for 月 to avoid space maybe? no it's fine.
fs.writeFileSync("src/i18n.ts", i18n);

// 2. Update App.tsx
let app = fs.readFileSync("src/App.tsx", "utf8");

// Month indicator in header
app = app.replace(
  /<span className="text-xl font-bold w-12 text-center">{month \+ 1}<\/span>/,
  "<span className=\"text-xl font-bold w-16 text-center\">{month + 1}{lang === \"EN\" ? \"\" : t.month}</span>"
);

// Remove "8月 " from cell content
app = app.replace(
  /content = \(lang === "JP" \? \`\\\${month \+ 1}月 \` : \`\`\) \+ t\.dateReadings\[date! - 1\];/g,
  "content = t.dateReadings[date! - 1];"
);

// Add whitespace-pre-wrap to cell content span
app = app.replace(
  /className="text-\[10px\] md:text-xs text-center font-semibold leading-tight text-brown"/,
  "className=\"text-[10px] md:text-xs text-center font-semibold leading-tight text-brown whitespace-pre-wrap\""
);

// Time attack logic
const oldTimeAttack = `  // Time attack logic
  useEffect(() => {
    if (mode === "TIME_ATTACK" && isTimeAttackRunning) {
      const pickRandom = () => {
        const randomIndex = firstDayIndex + Math.floor(Math.random() * daysInMonth);
        setActiveCellIndex(randomIndex);
        setTimeAttackStep("WAIT");
        
        setTimeout(() => {
          setTimeAttackStep("SHOW");
        }, 2000);
      };
      
      pickRandom();
      timeAttackTimer.current = window.setInterval(pickRandom, 5000);
      
      return () => {
        if (timeAttackTimer.current) clearInterval(timeAttackTimer.current);
      };
    }
  }, [mode, isTimeAttackRunning, firstDayIndex, daysInMonth]);`;

const newTimeAttack = `  // Time attack logic
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

app = app.replace(oldTimeAttack, newTimeAttack);

fs.writeFileSync("src/App.tsx", app);

