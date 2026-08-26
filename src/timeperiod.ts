import type { Language } from "./i18n";

export type TimePeriodKey = "shinya" | "asa" | "hiru" | "yugata" | "yoru";

export function getTimePeriod(hours: number): TimePeriodKey {
  if (hours < 5) return "shinya";
  if (hours < 10) return "asa";
  if (hours < 17) return "hiru";
  if (hours < 19) return "yugata";
  return "yoru";
}

export interface TimePeriodEntry {
  label: string;
  icon: string;
}

export interface TimePeriodTranslation {
  periodLabel: string;
  relatedLabel: string;
  sakubanNote: string;
  periods: Record<TimePeriodKey, TimePeriodEntry>;
  gozen: TimePeriodEntry;
  gogo: TimePeriodEntry;
  kesa: TimePeriodEntry;
  konya: TimePeriodEntry;
  sakuban: TimePeriodEntry;
}

export const timePeriodWords: Record<Language, TimePeriodTranslation> = {
  JP: {
    periodLabel: "時間帯",
    relatedLabel: "関連することば",
    sakubanNote: "※「昨晩・昨夜」は前の日の夜を指すことばです",
    periods: {
      shinya: { label: "深夜\nしんや", icon: "🌌" },
      asa: { label: "朝\nあさ", icon: "🌅" },
      hiru: { label: "昼\nひる", icon: "☀️" },
      yugata: { label: "夕方\nゆうがた", icon: "🌇" },
      yoru: { label: "夜・晩\nよる・ばん", icon: "🌙" },
    },
    gozen: { label: "午前\nごぜん", icon: "🌤️" },
    gogo: { label: "午後\nごご", icon: "🌆" },
    kesa: { label: "今朝\nけさ", icon: "🌅" },
    konya: { label: "今夜\nこんや", icon: "🌙" },
    sakuban: { label: "昨晩・昨夜\nさくばん・さくや", icon: "🌃" },
  },
  VN: {
    periodLabel: "Khung giờ trong ngày",
    relatedLabel: "Từ liên quan",
    sakubanNote: "※ \"Tối qua\" (昨晩・昨夜) chỉ buổi tối của ngày hôm trước",
    periods: {
      shinya: { label: "Đêm khuya", icon: "🌌" },
      asa: { label: "Buổi sáng", icon: "🌅" },
      hiru: { label: "Buổi trưa", icon: "☀️" },
      yugata: { label: "Buổi chiều tối", icon: "🌇" },
      yoru: { label: "Buổi tối", icon: "🌙" },
    },
    gozen: { label: "Buổi sáng (AM)", icon: "🌤️" },
    gogo: { label: "Buổi chiều (PM)", icon: "🌆" },
    kesa: { label: "Sáng nay", icon: "🌅" },
    konya: { label: "Tối nay", icon: "🌙" },
    sakuban: { label: "Tối qua", icon: "🌃" },
  },
  EN: {
    periodLabel: "Time of Day",
    relatedLabel: "Related Words",
    sakubanNote: "※ \"Last night\" (昨晩・昨夜) refers to the night before",
    periods: {
      shinya: { label: "Late Night", icon: "🌌" },
      asa: { label: "Morning", icon: "🌅" },
      hiru: { label: "Daytime", icon: "☀️" },
      yugata: { label: "Evening", icon: "🌇" },
      yoru: { label: "Night", icon: "🌙" },
    },
    gozen: { label: "AM (Morning)", icon: "🌤️" },
    gogo: { label: "PM (Afternoon)", icon: "🌆" },
    kesa: { label: "This Morning", icon: "🌅" },
    konya: { label: "Tonight", icon: "🌙" },
    sakuban: { label: "Last Night", icon: "🌃" },
  },
  CN: {
    periodLabel: "时间段",
    relatedLabel: "相关词汇",
    sakubanNote: "※「昨晚」(昨晩・昨夜) 指前一天的晚上",
    periods: {
      shinya: { label: "深夜", icon: "🌌" },
      asa: { label: "早上", icon: "🌅" },
      hiru: { label: "白天", icon: "☀️" },
      yugata: { label: "傍晚", icon: "🌇" },
      yoru: { label: "晚上", icon: "🌙" },
    },
    gozen: { label: "上午 (AM)", icon: "🌤️" },
    gogo: { label: "下午 (PM)", icon: "🌆" },
    kesa: { label: "今天早上", icon: "🌅" },
    konya: { label: "今晚", icon: "🌙" },
    sakuban: { label: "昨晚", icon: "🌃" },
  },
};
