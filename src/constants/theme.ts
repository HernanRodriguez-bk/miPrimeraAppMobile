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

// ─── Tema Corporativo "La Tienda" (Tokens Centralizados) ─────────────────────

export const APP_THEME = {
  colors: {
    primary: '#2563EB',
    primaryDark: '#1357C5',
    primarySoft: '#EFF6FF',
    primaryTint: '#EAF3FF',
    primaryBorder: '#BFDBFE',
    success: '#16A34A',
    danger: '#DC2626',
    dangerSoft: '#FEE2E2',
    warning: '#D97706',
    background: '#F8FAFC',
    backgroundAlt: '#F4F6F8',
    surface: '#FFFFFF',
    surfaceMuted: '#F1F5F9',
    textPrimary: '#0F172A',
    textDark: '#0B1F3A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    textPlaceholder: '#94A3B8',
    border: '#E2E8F0',
    borderStrong: '#CBD5E1',
    white: '#FFFFFF',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
} as const;

/**
 * Formatea montos numéricos al formato monetario local de Argentina ($ es-AR)
 * evitando duplicación de lógica de presentación en tarjetas y pantallas.
 */
export function formatPriceARS(amount: number): string {
  return `$ ${amount.toLocaleString('es-AR')}`;
}

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
