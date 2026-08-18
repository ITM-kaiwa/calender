
const fs = require("fs");
let app = fs.readFileSync("src/ClockApp.tsx", "utf8");
app = app.replace(/import React, \{ useState, useEffect \} from "react";/, "import { useState, useEffect } from \"react\";");
app = app.replace(/import \{ Language \} from "\.\/i18n";/, "import type { Language } from \"./i18n\";");
fs.writeFileSync("src/ClockApp.tsx", app);

