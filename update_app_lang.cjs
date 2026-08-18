
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const oldCode = `export default function App() {
  const [view, setView] = useState<"CALENDAR" | "CLOCK">("CALENDAR");
  const [globalLang, setGlobalLang] = useState<Language>("VN");

  if (view === "CLOCK") {
    return <ClockApp onReturn={() => setView("CALENDAR")} initialLang={globalLang} onLangChange={setGlobalLang} />;
  }

  return <CalendarApp onGoToClock={() => setView("CLOCK")} globalLang={globalLang} setGlobalLang={setGlobalLang} />;
}`;

const newCode = `export default function App() {
  const [view, setView] = useState<"CALENDAR" | "CLOCK">("CALENDAR");
  const [globalLang, setGlobalLang] = useState<Language>("VN");
  const [clockLang, setClockLang] = useState<Language>("JP");

  if (view === "CLOCK") {
    return <ClockApp onReturn={() => setView("CALENDAR")} initialLang={clockLang} onLangChange={setClockLang} />;
  }

  return <CalendarApp onGoToClock={() => setView("CLOCK")} globalLang={globalLang} setGlobalLang={setGlobalLang} />;
}`;

if (app.includes(oldCode)) {
  app = app.replace(oldCode, newCode);
  fs.writeFileSync("src/App.tsx", app);
  console.log("Success");
} else {
  console.log("Not found");
}

