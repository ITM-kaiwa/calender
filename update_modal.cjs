
const fs = require("fs");
let i18n = fs.readFileSync("src/i18n.ts", "utf8");

const inst = `[
      "\\"Nâng Cao\\"… Cho phép cài đặt ngôn ngữ học tập và thiết lập ngày bắt đầu của lịch.",
      "\\"Ngày cụ thể\\"… Hiển thị cách gọi/tên gọi của các ngày cụ thể.",
      "\\"Luyện Thứ\\"… Sau khi nhấn nút này, chọn một ô bất kỳ trên lịch để hiển thị tên của thứ trong tuần.",
      "\\"Luyện Ngày\\"… Sau khi nhấn nút này, chọn một ô bất kỳ trên lịch để hiển thị cách đọc của ngày đó.",
      "\\"Thứ Ngẫu Nhiên\\"… Nhấn giữ nút này cho đến khi chữ \\"Stop\\" xuất hiện, hệ thống sẽ chọn ngẫu nhiên một ô và hiển thị tên thứ sau vài giây.",
      "\\"Ngày Ngẫu Nhiên\\"… Nhấn giữ nút này cho đến khi chữ \\"Stop\\" xuất hiện, hệ thống sẽ chọn ngẫu nhiên một ô và hiển thị cách đọc ngày sau vài giây."
    ]`;

const instJP = `[
      "\\"Advanced\\"… 学習言語や週の始まりを設定できます。",
      "\\"特定日\\"… 特定の日の呼び方や名前を表示します。",
      "\\"曜日練習\\"… ボタンを押した後、カレンダーの任意のセルを選ぶと、その日の曜日名が表示されます。",
      "\\"日付呼び方練習\\"… ボタンを押した後、カレンダーの任意のセルを選ぶと、その日付の読み方が表示されます。",
      "\\"ランダム曜日練習\\"… \\"Stop\\" と表示されるまでボタンを押し続けると、ランダムにセルが選ばれ、数秒後に曜日名が表示されます。",
      "\\"ランダム日付練習\\"… \\"Stop\\" と表示されるまでボタンを押し続けると、ランダムにセルが選ばれ、数秒後に日付の読み方が表示されます。"
    ]`;

const instEN = `[
      "\\"Advanced\\"… Set the learning language and the start day of the week.",
      "\\"Specific Day\\"… Show names/readings of specific days.",
      "\\"Days Practice\\"… Click this button, then select any cell on the calendar to see the day of the week.",
      "\\"Dates Practice\\"… Click this button, then select any cell to see how to read that date.",
      "\\"Random Days\\"… Click and wait until \\"Stop\\" appears; it randomly selects a cell and shows the day name after a few seconds.",
      "\\"Random Dates\\"… Click and wait until \\"Stop\\" appears; it randomly selects a cell and shows the date reading after a few seconds."
    ]`;

const instCN = `[
      "\\"Advanced\\"… 允许设置学习语言和一周的开始日期。",
      "\\"特定日\\"… 显示特定日期的名称或读法。",
      "\\"星期练习\\"… 点击此按钮后，选择日历上的任意单元格以显示星期名称。",
      "\\"日期练习\\"… 点击此按钮后，选择日历上的任意单元格以显示日期的读法。",
      "\\"随机星期\\"… 点击直到显示 \\"Stop\\"，系统将随机选择一个单元格，并在几秒钟后显示星期名称。",
      "\\"随机日期\\"… 点击直到显示 \\"Stop\\"，系统将随机选择一个单元格，并在几秒钟后显示日期的读法。"
    ]`;

i18n = i18n.replace(
  /ui: "Giao diện",/,
  `howToUse: "Hướng dẫn sử dụng",\n    instructions: ${inst},\n    ui: "Giao diện",`
);

i18n = i18n.replace(
  /ui: "UI",/,
  `howToUse: "使い方",\n    instructions: ${instJP},\n    ui: "UI",`
);

// Second replacement for EN (which also has ui: "UI")
// We can use a more precise replacement
i18n = i18n.replace(
  /EN:\s*\{\s*ui: "UI",/,
  `EN: {\n    howToUse: "How to Use",\n    instructions: ${instEN},\n    ui: "UI",`
);

i18n = i18n.replace(
  /CN:\s*\{\s*ui: "UI",/,
  `CN: {\n    howToUse: "使用说明",\n    instructions: ${instCN},\n    ui: "UI",`
);

fs.writeFileSync("src/i18n.ts", i18n);

let app = fs.readFileSync("src/App.tsx", "utf8");

// Add showInstructions state
app = app.replace(
  "const [showAdvanced, setShowAdvanced] = useState(false);",
  "const [showAdvanced, setShowAdvanced] = useState(false);\n  const [showInstructions, setShowInstructions] = useState(false);"
);

// Add instruction button and group with advanced
app = app.replace(
  /<div className="flex justify-between items-center mb-6">\n\s*<h1 className="text-3xl font-black text-brown-dark tracking-tight">Calendar<\/h1>\n\s*<div className="relative" ref=\{advancedMenuRef\}>/g,
  `<div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-brown-dark tracking-tight">Calendar</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowInstructions(true)} 
            className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-none transition-all text-sm"
          >
            {t.howToUse}
          </button>
          <div className="relative" ref={advancedMenuRef}>`
);

// Add an extra </div> to close the gap-2 flex container
app = app.replace(
  /<\/div>\n\s*\{\/\* Year and Month Controls \*\/\}/g,
  `  </div>\n        </div>\n\n        {/* Year and Month Controls */}`
);

// Add the modal component at the end of the return statement
app = app.replace(
  /<\/div>\n\s*<\/div>\n\s*\);\n\}/g,
  `    </div>

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
}`
);

fs.writeFileSync("src/App.tsx", app);

