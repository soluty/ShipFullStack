interface WebConfig {
  i18n: {
    locales: Record<string, { flag: string; name: string; locale: string }>;
  };
}

export const webConfig: WebConfig = {
  i18n: {
    locales: {},
  },
};
