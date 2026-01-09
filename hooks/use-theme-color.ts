/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { getColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ColorName = 'text' | 'background' | 'tint' | 'icon' | 'tabIconDefault' | 'tabIconSelected';

// Safe color accessor to prevent object injection
const getColorValue = (colors: ReturnType<typeof getColors>, colorName: ColorName): string => {
  switch (colorName) {
    case 'text':
      return colors.text;
    case 'background':
      return colors.background;
    case 'tint':
      return colors.tint;
    case 'icon':
      return colors.icon;
    case 'tabIconDefault':
      return colors.tabIconDefault;
    case 'tabIconSelected':
      return colors.tabIconSelected;
    default:
      return colors.text; // Safe fallback
  }
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
) {
  const theme = useColorScheme() ?? 'light';
  
  // Safe access for props using explicit checks
  const colorFromProps = theme === 'light' ? props.light : props.dark;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    const colors = getColors(theme);
    return getColorValue(colors, colorName);
  }
}
