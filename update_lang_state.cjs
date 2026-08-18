
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const oldCode = `export default function App() {
  const [view, setView] = useState<"CALENDAR" | "CLOCK">("CALENDAR");
  const [globalLang, setGlobalLang] = useState<Language>("VN");

  if (view === "CLOCK") {
    return <ClockApp lang={globalLang} setLang={setGlobalLang} onBack={() => setView("CALENDAR")} />;
  }

  return <CalendarApp lang={globalLang} setLang={setGlobalLang} onGoToClock={() => setView("CLOCK")} />;
}`;

const newCode = `export default function App() {
  const [view, setView] = useState<"CALENDAR" | "CLOCK">("CALENDAR");
  const [calendarLang, setCalendarLang] = useState<Language>("VN");
  const [clockLang, setClockLang] = useState<Language>("JP");

  if (view === "CLOCK") {
    return <ClockApp lang={clockLang} setLang={setClockLang} onBack={() => setView("CALENDAR")} />;
  }

  return <CalendarApp lang={calendarLang} setLang={setCalendarLang} onGoToClock={() => setView("CLOCK")} />;
}`;

app = app.replace(oldCode, newCode);

fs.writeFileSync("src/App.tsx", app);

