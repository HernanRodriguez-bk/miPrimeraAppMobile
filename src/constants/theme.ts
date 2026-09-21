// ─── Expo Starter theme tokens ───────────────────────────────────────────────

export const Fonts = {
  mono: 'SpaceMono',
};

export const Spacing = {
  half: 4,
  one: 8,
  two: 12,
  three: 16,
  four: 24,
  five: 32,
};

export const MaxContentWidth = 800;

const sharedColors = {
  white: '#FFFFFF',
  black: '#000000',
};

export const Colors = {
  light: {
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    background: '#F9FAFB',
    backgroundElement: '#F3F4F6',
    backgroundSelected: '#E5E7EB',
    ...sharedColors,
  },
  dark: {
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    background: '#111827',
    backgroundElement: '#1F2937',
    backgroundSelected: '#374151',
    ...sharedColors,
  },
};

export type ThemeColor = keyof typeof Colors.light;

// ─── Cyber theme (pantallas personalizadas) ───────────────────────────────────

export const CYBER_THEME = {
  colors: {
    background: '#090A0F',
    cardBg: '#121620',
    border: '#1E293B',
    cyanNeon: '#00F0FF',
    greenNeon: '#39FF14',
    redNeon: '#FF0055',
    yellowNeon: '#FFB800',
    textPrimary: '#FFFFFF',
    textMuted: '#64748B',
  },
};