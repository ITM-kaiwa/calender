
import { useState, useEffect, useRef } from "react";
import { translations } from "./i18n";
import type { Language } from "./i18n";

type Mode = "NONE" | "PRACTICE_DAYS" | "PRACTICE_DATES" | "RANDOM_DAYS" | "RANDOM_DATES" | "TIME_ATTACK" | "SPECIFIC_DAY";

function App() {
  const [lang, setLang] = useState<Language>("VN");
  const [startDay, setStartDay] = useState<"MONDAY" | "SUNDAY">("MONDAY");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [mode, setMode] = useState<Mode>("NONE");
  const [activeCellIndex, setActiveCellIndex] = useState<number | null>(null);
  
  // Time attack state
  const [isTimeAttackRunning, setIsTimeAttackRunning] = useState(false);
  const [timeAttackStep, setTimeAttackStep] = useState<"WAIT" | "SHOW">("WAIT");
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
    setIsTimeAttackRunning(false);
    if (timeAttackTimer.current) clearInterval(timeAttackTimer.current);
  }, [mode, currentDate]);

  // Time attack logic
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
  }, [mode, isTimeAttackRunning, firstDayIndex, daysInMonth]);

  const handleCellClick = (index: number) => {
    const isCurrentMonth = index >= firstDayIndex && index < firstDayIndex + daysInMonth;
    if (!isCurrentMonth) return;

    if (mode === "PRACTICE_DAYS" || mode === "PRACTICE_DATES") {
      setActiveCellIndex(index);
    }
  };

  const pickRandomDay = () => {
    setMode("RANDOM_DAYS");
    const randomIndex = firstDayIndex + Math.floor(Math.random() * daysInMonth);
    setActiveCellIndex(randomIndex);
  };

  const pickRandomDate = () => {
    setMode("RANDOM_DATES");
    const randomIndex = firstDayIndex + Math.floor(Math.random() * daysInMonth);
    setActiveCellIndex(randomIndex);
  };

  const toggleTimeAttack = () => {
    if (mode !== "TIME_ATTACK") {
      setMode("TIME_ATTACK");
      setIsTimeAttackRunning(true);
    } else {
      setIsTimeAttackRunning(!isTimeAttackRunning);
    }
  };

  const setSpecificDayMode = () => {
    setMode("SPECIFIC_DAY");
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
        <div className="relative">
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-3 py-1 bg-brown-light text-cream rounded shadow active:scale-95 transition"
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
            </div>
          )}
        </div>
      </div>

      {/* Calendar Area */}
      <div className="w-full bg-white rounded-xl shadow-md p-3 border border-brown-light/30">
        
        {/* Year and Month Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={prevYear} 
              className={`px-2 py-1 bg-brown/10 rounded hover:bg-brown/20 active:scale-95 transition group ${mode === "SPECIFIC_DAY" ? "bg-brown text-cream" : ""}`}
              title={t.lastYear}
            >
              {"<<"}
              {mode === "SPECIFIC_DAY" && <span className="absolute -top-8 left-0 bg-brown text-cream text-xs p-1 rounded whitespace-nowrap">{t.lastYear}</span>}
            </button>
            <span className="text-lg font-bold text-brown-dark">{year}{lang === "EN" ? "" : t.year}</span>
            <button 
              onClick={nextYear} 
              className={`px-2 py-1 bg-brown/10 rounded hover:bg-brown/20 active:scale-95 transition group relative ${mode === "SPECIFIC_DAY" ? "bg-brown text-cream" : ""}`}
              title={t.nextYear}
            >
              {">>"}
              {mode === "SPECIFIC_DAY" && <span className="absolute -top-8 right-0 bg-brown text-cream text-xs p-1 rounded whitespace-nowrap">{t.nextYear}</span>}
            </button>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
              onClick={prevMonth} 
              className={`px-3 py-1 bg-brown/10 rounded hover:bg-brown/20 active:scale-95 transition relative ${mode === "SPECIFIC_DAY" ? "bg-brown-dark text-cream" : ""}`}
              title={t.lastMonth}
            >
              {"<"}
              {mode === "SPECIFIC_DAY" && <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brown-dark text-cream text-xs p-1 rounded whitespace-nowrap">{t.lastMonth}</span>}
            </button>
            <span className="text-xl font-bold w-16 text-center">{month + 1}{lang === "EN" ? "" : t.month}</span>
            <button 
              onClick={nextMonth} 
              className={`px-3 py-1 bg-brown/10 rounded hover:bg-brown/20 active:scale-95 transition relative ${mode === "SPECIFIC_DAY" ? "bg-brown-dark text-cream" : ""}`}
              title={t.nextMonth}
            >
              {">"}
              {mode === "SPECIFIC_DAY" && <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brown-dark text-cream text-xs p-1 rounded whitespace-nowrap">{t.nextMonth}</span>}
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

            if (isCurrentMonth) {
              const specificText = mode === "SPECIFIC_DAY" ? getSpecificDayText(date!) : null;
              const isLastWeek = mode === "SPECIFIC_DAY" && isInRange(year, month, date!, lastWeekRange);
              const isNextWeek = mode === "SPECIFIC_DAY" && isInRange(year, month, date!, nextWeekRange);

              if (mode === "PRACTICE_DAYS" && activeCellIndex === i) {
                bgClass = "bg-red-100";
                content = fullDayLabels[col];
              } else if (mode === "PRACTICE_DATES" && activeCellIndex === i) {
                bgClass = "bg-orange-100";
                content = t.dateReadings[date! - 1];
              } else if (mode === "RANDOM_DAYS" && activeCellIndex === i) {
                bgClass = "bg-red-100";
                content = fullDayLabels[col];
              } else if (mode === "RANDOM_DATES" && activeCellIndex === i) {
                bgClass = "bg-blue-100";
                content = t.dateReadings[date! - 1];
              } else if (mode === "TIME_ATTACK" && activeCellIndex === i) {
                bgClass = "bg-yellow-100";
                if (timeAttackStep === "SHOW") {
                  content = t.dateReadings[date! - 1];
                }
              } else if (mode === "SPECIFIC_DAY") {
                if (specificText) {
                  bgClass = "bg-green-100";
                  content = specificText;
                } else if (isLastWeek) {
                  bgClass = "bg-green-300/80";
                  if (col === 3) { showMidText = true; midText = t.lastWeek; } // Center of week
                } else if (isNextWeek) {
                  bgClass = "bg-green-200/60";
                  if (col === 3) { showMidText = true; midText = t.nextWeek; } // Center of week
                }
              }
            }

            return (
              <div 
                key={i} 
                onClick={() => handleCellClick(i)}
                className={`border-r border-b border-brown-light/20 h-16 md:h-20 flex flex-col p-1 relative
                  ${bgClass} ${isCurrentMonth && (mode === "PRACTICE_DAYS" || mode === "PRACTICE_DATES") ? "cursor-pointer hover:bg-orange-50" : ""}
                `}
              >
                {date && (
                  <span className={`font-bold text-sm md:text-base ${isSat ? "text-blue-600" : isSun ? "text-red-600" : "text-brown-dark"}`}>
                    {date}
                  </span>
                )}
                {content && (
                  <div className="absolute inset-0 flex items-center justify-center p-1">
                    <span className="text-[10px] md:text-xs text-center font-semibold leading-tight text-brown whitespace-pre-wrap">
                      {content}
                    </span>
                  </div>
                )}
                {showMidText && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 w-[300%] -ml-[100%] pointer-events-none">
                     <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs opacity-90">{midText}</span>
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
            className={`py-2 rounded font-semibold active:scale-95 transition shadow-sm border border-brown-light/30
              ${mode === "PRACTICE_DAYS" ? "bg-brown text-white" : "bg-white hover:bg-cream"}`}
          >
            {t.practiceDays}
          </button>
          <button 
            onClick={() => setMode("PRACTICE_DATES")}
            className={`py-2 rounded font-semibold active:scale-95 transition shadow-sm border border-brown-light/30
              ${mode === "PRACTICE_DATES" ? "bg-brown text-white" : "bg-white hover:bg-cream"}`}
          >
            {t.practiceDates}
          </button>
        </div>

        <button 
          onClick={pickRandomDay}
          className="w-full py-2 bg-green-100 hover:bg-green-200 text-green-900 border border-green-300 rounded font-semibold active:scale-[0.98] transition shadow-sm"
        >
          {t.randomDays}
        </button>

        <button 
          onClick={pickRandomDate}
          className="w-full py-2 bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-300 rounded font-semibold active:scale-[0.98] transition shadow-sm"
        >
          {t.randomDates}
        </button>
        
        <button 
          onClick={toggleTimeAttack}
          className={`w-full py-2 border rounded font-semibold active:scale-[0.98] transition shadow-sm
            ${isTimeAttackRunning ? "bg-red-500 text-white border-red-600" : "bg-yellow-100 hover:bg-yellow-200 text-yellow-900 border-yellow-300"}`}
        >
          {isTimeAttackRunning ? "Stop" : t.timeAttack}
        </button>

        <button 
          onClick={setSpecificDayMode}
          className={`w-full py-2 rounded font-semibold active:scale-[0.98] transition shadow-sm border border-brown-light/30
            ${mode === "SPECIFIC_DAY" ? "bg-brown text-white" : "bg-white hover:bg-cream"}`}
        >
          {t.specificDay}
        </button>

      </div>
    </div>
  );
}

export default App;
