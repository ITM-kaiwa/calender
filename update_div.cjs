
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

const oldCode = `          )}
        </div>
      </div>

      {/* Calendar Area */}`;

const newCode = `          )}
        </div>
        </div>
      </div>

      {/* Calendar Area */}`;

app = app.split(oldCode).join(newCode);
fs.writeFileSync("src/App.tsx", app);

