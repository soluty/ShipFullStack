import type { Locale } from "@/paraglide/runtime";

interface WebConfig {
  i18n: {
    locales: Record<Locale, { flag: string; name: string; locale: Locale }>;
  };
}

export const webConfig: WebConfig = {
  i18n: {
    locales: {
      en: {
        flag: "🇺🇸",
        name: "English",
        locale: "en",
      },
      zh: {
        flag: "🇨🇳",
        name: "中文",
        locale: "zh",
      },
    },
  },
};
