
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

app = app.replace(
  "function App() {",
  "function CalendarApp({ onGoToClock, globalLang, setGlobalLang }: { onGoToClock: () => void, globalLang: Language, setGlobalLang: (l: Language) => void }) {\n  const lang = globalLang;\n  const setLang = setGlobalLang;"
);
app = app.replace(
  "const [lang, setLang] = useState<Language>(\"VN\");",
  ""
);

// We need to add the clock button inside the advanced menu
// The advanced menu looks like this:
// <div className="flex flex-col gap-1">
//   <label className="text-sm font-semibold">{t.startDay}</label>

app = app.replace(
  /<div className="flex flex-col gap-1">\n\s*<label className="text-sm font-semibold">\{t\.startDay\}<\/label>/,
  `<div className="flex flex-col gap-2 mt-4 mb-2">
                <button 
                  onClick={onGoToClock}
                  className="w-full py-1.5 bg-blue-500 text-white rounded font-bold shadow-[0_3px_0_0_#1e3a8a] active:translate-y-1 active:shadow-none transition-all text-sm hover:bg-blue-600"
                >
                  時計学習アプリ
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">{t.startDay}</label>`
);

// Now append the main App component at the end
const mainApp = `
import ClockApp from "./ClockApp";

export default function App() {
  const [view, setView] = useState<"CALENDAR" | "CLOCK">("CALENDAR");
  const [globalLang, setGlobalLang] = useState<Language>("VN");

  if (view === "CLOCK") {
    return <ClockApp onReturn={() => setView("CALENDAR")} initialLang={globalLang} onLangChange={setGlobalLang} />;
  }

  return <CalendarApp onGoToClock={() => setView("CLOCK")} globalLang={globalLang} setGlobalLang={setGlobalLang} />;
}
`;

app = app.replace("export default App;", "");
app += mainApp;

fs.writeFileSync("src/App.tsx", app);

