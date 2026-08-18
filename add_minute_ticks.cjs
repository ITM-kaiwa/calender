
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");

const oldTicks = `              {/* Ticks */}
              {[...Array(12)].map((_, i) => (
                <line 
                  key={i} 
                  x1="50" y1="5" x2="50" y2="15" 
                  stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" 
                  transform={\`rotate(\${i * 30}, 50, 50)\`} 
                />
              ))}`;

const newTicks = `              {/* Minute Ticks */}
              {[...Array(60)].map((_, i) => {
                if (i % 5 === 0) return null;
                return (
                  <line 
                    key={\`min-\${i}\`} 
                    x1="50" y1="5" x2="50" y2="10" 
                    stroke="#111827" strokeWidth="1.5" strokeLinecap="round" 
                    transform={\`rotate(\${i * 6}, 50, 50)\`} 
                  />
                );
              })}
              
              {/* Hour Ticks */}
              {[...Array(12)].map((_, i) => (
                <line 
                  key={\`hour-\${i}\`} 
                  x1="50" y1="5" x2="50" y2="15" 
                  stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" 
                  transform={\`rotate(\${i * 30}, 50, 50)\`} 
                />
              ))}`;

app = app.replace(oldTicks, newTicks);

fs.writeFileSync("src/ClockApp.tsx", app);
console.log("Done");

