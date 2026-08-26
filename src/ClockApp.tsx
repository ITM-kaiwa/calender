import { useState, useEffect } from "react";
import { getClockReading } from "./clock-logic";
import { getTimePeriod, timePeriodWords } from "./timeperiod";
import type { Language } from "./i18n";

interface ClockAppProps {
  onReturn: () => void;
  initialLang: Language;
  onLangChange: (lang: Language) => void;
}

export default function ClockApp({ onReturn, initialLang, onLangChange }: ClockAppProps) {
  const [lang, setLang] = useState<Language>(initialLang);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [isRandoming, setIsRandoming] = useState(false);
  const [is12Hour, setIs12Hour] = useState(false);
  const [randomInterval, setRandomInterval] = useState(3.5);
  const [isAnalog, setIsAnalog] = useState(false);

  useEffect(() => {
    onLangChange(lang);
  }, [lang, onLangChange]);

  useEffect(() => {
    let interval: number | undefined;
    if (isRandoming) {
      interval = window.setInterval(() => {
        setHours(Math.floor(Math.random() * 24));
        setMinutes(Math.floor(Math.random() * 60));
      }, randomInterval * 1000);
    }
    return () => clearInterval(interval);
  }, [isRandoming, randomInterval]);

  const toggleRandom = () => setIsRandoming(!isRandoming);

  const advanceTime = () => {
    let m = minutes + 30;
    let h = hours;
    if (m >= 60) {
      m -= 60;
      h = (h + 1) % 24;
    }
    setMinutes(m);
    setHours(h);
  };

  // Translations for buttons and toggles
  const t = {
    JP: { random: "ランダム", back: "カレンダー", mode24: "24時間", mode12: "12時間 (AM/PM)", interval: "待機秒数", analog: "アナログ", digital: "デジタル" },
    VN: { random: "Ngẫu nhiên", back: "Lịch", mode24: "24 giờ", mode12: "12 giờ (AM/PM)", interval: "Thời gian chờ", analog: "Đồng hồ kim", digital: "Đồng hồ số" },
    EN: { random: "Random", back: "Calendar", mode24: "24-Hour", mode12: "12-Hour (AM/PM)", interval: "Interval", analog: "Analog", digital: "Digital" },
    CN: { random: "随机", back: "日历", mode24: "24小时", mode12: "12小时 (AM/PM)", interval: "等待秒数", analog: "模拟", digital: "数字" }
  };

  const pad = (n: number) => n.toString().padStart(2, "0");
  
  let displayHour = hours;
  let ampmStr = "";
  if (is12Hour) {
    displayHour = hours % 12;
    if (displayHour === 0) displayHour = 12;
    ampmStr = hours >= 12 ? "PM" : "AM";
  }
  
  const timeStr = `${pad(displayHour)}:${pad(minutes)}`;
  const readingStr = getClockReading(hours, minutes, lang, isAnalog ? true : is12Hour, isAnalog);

  const period = getTimePeriod(hours);
  const isGozen = hours < 12;
  const pw = timePeriodWords[lang];
  const periodOrder: (keyof typeof pw.periods)[] = ["shinya", "asa", "hiru", "yugata", "yoru"];

  const Chip = ({ icon, label, active }: { icon: string; label: string; active: boolean }) => (
    <div
      className={`flex flex-col items-center gap-0 px-2 py-1 rounded-lg border transition-all whitespace-pre-wrap text-center leading-tight ${
        active
          ? "bg-brown text-white border-brown shadow-[0_2px_0_0_rgba(0,0,0,0.2)] scale-105"
          : "bg-white/60 text-brown-dark/40 border-brown-light/20"
      }`}
    >
      <span className={`text-lg ${active ? "" : "opacity-40 grayscale"}`}>{icon}</span>
      <span className="text-[11px] font-bold">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50 p-4 flex flex-col items-center select-none w-full max-w-lg mx-auto relative font-sans">
      <div className="w-full flex justify-between items-center mb-3">
        <div className="flex gap-2 items-center">
          {!isAnalog && (
            <button 
              onClick={() => setIs12Hour(!is12Hour)}
              className="px-3 py-1.5 bg-white border border-brown text-brown font-bold text-sm rounded shadow-sm hover:bg-brown-dark hover:text-white active:scale-90 active:shadow-none transition-all"
            >
              {is12Hour ? t[lang].mode12 : t[lang].mode24}
            </button>
          )}
          <button 
            onClick={() => setIsAnalog(!isAnalog)}
            className="px-3 py-1.5 bg-white border border-brown text-brown font-bold text-sm rounded shadow-sm hover:bg-brown-dark hover:text-white active:scale-90 active:shadow-none transition-all"
          >
            {isAnalog ? t[lang].digital : t[lang].analog}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://itm-kaiwa.github.io/Random/index.html"
            title="Random Practice"
            aria-label="Random Practice"
            className="w-9 h-9 flex items-center justify-center bg-white border border-brown text-brown text-lg rounded shadow-sm hover:bg-brown-dark hover:text-white active:scale-90 active:shadow-none transition-all"
          >
            🔗
          </a>
          <select 
            className="bg-white border border-brown text-brown text-sm p-1.5 rounded shadow-sm outline-none cursor-pointer font-bold hover:bg-brown-dark hover:text-white active:scale-95 transition-all"
            value={lang} 
            onChange={(e) => setLang(e.target.value as Language)}
          >
            <option value="JP">日本語</option>
            <option value="EN">English</option>
            <option value="VN">Tiếng Việt</option>
            <option value="CN">中文</option>
          </select>
        </div>
      </div>

      <div className="w-full flex items-center gap-2 mb-3">
        <button
          onClick={toggleRandom}
          className={`flex-1 py-2.5 rounded-xl font-bold text-base shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none transition-all ${isRandoming ? "bg-red-500 text-white hover:bg-red-600 shadow-[0_4px_0_0_#991b1b]" : "bg-orange-400 text-white hover:bg-orange-500 shadow-[0_4px_0_0_#9a3412]"}`}
        >
          {isRandoming ? "Stop" : t[lang].random}
        </button>
        <div className="flex items-center gap-1.5 bg-white/70 rounded-xl px-2 py-1.5 shadow-sm border border-brown-light/30 shrink-0">
          <button
            onClick={() => setRandomInterval(p => Math.max(0.5, p - 0.5))}
            className="w-7 h-7 flex items-center justify-center bg-gray-400 text-white rounded-md text-base font-bold active:translate-y-0.5 hover:bg-gray-500 transition-all leading-none"
          >
            -
          </button>
          <span className="text-xs font-bold text-brown-dark w-9 text-center whitespace-nowrap">{randomInterval}s</span>
          <button
            onClick={() => setRandomInterval(p => p + 0.5)}
            className="w-7 h-7 flex items-center justify-center bg-gray-400 text-white rounded-md text-base font-bold active:translate-y-0.5 hover:bg-gray-500 transition-all leading-none"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center gap-3">
        {isAnalog ? (
          <div 
            onClick={advanceTime}
            className="w-full max-w-[165px] md:max-w-[200px] aspect-square bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-gray-800 relative cursor-pointer active:scale-[0.98] transition-transform mx-auto"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Minute Ticks */}
              {[...Array(60)].map((_, i) => {
                if (i % 5 === 0) return null;
                return (
                  <line 
                    key={`min-${i}`} 
                    x1="50" y1="0" x2="50" y2="6" 
                    stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" 
                    transform={`rotate(${i * 6}, 50, 50)`} 
                  />
                );
              })}
              
              {/* Hour Ticks */}
              {[...Array(12)].map((_, i) => (
                <line 
                  key={`hour-${i}`} 
                  x1="50" y1="0" x2="50" y2="12" 
                  stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" 
                  transform={`rotate(${i * 30}, 50, 50)`} 
                />
              ))}
              
              {/* Hour Hand */}
              <line x1="50" y1="50" x2="50" y2="28" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" transform={`rotate(${(hours % 12) * 30 + minutes * 0.5}, 50, 50)`} />
              
              {/* Minute Hand */}
              <line x1="50" y1="50" x2="50" y2="12" stroke="#000000" strokeWidth="3" strokeLinecap="round" transform={`rotate(${minutes * 6}, 50, 50)`} />
              
              {/* Center Dot */}
              <circle cx="50" cy="50" r="4" fill="#1f2937" />
            </svg>
          </div>
        ) : (
          <div
            onClick={advanceTime}
            className="w-full bg-black rounded-2xl shadow-xl px-8 py-3 flex flex-col items-center justify-center border-4 border-gray-800 relative cursor-pointer active:scale-[0.98] transition-transform"
          >
            {is12Hour && (
              <div className="absolute top-3 left-6 text-cyan-500 font-bold text-xl md:text-2xl" style={{ fontFamily: "\"Courier New\", Courier, monospace" }}>
                {ampmStr}
              </div>
            )}
            <div className="text-7xl md:text-8xl font-black text-cyan-200 tracking-wider" style={{ fontFamily: "\"Courier New\", Courier, monospace", textShadow: "0 0 10px rgba(165,243,252,0.5)" }}>
              {timeStr}
            </div>
          </div>
        )}

        <div className="min-h-[48px] w-full flex items-center justify-center text-center px-4">
          <div className="text-2xl md:text-3xl font-bold text-brown-dark leading-tight whitespace-pre-wrap break-words">
            {readingStr}
          </div>
        </div>

        <div className="w-full max-w-md flex flex-col gap-2 bg-white/70 rounded-xl p-2 border border-brown-light/30 shadow-sm">
          <div>
            <div className="text-xs font-bold text-brown-dark/60 mb-1 text-center">{pw.periodLabel}</div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {periodOrder.map((key) => (
                <Chip key={key} icon={pw.periods[key].icon} label={pw.periods[key].label} active={key === period} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-brown-dark/60 mb-1 text-center">{pw.relatedLabel}</div>
            <div className="flex flex-wrap justify-center gap-1.5">
              <Chip icon={pw.gozen.icon} label={pw.gozen.label} active={isGozen} />
              <Chip icon={pw.gogo.icon} label={pw.gogo.label} active={!isGozen} />
              <Chip icon={pw.kesa.icon} label={pw.kesa.label} active={period === "asa"} />
              <Chip icon={pw.konya.icon} label={pw.konya.label} active={period === "yoru" || period === "shinya"} />
              <Chip icon={pw.sakuban.icon} label={pw.sakuban.label} active={false} />
            </div>
            <div className="text-[10px] text-brown-dark/50 text-center mt-1 whitespace-pre-wrap">{pw.sakubanNote}</div>
          </div>
        </div>

        <button
          onClick={onReturn}
          className="w-full max-w-xs py-3 bg-brown text-cream rounded-xl font-bold text-lg shadow-[0_6px_0_0_#5a3a2a] hover:bg-brown-dark active:translate-y-1.5 active:shadow-none transition-all mt-2"
        >
          {t[lang].back}
        </button>
      </div>
    </div>
  );
}
