
import { useState, useEffect, useRef } from "react";
import { translations } from "./i18n";
import type { Language } from "./i18n";

type Mode = "NONE" | "PRACTICE_DAYS" | "PRACTICE_DATES" | "RANDOM_DAYS" | "RANDOM_DATES" | "TIME_ATTACK" | "SPECIFIC_DAY";

function CalendarApp({ onGoToClock, globalLang, setGlobalLang }: { onGoToClock: () => void, globalLang: Language, setGlobalLang: (l: Language) => void }) {
  const lang = globalLang;
  const setLang = setGlobalLang;
  
  const [startDay, setStartDay] = useState<"MONDAY" | "SUNDAY">("MONDAY");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const advancedMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (advancedMenuRef.current && !advancedMenuRef.current.contains(event.target as Node)) {
        setShowAdvanced(false);
      }
    };
    if (showAdvanced) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAdvanced]);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [mode, setMode] = useState<Mode>("NONE");
  const [activeCellIndex, setActiveCellIndex] = useState<number | null>(null);
  
  // Time attack state
  const [isRandomRunning, setIsRandomRunning] = useState(false);
  const [randomStep, setRandomStep] = useState<"WAIT" | "SHOW">("WAIT");
  const [randomInterval, setRandomInterval] = useState(3.5);
  const timeAttackTimer = useRef<number | null>(null);

  const t = translations[lang];

  // Get days in month, start offset
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-11
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayObj = new Date(year, month, 1);
  let firstDayIndex = firstDayObj.getDay(); // 0(Sun) - 6(Sat)
  
  if (startDay === "MONDAY") {
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // 0(Mon) - 6(Sun)
  }

  // Calculate needed weeks
  const neededCells = firstDayIndex + daysInMonth;
  const weeks = Math.ceil(neededCells / 7);
  const totalCells = weeks * 7;

  // Real today
  const todayDate = new Date();

  // Mode reset
  useEffect(() => {
    setActiveCellIndex(null);
    setIsRandomRunning(false);
    if (timeAttackTimer.current) clearInterval(timeAttackTimer.current);
  }, [mode, currentDate]);

  // Random mode auto-cycle logic
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
  }, [mode, isRandomRunning, firstDayIndex, daysInMonth, randomInterval]);

  const handleCellClick = (index: number) => {
    const isCurrentMonth = index >= firstDayIndex && index < firstDayIndex + daysInMonth;
    if (!isCurrentMonth) return;

    if (mode === "PRACTICE_DAYS" || mode === "PRACTICE_DATES") {
      setActiveCellIndex(index);
    }
  };

  const toggleRandomDays = () => {
    if (mode !== "RANDOM_DAYS") {
      setMode("RANDOM_DAYS");
      setIsRandomRunning(true);
    } else {
      setIsRandomRunning(!isRandomRunning);
    }
  };

  const toggleRandomDates = () => {
    if (mode !== "RANDOM_DATES") {
      setMode("RANDOM_DATES");
      setIsRandomRunning(true);
    } else {
      setIsRandomRunning(!isRandomRunning);
    }
  };

  
  const setSpecificDayMode = () => {
    setMode(mode === "SPECIFIC_DAY" ? "NONE" : "SPECIFIC_DAY");
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevYear = () => {
    setCurrentDate(new Date(year - 1, month, 1));
  };

  const nextYear = () => {
    setCurrentDate(new Date(year + 1, month, 1));
  };

  // Specific Day logic helpers
  const isSameDate = (d1: Date, y: number, m: number, d: number) => 
    d1.getFullYear() === y && d1.getMonth() === m && d1.getDate() === d;
  
  

  const yesterdayDate = new Date(todayDate); yesterdayDate.setDate(todayDate.getDate() - 1);
  const dayBeforeYest = new Date(todayDate); dayBeforeYest.setDate(todayDate.getDate() - 2);
  const tomorrowDate = new Date(todayDate); tomorrowDate.setDate(todayDate.getDate() + 1);
  const dayAfterTom = new Date(todayDate); dayAfterTom.setDate(todayDate.getDate() + 2);

  const getSpecificDayText = (date: number) => {
    if (isSameDate(todayDate, year, month, date)) return t.today;
    if (isSameDate(yesterdayDate, year, month, date)) return t.yesterday;
    if (isSameDate(dayBeforeYest, year, month, date)) return t.dayBeforeYesterday;
    if (isSameDate(tomorrowDate, year, month, date)) return t.tomorrow;
    if (isSameDate(dayAfterTom, year, month, date)) return t.dayAfterTomorrow;
    return null;
  };

  const getWeekRange = (dateObj: Date) => {
    const d = new Date(dateObj);
    const day = d.getDay();
    const diffToStart = startDay === "MONDAY" ? (day === 0 ? 6 : day - 1) : day;
    d.setDate(d.getDate() - diffToStart);
    const start = new Date(d);
    d.setDate(d.getDate() + 6);
    const end = new Date(d);
    return {start, end};
  };

  const lastWeek = new Date(todayDate); lastWeek.setDate(todayDate.getDate() - 7);
  const nextWeekD = new Date(todayDate); nextWeekD.setDate(todayDate.getDate() + 7);

  const lastWeekRange = getWeekRange(lastWeek);
  const thisWeekRange = getWeekRange(todayDate);
  const nextWeekRange = getWeekRange(nextWeekD);

  const isInRange = (y: number, m: number, d: number, range: {start: Date, end: Date}) => {
    const dt = new Date(y, m, d);
    dt.setHours(0,0,0,0);
    const s = new Date(range.start); s.setHours(0,0,0,0);
    const e = new Date(range.end); e.setHours(0,0,0,0);
    return dt >= s && dt <= e;
  };

  const dayLabels = startDay === "MONDAY" ? t.days : t.daysSunFirst;
  const fullDayLabels = startDay === "MONDAY" ? t.daysFull : t.daysFullSunFirst;

  return (
    <div className="min-h-screen p-4 flex flex-col items-center select-none overflow-x-hidden w-full max-w-lg mx-auto relative">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4 mt-2">
        <h1 className="text-xl font-bold text-brown-dark">Calendar</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowInstructions(true)} 
            className="px-3 py-1 bg-brown text-white hover:bg-brown-dark rounded font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-none transition-all text-xs"
          >
            {t.howToUse}
          </button>
          <div className="relative" ref={advancedMenuRef}>
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-3 py-1 bg-brown-light text-cream rounded shadow active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all"
          >
            {t.advanced} ▼
          </button>
          
          {showAdvanced && (
            <div className="absolute right-0 top-10 w-48 bg-cream border border-brown rounded shadow-lg p-3 z-50">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold">{t.ui}</label>
                <select 
                  className="bg-white border border-brown text-brown text-sm p-1 rounded"
                  value={lang} 
                  onChange={(e) => setLang(e.target.value as Language)}
                >
                  <option value="JP">JP</option>
                  <option value="VN">VN</option>
                  <option value="EN">EN</option>
                  <option value="CN">CN</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">{t.startDay}</label>
                <div className="flex gap-2">
                  <label className="text-sm flex items-center gap-1 cursor-pointer">
                    <input type="radio" checked={startDay === "MONDAY"} onChange={() => setStartDay("MONDAY")}/>
                    {t.monday}
                  </label>
                  <label className="text-sm flex items-center gap-1 cursor-pointer">
                    <input type="radio" checked={startDay === "SUNDAY"} onChange={() => setStartDay("SUNDAY")}/>
                    {t.sunday}
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4 mb-2">
                <button 
                  onClick={onGoToClock}
                  className="w-full py-1.5 bg-blue-500 text-white rounded font-bold shadow-[0_3px_0_0_#1e3a8a] active:translate-y-1 active:shadow-none transition-all text-sm hover:bg-blue-600"
                >
                  時計学習アプリ
                </button>
              </div>

            </div>
          )}
        </div>
        </div>
      </div>

      {/* Calendar Area */}
      <div className="w-full bg-white rounded-xl shadow-md p-3 border border-brown-light/30">
        
        {/* Year and Month Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={prevYear} 
              className={`px-2 py-1 bg-brown/10 rounded hover:bg-brown/20 active:translate-y-0.5 active:shadow-none shadow-[0_2px_0_0_rgba(0,0,0,0.15)] transition-all group`}
              title={t.lastYear}
            >
              {"<<"}
              {mode === "SPECIFIC_DAY" && <span className="absolute -top-10 left-0 bg-pink-100 text-brown-dark border border-pink-200 text-[10px] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max">{t.lastYear}</span>}
            </button>
            <div className="relative flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-brown-dark leading-none mt-1">{year}{lang === "EN" ? "" : t.year}</span>
              {mode === "SPECIFIC_DAY" && <span className="absolute top-6 bg-pink-100 border border-pink-200 text-brown-dark text-[10px] md:text-xs px-1 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max shadow-sm">{(t as any).thisYear}</span>}
            </div>
            <button 
              onClick={nextYear} 
              className={`px-2 py-1 bg-brown/10 rounded hover:bg-brown/20 active:translate-y-0.5 active:shadow-none shadow-[0_2px_0_0_rgba(0,0,0,0.15)] transition-all group relative`}
              title={t.nextYear}
            >
              {">>"}
              {mode === "SPECIFIC_DAY" && <span className="absolute -top-10 right-0 bg-pink-100 text-brown-dark border border-pink-200 text-[10px] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max">{t.nextYear}</span>}
            </button>
          </div>

          <button 
            onClick={setSpecificDayMode}
            className={`px-3 py-1 mx-2 rounded font-semibold active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all border border-brown-light/30 text-sm whitespace-nowrap
              ${mode === "SPECIFIC_DAY" ? "bg-brown text-white" : "bg-white hover:bg-cream text-brown"}`}
          >
            {t.specificDay}
          </button>
          
          <div className="flex items-center gap-3">
             <button 
              onClick={prevMonth} 
              className={`px-3 py-1 bg-brown/10 rounded hover:bg-brown/20 active:translate-y-0.5 active:shadow-none shadow-[0_2px_0_0_rgba(0,0,0,0.15)] transition-all relative`}
              title={t.lastMonth}
            >
              {"<"}
              {mode === "SPECIFIC_DAY" && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-pink-100 border border-pink-200 text-brown-dark text-[10px] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max">{t.lastMonth}</span>}
            </button>
            <div className="relative flex flex-col items-center justify-center w-24">
              <span className="text-xl font-bold w-auto px-2 text-center leading-none mt-1">{lang === "EN" ? t.monthNames[month] : `${month + 1}${t.month}`}</span>
              {mode === "SPECIFIC_DAY" && <span className="absolute top-7 bg-pink-100 border border-pink-200 text-brown-dark text-[10px] md:text-xs px-2 py-0.5 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max shadow-sm">{(t as any).thisMonth}</span>}
            </div>
            <button 
              onClick={nextMonth} 
              className={`px-3 py-1 bg-brown/10 rounded hover:bg-brown/20 active:translate-y-0.5 active:shadow-none shadow-[0_2px_0_0_rgba(0,0,0,0.15)] transition-all relative`}
              title={t.nextMonth}
            >
              {">"}
              {mode === "SPECIFIC_DAY" && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-pink-100 border border-pink-200 text-brown-dark text-[10px] md:text-xs p-1 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max">{t.nextMonth}</span>}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 border-t border-l border-brown-light/20">
          {/* Header Row */}
          {dayLabels.map((day, idx) => {
            const isSat = (startDay === "MONDAY" && idx === 5) || (startDay === "SUNDAY" && idx === 6);
            const isSun = (startDay === "MONDAY" && idx === 6) || (startDay === "SUNDAY" && idx === 0);
            return (
              <div 
                key={idx} 
                className={`text-center py-2 border-r border-b border-brown-light/20 bg-orange-100 font-bold text-sm
                ${isSat ? "text-blue-600" : isSun ? "text-red-600" : "text-brown-dark"}`}
              >
                {day}
              </div>
            );
          })}

          {/* Cells */}
          {Array.from({ length: totalCells }).map((_, i) => {
            const isCurrentMonth = i >= firstDayIndex && i < firstDayIndex + daysInMonth;
            const date = isCurrentMonth ? i - firstDayIndex + 1 : null;
            
            const col = i % 7;
            const isSat = (startDay === "MONDAY" && col === 5) || (startDay === "SUNDAY" && col === 6);
            const isSun = (startDay === "MONDAY" && col === 6) || (startDay === "SUNDAY" && col === 0);

            // Coloring logic
            let bgClass = "bg-white";
            let content = null;
            let showMidText = false;
            let midText = "";
            let midTextOffset = "translate-y-5 md:translate-y-6";

            if (isCurrentMonth) {
              const specificText = mode === "SPECIFIC_DAY" ? getSpecificDayText(date!) : null;
              const isLastWeek = mode === "SPECIFIC_DAY" && isInRange(year, month, date!, lastWeekRange);
              const isThisWeek = mode === "SPECIFIC_DAY" && isInRange(year, month, date!, thisWeekRange);
              const isNextWeek = mode === "SPECIFIC_DAY" && isInRange(year, month, date!, nextWeekRange);

              if (mode === "PRACTICE_DAYS" && activeCellIndex === i) {
                bgClass = "bg-red-100";
                content = fullDayLabels[col];
              } else if (mode === "PRACTICE_DATES" && activeCellIndex === i) {
                bgClass = "bg-orange-100";
                content = t.dateReadings[date! - 1];
              } else if (mode === "RANDOM_DAYS" && activeCellIndex === i) {
                bgClass = "bg-red-100";
                if (randomStep === "SHOW") {
                  content = fullDayLabels[col];
                }
              } else if (mode === "RANDOM_DATES" && activeCellIndex === i) {
                bgClass = "bg-blue-100";
                if (randomStep === "SHOW") {
                  content = t.dateReadings[date! - 1];
                }
              } else if (mode === "SPECIFIC_DAY") {
                if (isLastWeek) {
                  bgClass = "bg-green-100";
                  if (col === 3) { showMidText = true; midText = t.lastWeek; }
                } else if (isThisWeek) {
                  bgClass = "bg-green-300";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\nこんしゅう"; }
                } else if (isNextWeek) {
                  bgClass = "bg-blue-100";
                  if (col === 3) { showMidText = true; midText = t.nextWeek; }
                } else if (specificText) {
                  bgClass = "bg-green-100";
                }

                if (specificText) {
                  content = specificText;
                }
              }
            }

            return (
              <div 
                key={i} 
                onClick={() => handleCellClick(i)}
                className={`border-r border-b border-brown-light/20 h-12 md:h-14 flex flex-col p-1 relative
                  ${bgClass} ${isCurrentMonth && (mode === "PRACTICE_DAYS" || mode === "PRACTICE_DATES") ? "cursor-pointer hover:bg-orange-50" : ""}
                `}
              >
                {date && (
                  <span className={`font-bold text-sm md:text-base transition-opacity ${isSat ? "text-blue-600" : isSun ? "text-red-600" : "text-brown-dark"} ${content ? "opacity-20" : ""}`}>
                    {date}
                  </span>
                )}
                {content && (
                  <div className="absolute inset-0 flex items-center justify-center p-1 z-10 pointer-events-none">
                    <span className="text-[10px] md:text-xs text-center font-semibold leading-tight text-brown whitespace-pre-wrap">
                      {content}
                    </span>
                  </div>
                )}
                {showMidText && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 w-[300%] -ml-[100%] pointer-events-none">
                     <span className={`bg-green-600 text-white px-2 py-0.5 rounded text-xs opacity-90 ${midTextOffset}`}>{midText}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mode Controls */}
      <div className="w-full mt-4 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setMode("PRACTICE_DAYS")}
            className={`py-2 rounded font-semibold active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all border border-brown-light/30
              ${mode === "PRACTICE_DAYS" ? "bg-brown text-white" : "bg-white hover:bg-cream"}`}
          >
            {t.practiceDays}
          </button>
          <button 
            onClick={() => setMode("PRACTICE_DATES")}
            className={`py-2 rounded font-semibold active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all border border-brown-light/30
              ${mode === "PRACTICE_DATES" ? "bg-brown text-white" : "bg-white hover:bg-cream"}`}
          >
            {t.practiceDates}
          </button>
        </div>

        <button 
          onClick={toggleRandomDays}
          className={`w-full py-2 border rounded font-semibold active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all
            ${mode === "RANDOM_DAYS" && isRandomRunning ? "bg-red-500 text-white border-red-600" : "bg-green-100 hover:bg-green-200 text-green-900 border-green-300"}`}
        >
          {mode === "RANDOM_DAYS" && isRandomRunning ? "Stop" : t.randomDays}
        </button>

        <button 
          onClick={toggleRandomDates}
          className={`w-full py-2 border rounded font-semibold active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition-all
            ${mode === "RANDOM_DATES" && isRandomRunning ? "bg-red-500 text-white border-red-600" : "bg-orange-100 hover:bg-orange-200 text-orange-900 border-orange-300"}`}
        >
          {mode === "RANDOM_DATES" && isRandomRunning ? "Stop" : t.randomDates}
        </button>

          </div>

      {/* Random Interval Selector */}
        <div className="w-full flex items-center justify-between bg-white rounded p-2 px-4 shadow-sm border border-brown-light/30">
          <span className="font-bold text-brown-dark text-sm">
            {(t as any).interval || "待機秒数"}: {randomInterval}s
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setRandomInterval(p => Math.max(0.5, p - 0.5))}
              className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-lg text-2xl font-bold shadow-[0_3px_0_0_#4b5563] active:translate-y-1 active:shadow-none hover:bg-gray-500 transition-all leading-none"
            >
              -
            </button>
            <button 
              onClick={() => setRandomInterval(p => p + 0.5)}
              className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-lg text-2xl font-bold shadow-[0_3px_0_0_#4b5563] active:translate-y-1 active:shadow-none hover:bg-gray-500 transition-all leading-none"
            >
              +
            </button>
          </div>
        </div>

        {showInstructions && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" 
          onClick={() => setShowInstructions(false)}
        >
          <div 
            className="bg-cream w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col" 
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-brown text-white p-4 flex justify-between items-center">
              <h2 className="font-bold text-lg">{t.howToUse}</h2>
              <button 
                onClick={() => setShowInstructions(false)} 
                className="text-white hover:text-red-300 font-bold text-2xl leading-none px-2 active:scale-90 transition-transform"
              >
                &times;
              </button>
            </div>
            <div className="p-6 text-brown-dark text-sm space-y-4 max-h-[70vh] overflow-y-auto">
              {t.instructions.map((inst, idx) => (
                <div key={idx} className="border-b border-brown-light/30 pb-3 last:border-0 leading-relaxed font-medium">
                  {inst}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



import ClockApp from "./ClockApp";

export default function App() {
  const [view, setView] = useState<"CALENDAR" | "CLOCK">("CALENDAR");
  const [globalLang, setGlobalLang] = useState<Language>("VN");
  const [clockLang, setClockLang] = useState<Language>("JP");

  if (view === "CLOCK") {
    return <ClockApp onReturn={() => setView("CALENDAR")} initialLang={clockLang} onLangChange={setClockLang} />;
  }

  return <CalendarApp onGoToClock={() => setView("CLOCK")} globalLang={globalLang} setGlobalLang={setGlobalLang} />;
}
