
export function getClockReading(hours: number, minutes: number, lang: "JP"|"EN"|"VN"|"CN", is12Hour: boolean, hideAmPm: boolean = false): string {
  let displayHour = hours;
  let isPm = hours >= 12;
  if (is12Hour) {
    displayHour = hours % 12;
    if (displayHour === 0) displayHour = 12;
  }

  if (lang === "JP") {
    const h = ["れいじ", "いちじ", "にじ", "さんじ", "よじ", "ごじ", "ろくじ", "しちじ", "はちじ", "くじ", "じゅうじ", "じゅういちじ", "じゅうにじ", "じゅうさんじ", "じゅうよじ", "じゅうごじ", "じゅうろくじ", "じゅうしちじ", "じゅうはちじ", "じゅうくじ", "にじゅうじ", "にじゅういちじ", "にじゅうにじ", "にじゅうさんじ"];
    
    const mUnits = ["", "いっぷん", "にふん", "さんぷん", "よんぷん", "ごふん", "ろっぷん", "ななふん", "はっぷん", "きゅうふん"];
    const mTens = ["", "じゅっぷん", "にじゅっぷん", "さんじゅっぷん", "よんじゅっぷん", "ごじゅっぷん"];
    
    let mStr = "";
    if (minutes === 0) {
      mStr = "";
    } else {
      const ten = Math.floor(minutes / 10);
      const unit = minutes % 10;
      if (unit === 0) {
        mStr = mTens[ten];
      } else {
        const prefix = ten === 0 ? "" : (ten === 1 ? "じゅう" : (ten === 2 ? "にじゅう" : (ten === 3 ? "さんじゅう" : (ten === 4 ? "よんじゅう" : "ごじゅう"))));
        mStr = prefix + mUnits[unit];
      }
    }
    
    let timeStr = h[displayHour] + (mStr ? " " + mStr : "");
    if (is12Hour && !hideAmPm) {
      const ampm = isPm ? "ごご " : "ごぜん ";
      return ampm + timeStr;
    }
    return timeStr;
  }
  
  if (lang === "EN") {
    const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty"];
    
    let hStr = displayHour < 20 ? ones[displayHour] : tens[Math.floor(displayHour/10)] + (displayHour%10 === 0 ? "" : "-" + ones[displayHour%10]);
    let mStr = "";
    
    if (minutes === 0) {
      mStr = "o'clock";
    } else if (minutes < 10) {
      mStr = "oh " + ones[minutes];
    } else if (minutes < 20) {
      mStr = ones[minutes];
    } else {
      mStr = tens[Math.floor(minutes/10)] + (minutes%10 === 0 ? "" : "-" + ones[minutes%10]);
    }
    
    let timeStr = hStr + " " + mStr;
    if (is12Hour && !hideAmPm) {
      return timeStr + (isPm ? " PM" : " AM");
    }
    return timeStr;
  }
  
  if (lang === "VN") {
    const ones = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười", "mười một", "mười hai"];
    let hStr = displayHour <= 10 ? ones[displayHour] : (displayHour < 20 ? "mười " + (displayHour===15?"lăm":ones[displayHour%10]) : "hai mươi" + (displayHour%10===0 ? "" : (displayHour%10===1?" mốt":(displayHour%10===4?" tư":(displayHour%10===5?" lăm":" "+ones[displayHour%10])))));
    if (displayHour === 11 || displayHour === 12) hStr = ones[displayHour];
    hStr += " giờ";
    
    let mStr = "";
    if (minutes === 0) mStr = "";
    else if (minutes < 10) mStr = "lẻ " + ones[minutes];
    else if (minutes <= 10) mStr = "mười";
    else if (minutes < 20) mStr = "mười " + (minutes===15?"lăm":ones[minutes%10]);
    else {
      const ten = Math.floor(minutes/10);
      const unit = minutes%10;
      mStr = ones[ten] + " mươi" + (unit===0 ? "" : (unit===1?" mốt":(unit===4?" tư":(unit===5?" lăm":" "+ones[unit]))));
    }
    
    let timeStr = hStr + (mStr ? " " + mStr : "");
    if (is12Hour && !hideAmPm) {
      // VN conventionally uses sáng, trưa, chiều, tối, đêm depending on the hour, but for simplicity we can use Sáng/Chiều
      const ampm = isPm ? "chiều" : "sáng";
      return timeStr + " " + ampm;
    }
    return timeStr;
  }
  
  if (lang === "CN") {
    const zh = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
    let hStr = "";
    if (displayHour === 2) hStr = "两点";
    else if (displayHour <= 12) hStr = zh[displayHour] + "点";
    else if (displayHour < 20) hStr = "十" + (displayHour%10===0?"":zh[displayHour%10]) + "点";
    else hStr = "二十" + (displayHour%10===0?"":zh[displayHour%10]) + "点";
    
    let mStr = "";
    if (minutes === 0) mStr = "整";
    else if (minutes < 10) mStr = "零" + zh[minutes] + "分";
    else if (minutes === 10) mStr = "十分";
    else if (minutes < 20) mStr = "十" + zh[minutes%10] + "分";
    else {
      const ten = Math.floor(minutes/10);
      const unit = minutes%10;
      mStr = zh[ten] + "十" + (unit===0 ? "" : zh[unit]) + "分";
    }
    
    let timeStr = hStr + mStr;
    if (is12Hour && !hideAmPm) {
      const ampm = isPm ? "下午 " : "上午 ";
      return ampm + timeStr;
    }
    return timeStr;
  }
  
  return "";
}

