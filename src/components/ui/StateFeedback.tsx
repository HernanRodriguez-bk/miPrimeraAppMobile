import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { APP_THEME } from '../../constants/theme';
import { AppButton } from './AppButton';

export interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={APP_THEME.colors.primary} />
      {message ? <Text style={styles.loadingText}>{message}</Text> : null}
    </View>
  );
}

export interface ErrorStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorState({
  message,
  actionLabel = 'Reintentar',
  onAction,
}: ErrorStateProps) {
  return (
    <View style={styles.center}>
      <Text style={styles.errorText}>{message}</Text>
      {onAction ? <AppButton label={actionLabel} onPress={onAction} size="md" /> : null}
    </View>
  );
}

export interface EmptyStateProps {
  emoji?: string;
  title?: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}

export function EmptyState({
  emoji,
  title,
  subtitle,
  actionLabel,
  onAction,
  compact = false,
}: EmptyStateProps) {
  return (
    <View style={[styles.center, compact && styles.compact]}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.subtitle}>{subtitle}</Text>
      {actionLabel && onAction ? (
        <AppButton label={actionLabel} onPress={onAction} size="md" style={styles.actionBtn} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  compact: {
    flex: 0,
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 12,
    color: APP_THEME.colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 15,
    color: APP_THEME.colors.danger,
    textAlign: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: APP_THEME.colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: APP_THEME.colors.textMuted,
    textAlign: 'center',
  },
  actionBtn: {
    marginTop: 18,
  },
});
