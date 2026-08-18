
import { useState, useEffect } from "react";
import { getClockReading } from "./clock-logic";
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

  useEffect(() => {
    onLangChange(lang);
  }, [lang, onLangChange]);

  useEffect(() => {
    let interval: number | undefined;
    if (isRandoming) {
      interval = window.setInterval(() => {
        setHours(Math.floor(Math.random() * 24));
        setMinutes(Math.floor(Math.random() * 60));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isRandoming]);

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
    JP: { random: "ランダム", back: "カレンダー", mode24: "24時間", mode12: "12時間 (AM/PM)" },
    VN: { random: "Ngẫu nhiên", back: "Lịch", mode24: "24 giờ", mode12: "12 giờ (AM/PM)" },
    EN: { random: "Random", back: "Calendar", mode24: "24-Hour", mode12: "12-Hour (AM/PM)" },
    CN: { random: "随机", back: "日历", mode24: "24小时", mode12: "12小时 (AM/PM)" }
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
  const readingStr = getClockReading(hours, minutes, lang, is12Hour);

  return (
    <div className="min-h-screen bg-amber-50 p-4 flex flex-col items-center select-none w-full max-w-lg mx-auto relative font-sans">
      <div className="w-full flex justify-between items-center mb-8">
        <button 
          onClick={() => setIs12Hour(!is12Hour)}
          className="px-3 py-1.5 bg-white border border-brown text-brown font-bold text-sm rounded shadow-sm hover:bg-brown-light hover:text-white transition-colors"
        >
          {is12Hour ? t[lang].mode12 : t[lang].mode24}
        </button>
        <select 
          className="bg-white border border-brown text-brown text-sm p-1.5 rounded shadow-sm outline-none cursor-pointer font-bold"
          value={lang} 
          onChange={(e) => setLang(e.target.value as Language)}
        >
          <option value="JP">日本語</option>
          <option value="EN">English</option>
          <option value="VN">Tiếng Việt</option>
          <option value="CN">中文</option>
        </select>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center gap-8 mt-4">
        <div 
          onClick={advanceTime}
          className="w-full bg-black rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center border-4 border-gray-800 relative cursor-pointer active:scale-[0.98] transition-transform"
        >
          {is12Hour && (
            <div className="absolute top-4 left-6 text-cyan-500 font-bold text-xl md:text-2xl" style={{ fontFamily: "\"Courier New\", Courier, monospace" }}>
              {ampmStr}
            </div>
          )}
          <div className="text-7xl md:text-8xl font-black text-cyan-200 tracking-wider mt-4" style={{ fontFamily: "\"Courier New\", Courier, monospace", textShadow: "0 0 10px rgba(165,243,252,0.5)" }}>
            {timeStr}
          </div>
        </div>

        <div className="min-h-[80px] w-full flex items-center justify-center text-center px-4">
          <div className="text-2xl md:text-3xl font-bold text-brown-dark leading-tight whitespace-pre-wrap break-words">
            {readingStr}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">
          <button
            onClick={toggleRandom}
            className={`w-full py-4 rounded-xl font-bold text-xl shadow-[0_6px_0_0_rgba(0,0,0,0.2)] active:translate-y-1.5 active:shadow-none transition-all ${isRandoming ? "bg-red-500 text-white hover:bg-red-600 shadow-[0_6px_0_0_#991b1b]" : "bg-blue-500 text-white hover:bg-blue-600 shadow-[0_6px_0_0_#1e3a8a]"}`}
          >
            {isRandoming ? "Stop" : t[lang].random}
          </button>

          <button
            onClick={onReturn}
            className="w-full py-3 bg-brown text-cream rounded-xl font-bold text-lg shadow-[0_6px_0_0_#5a3a2a] hover:bg-brown-dark active:translate-y-1.5 active:shadow-none transition-all mt-4"
          >
            {t[lang].back}
          </button>
        </div>
      </div>
    </div>
  );
}

