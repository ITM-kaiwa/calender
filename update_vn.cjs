
const fs = require("fs");

let i18n = fs.readFileSync("src/i18n.ts", "utf8");

// Extract JP object
const jpMatch = i18n.match(/JP:\s*\{([\s\S]*?)\},\n  EN:/);
const jpContent = jpMatch[1];

const fieldsToCopy = [
  "lastMonth", "nextMonth", "lastYear", "nextYear",
  "today", "yesterday", "dayBeforeYesterday", "tomorrow", "dayAfterTomorrow",
  "lastWeek", "nextWeek",
  "days", "daysSunFirst", "daysFull", "daysFullSunFirst",
  "month", "monthNames", "year", "dateReadings"
];

let newVNContent = i18n.match(/VN:\s*\{([\s\S]*?)\},\n  JP:/)[1];

fieldsToCopy.forEach(field => {
  // Find field in JP
  // Using a regex to capture the field and its value. Note: dateReadings has an array spanning multiple lines.
  const fieldRegex = new RegExp(`\\n\\s*${field}:\\s*([\\s\\S]*?)(?:,(?=\\n\\s*[a-zA-Z]+:)|(?=\\n\\s*\\}$))`);
  const jpFieldMatch = jpContent.match(fieldRegex);
  if (jpFieldMatch) {
    const replacement = jpFieldMatch[0]; // Includes \n  field: value
    // Replace in VN
    const vnFieldRegex = new RegExp(`\\n\\s*${field}:\\s*([\\s\\S]*?)(?:,(?=\\n\\s*[a-zA-Z]+:)|(?=\\n\\s*\\}$))`);
    newVNContent = newVNContent.replace(vnFieldRegex, replacement);
  }
});

i18n = i18n.replace(/VN:\s*\{[\s\S]*?\},\n  JP:/, `VN: {${newVNContent}},\n  JP:`);
fs.writeFileSync("src/i18n.ts", i18n);

