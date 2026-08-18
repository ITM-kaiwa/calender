
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");

// We need to replace the two buttons for interval adjustment
const oldBtnMinus = `className="w-8 h-8 flex items-center justify-center bg-brown-light text-white rounded-lg font-bold shadow-[0_3px_0_0_#5a3a2a] active:translate-y-1 active:shadow-none hover:bg-brown transition-all"`;
const oldBtnPlus = `className="w-8 h-8 flex items-center justify-center bg-brown-light text-white rounded-lg font-bold shadow-[0_3px_0_0_#5a3a2a] active:translate-y-1 active:shadow-none hover:bg-brown transition-all"`;

const newBtn = `className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-lg text-2xl font-bold shadow-[0_3px_0_0_#4b5563] active:translate-y-1 active:shadow-none hover:bg-gray-500 transition-all leading-none"`;

app = app.replace(oldBtnMinus, newBtn);
app = app.replace(oldBtnPlus, newBtn);

fs.writeFileSync("src/ClockApp.tsx", app);

