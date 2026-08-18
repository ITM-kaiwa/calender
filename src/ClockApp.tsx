
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
  const readingStr = getClockReading(hours, minutes, lang, is12Hour);

  return (
    <div className="min-h-screen bg-amber-50 p-4 flex flex-col items-center select-none w-full max-w-lg mx-auto relative font-sans">
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setIs12Hour(!is12Hour)}
            className="px-3 py-1.5 bg-white border border-brown text-brown font-bold text-sm rounded shadow-sm hover:bg-brown-light hover:text-white transition-colors"
          >
            {is12Hour ? t[lang].mode12 : t[lang].mode24}
          </button>
          <button 
            onClick={() => setIsAnalog(!isAnalog)}
            className="px-3 py-1.5 bg-white border border-brown text-brown font-bold text-sm rounded shadow-sm hover:bg-brown-light hover:text-white transition-colors"
          >
            {isAnalog ? t[lang].digital : t[lang].analog}
          </button>
        </div>
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
        {isAnalog ? (
          <div 
            onClick={advanceTime}
            className="w-full max-w-[280px] md:max-w-[320px] aspect-square bg-white rounded-full shadow-xl flex items-center justify-center border-8 border-gray-800 relative cursor-pointer active:scale-[0.98] transition-transform mx-auto"
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
        )}

        <div className="min-h-[80px] w-full flex items-center justify-center text-center px-4">
          <div className="text-2xl md:text-3xl font-bold text-brown-dark leading-tight whitespace-pre-wrap break-words">
            {readingStr}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">
          <div className="w-full flex items-center justify-between bg-white/70 rounded-xl p-2 px-4 shadow-sm border border-brown-light/30">
            <span className="font-bold text-brown-dark text-sm">
              {t[lang].interval || "Interval"}: {randomInterval}s
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

