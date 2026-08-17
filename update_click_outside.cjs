
const fs = require("fs");
let app = fs.readFileSync("src/App.tsx", "utf8");

// Add advancedMenuRef
app = app.replace(
  "const [showAdvanced, setShowAdvanced] = useState(false);",
  "const [showAdvanced, setShowAdvanced] = useState(false);\n  const advancedMenuRef = useRef<HTMLDivElement>(null);\n\n  useEffect(() => {\n    const handleClickOutside = (event: MouseEvent) => {\n      if (advancedMenuRef.current && !advancedMenuRef.current.contains(event.target as Node)) {\n        setShowAdvanced(false);\n      }\n    };\n    if (showAdvanced) {\n      document.addEventListener(\"mousedown\", handleClickOutside);\n    }\n    return () => document.removeEventListener(\"mousedown\", handleClickOutside);\n  }, [showAdvanced]);"
);

// Add ref to the advanced menu div
app = app.replace(
  "<div className=\"relative\">",
  "<div className=\"relative\" ref={advancedMenuRef}>"
);

fs.writeFileSync("src/App.tsx", app);

