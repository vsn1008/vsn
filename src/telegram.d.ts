export {}; // Make this a module.

declare global {
  interface TelegramWebAppThemeParams {
    accent_color: string;
    bg_color: string;
    text_color: string;
    secondary_bg_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
  }

  interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  }

  interface TelegramInitDataUnsafe {
    user?: TelegramUser;
    hash: string;
    auth_date: string;
  }

  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramInitDataUnsafe;
    colorScheme: 'light' | 'dark';
    themeParams: TelegramWebAppThemeParams;
    isExpanded: boolean;
    platform: string;
    ready(): void;
    expand(): void;
    close(): void;
    onEvent(event: 'themeChanged' | 'mainButtonClicked', handler: () => void): void;
    offEvent(event: 'themeChanged' | 'mainButtonClicked', handler: () => void): void;
    MainButton: {
      text: string;
      color?: string;
      textColor?: string;
      isVisible: boolean;
      show(): void;
      hide(): void;
      onClick(handler: () => void): void;
      offClick(handler: () => void): void;
      setText(text: string): void;
      enable(): void;
      disable(): void;
    };
    sendData(data: string): void;
    HapticFeedback?: {
      impactOccurred(style: 'light' | 'medium' | 'heavy'): void;
    };
  }

  interface TelegramWindow extends Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }

  const window: TelegramWindow;
}
