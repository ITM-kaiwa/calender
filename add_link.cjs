
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const oldCode = `<div className="flex flex-col gap-2 mt-4 mb-2">
                  <button 
                    onClick={onGoToClock}
                    className="w-full py-1.5 bg-blue-500 text-white rounded font-bold shadow-[0_3px_0_0_#1e3a8a] active:translate-y-1 active:shadow-none transition-all text-sm hover:bg-blue-600"
                  >
                    時計学習アプリ
                  </button>
                </div>`;

const newCode = `<div className="flex flex-col gap-2 mt-4 mb-2">
                  <button 
                    onClick={onGoToClock}
                    className="w-full py-1.5 bg-blue-500 text-white rounded font-bold shadow-[0_3px_0_0_#1e3a8a] active:translate-y-1 active:shadow-none transition-all text-sm hover:bg-blue-600"
                  >
                    時計学習アプリ
                  </button>
                  <a 
                    href="https://itm-kaiwa.github.io/Random/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 bg-green-500 text-white rounded font-bold shadow-[0_3px_0_0_#14532d] active:translate-y-1 active:shadow-none transition-all text-sm hover:bg-green-600 text-center block"
                  >
                    数字練習アプリ
                  </a>
                </div>`;

app = app.replace(oldCode, newCode);
fs.writeFileSync("src/App.tsx", app);
console.log("Done");

