
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// 1. Update button styling
app = app.replace(/bg-brown text-cream/g, "bg-pink-100 text-brown-dark border border-pink-200");

// 2. Add thisWeekRange
const rangesCode = `  const lastWeek = new Date(todayDate); lastWeek.setDate(todayDate.getDate() - 7);
  const nextWeekD = new Date(todayDate); nextWeekD.setDate(todayDate.getDate() + 7);

  const lastWeekRange = getWeekRange(lastWeek);
  const nextWeekRange = getWeekRange(nextWeekD);`;

const newRangesCode = `  const lastWeek = new Date(todayDate); lastWeek.setDate(todayDate.getDate() - 7);
  const nextWeekD = new Date(todayDate); nextWeekD.setDate(todayDate.getDate() + 7);

  const lastWeekRange = getWeekRange(lastWeek);
  const thisWeekRange = getWeekRange(todayDate);
  const nextWeekRange = getWeekRange(nextWeekD);`;

app = app.replace(rangesCode, newRangesCode);

// 3. Add isThisWeek to loop
const isWeekCode = `const isLastWeek = mode === "SPECIFIC_DAY" && isInRange(year, month, date!, lastWeekRange);
              const isNextWeek = mode === "SPECIFIC_DAY" && isInRange(year, month, date!, nextWeekRange);`;

const newIsWeekCode = `const isLastWeek = mode === "SPECIFIC_DAY" && isInRange(year, month, date!, lastWeekRange);
              const isThisWeek = mode === "SPECIFIC_DAY" && isInRange(year, month, date!, thisWeekRange);
              const isNextWeek = mode === "SPECIFIC_DAY" && isInRange(year, month, date!, nextWeekRange);`;

app = app.replace(isWeekCode, newIsWeekCode);

// 4. Add thisWeek render logic
const thisWeekRender = `} else if (isLastWeek) {
                  bgClass = "bg-green-300/80";
                  if (col === 3) { showMidText = true; midText = t.lastWeek; } // Center of week
                } else if (isNextWeek) {`;

const newThisWeekRender = `} else if (isLastWeek) {
                  bgClass = "bg-green-300/80";
                  if (col === 3) { showMidText = true; midText = t.lastWeek; } // Center of week
                } else if (isThisWeek) {
                  bgClass = "bg-green-200/80";
                  if (col === 3) { showMidText = true; midText = (t as any).thisWeek || "今週\\nこんしゅう"; }
                } else if (isNextWeek) {`;

app = app.replace(thisWeekRender, newThisWeekRender);

// 5. Add This Year / This Month
const yearSpan = `<span className="text-lg font-bold text-brown-dark">{year}{lang === "EN" ? "" : t.year}</span>`;
const newYearSpan = `<div className="relative flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-brown-dark leading-none mt-1">{year}{lang === "EN" ? "" : t.year}</span>
              {mode === "SPECIFIC_DAY" && <span className="absolute top-6 bg-pink-100 border border-pink-200 text-brown-dark text-[10px] md:text-xs px-1 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max shadow-sm">{(t as any).thisYear}</span>}
            </div>`;

app = app.replace(yearSpan, newYearSpan);

const monthSpan = `<span className="text-lg font-bold text-brown-dark w-24 text-center">{t.monthNames[month - 1]}</span>`;
const newMonthSpan = `<div className="relative flex flex-col items-center justify-center w-24">
              <span className="text-lg font-bold text-brown-dark leading-none mt-1">{t.monthNames[month - 1]}</span>
              {mode === "SPECIFIC_DAY" && <span className="absolute top-6 bg-pink-100 border border-pink-200 text-brown-dark text-[10px] md:text-xs px-1 rounded whitespace-pre-wrap text-center leading-tight z-20 w-max shadow-sm">{(t as any).thisMonth}</span>}
            </div>`;

app = app.replace(monthSpan, newMonthSpan);

fs.writeFileSync("src/App.tsx", app);

