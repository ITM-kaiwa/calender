
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

app = app.replace(
  /時計学習アプリ[\r\n\s]*<\/button>/,
  `時計学習アプリ
                  </button>
                  <a 
                    href="https://itm-kaiwa.github.io/Random/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center py-1.5 bg-green-500 text-white rounded font-bold shadow-[0_3px_0_0_#14532d] active:translate-y-1 active:shadow-none transition-all text-sm hover:bg-green-600 text-center block"
                  >
                    数字練習アプリ
                  </a>`
);

fs.writeFileSync("src/App.tsx", app);
console.log(app.includes("数字練習アプリ") ? "SUCCESS" : "FAILED");

