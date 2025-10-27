import { useEffect, useState } from 'react';

type Theme = {
  backgroundColor: string;
  textColor: string;
  secondaryBackgroundColor: string;
  accentColor: string;
  hintColor: string;
  linkColor: string;
  buttonColor: string;
  buttonTextColor: string;
};

type TelegramContext = {
  webApp: TelegramWebApp | null;
  theme: Theme;
  isTelegram: boolean;
};

const DEFAULT_THEME: Theme = {
  backgroundColor: '#0a1624',
  textColor: '#ffffff',
  secondaryBackgroundColor: '#111f33',
  accentColor: '#50a8eb',
  hintColor: '#9bb2d4',
  linkColor: '#62c4ff',
  buttonColor: '#50a8eb',
  buttonTextColor: '#0a1624'
};

function mapTheme(webApp: TelegramWebApp): Theme {
  const params = webApp.themeParams;
  return {
    backgroundColor: params.bg_color || DEFAULT_THEME.backgroundColor,
    textColor: params.text_color || DEFAULT_THEME.textColor,
    secondaryBackgroundColor: params.secondary_bg_color || DEFAULT_THEME.secondaryBackgroundColor,
    accentColor: params.accent_color || DEFAULT_THEME.accentColor,
    hintColor: params.hint_color || DEFAULT_THEME.hintColor,
    linkColor: params.link_color || DEFAULT_THEME.linkColor,
    buttonColor: params.button_color || DEFAULT_THEME.buttonColor,
    buttonTextColor: params.button_text_color || DEFAULT_THEME.buttonTextColor
  };
}

export function useTelegramWebApp(): TelegramContext {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    const instance = window.Telegram?.WebApp ?? null;
    if (!instance) {
      return;
    }

    instance.ready();
    if (!instance.isExpanded) {
      instance.expand();
    }

    setWebApp(instance);
    setTheme(mapTheme(instance));

    const handleThemeChange = () => setTheme(mapTheme(instance));

    instance.onEvent('themeChanged', handleThemeChange);

    return () => {
      instance.offEvent('themeChanged', handleThemeChange);
    };
  }, []);

  return {
    webApp,
    theme,
    isTelegram: Boolean(webApp)
  };
}
