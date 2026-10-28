import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { APP_THEME } from '../../constants/theme';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAccessory?: React.ReactNode;
}

export function ScreenHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAccessory,
}: ScreenHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    router.back();
  };

  if (showBack) {
    return (
      <View style={styles.stackHeader}>
        <Pressable onPress={handleBack} hitSlop={8} style={styles.sideSlot}>
          <Text style={styles.backBtn}>&larr; Volver</Text>
        </Pressable>
        <View style={styles.centerSlot}>
          <Text style={styles.stackTitle} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.stackSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View style={[styles.sideSlot, styles.rightAlign]}>{rightAccessory}</View>
      </View>
    );
  }

  return (
    <View style={styles.tabHeader}>
      <View style={styles.tabTitleGroup}>
        <Text style={styles.tabTitle}>{title}</Text>
        {subtitle ? <Text style={styles.tabSubtitle}>{subtitle}</Text> : null}
      </View>
      {rightAccessory ? <View>{rightAccessory}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: APP_THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: APP_THEME.colors.border,
  },
  tabTitleGroup: {
    flex: 1,
    paddingRight: 12,
  },
  tabTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: APP_THEME.colors.textPrimary,
  },
  tabSubtitle: {
    fontSize: 12,
    color: APP_THEME.colors.textMuted,
    marginTop: 2,
  },
  stackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: APP_THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: APP_THEME.colors.border,
  },
  sideSlot: {
    minWidth: 72,
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  centerSlot: {
    flex: 1,
    alignItems: 'center',
  },
  backBtn: {
    color: APP_THEME.colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  stackTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: APP_THEME.colors.textPrimary,
  },
  stackSubtitle: {
    fontSize: 11,
    color: APP_THEME.colors.textMuted,
    marginTop: 2,
  },
});

