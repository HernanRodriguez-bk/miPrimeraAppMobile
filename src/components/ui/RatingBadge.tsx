import { StyleSheet, Text } from 'react-native';
import { APP_THEME } from '../../constants/theme';

export interface RatingBadgeProps {
  rate: number;
  count: number;
  showLabel?: boolean;
}

export function RatingBadge({ rate, count, showLabel = false }: RatingBadgeProps) {
  return (
    <Text style={[styles.badge, showLabel && styles.badgeDetailed]}>
      ⭐ {rate} ({count}
      {showLabel ? ' opiniones' : ''})
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    color: APP_THEME.colors.warning,
    fontSize: 11,
    fontWeight: '700',
  },
  badgeDetailed: {
    fontSize: 13,
  },
});
