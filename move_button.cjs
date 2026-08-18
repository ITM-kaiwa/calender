
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const btnBlock = `              <div className="flex flex-col gap-2 mt-4 mb-2">
                <button 
                  onClick={onGoToClock}
                  className="w-full py-1.5 bg-blue-500 text-white rounded font-bold shadow-[0_3px_0_0_#1e3a8a] active:translate-y-1 active:shadow-none transition-all text-sm hover:bg-blue-600"
                >
                  時計学習アプリ
                </button>
              </div>\n`;

app = app.replace(btnBlock, "");

const insertPoint = `                  </label>
                </div>
              </div>`;

const newInsert = `                  </label>
                </div>
              </div>
${btnBlock.replace(/\\n$/, "")}`;

app = app.replace(insertPoint, newInsert);
fs.writeFileSync("src/App.tsx", app);

