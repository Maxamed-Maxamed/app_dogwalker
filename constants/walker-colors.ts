/**
 * Walker Theme Colors - Green/Orange theme for Dog Walkers
 * Can be used with both NativeWind/Tailwind and StyleSheet
 */

// Walker color values
const walkerTintColorLight = '#16a34a';
const walkerTintColorDark = '#4ade80';

// Walker Colors Object (for StyleSheet usage)
export const WalkerColors = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    tint: walkerTintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: walkerTintColorLight,
    accent: '#f97316', // Orange accent for earnings
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: walkerTintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: walkerTintColorDark,
    accent: '#fb923c', // Light orange accent
  },
};

// For tailwind.config.js
export const walkerTheme = {
  colors: {
    walker: {
      // Primary tint colors
      tint: {
        light: walkerTintColorLight,
        dark: walkerTintColorDark,
      },
      // Text colors
      text: {
        light: '#11181C',
        dark: '#ECEDEE',
      },
      // Background colors
      background: {
        light: '#ffffff',
        dark: '#151718',
      },
      // Icon colors
      icon: {
        light: '#687076',
        dark: '#9BA1A6',
      },
      // Tab icon colors
      tabIconDefault: {
        light: '#687076',
        dark: '#9BA1A6',
      },
      tabIconSelected: {
        light: walkerTintColorLight,
        dark: walkerTintColorDark,
      },
      // Accent colors
      accent: {
        light: '#f97316',
        dark: '#fb923c',
      },
    },
  },
};

// NativeWind className utilities for Walker theme
export const walkerStyles = {
  light: {
    // Text
    text: 'text-[#11181C]',
    textMuted: 'text-[#687076]',
    
    // Background
    background: 'bg-white',
    
    // Tint/Primary (Green)
    tint: 'text-[#16a34a]',
    tintBg: 'bg-[#16a34a]',
    
    // Icon
    icon: 'text-[#687076]',
    iconSelected: 'text-[#16a34a]',
    
    // Border
    border: 'border-[#687076]',
    borderTint: 'border-[#16a34a]',
    
    // Accent colors for earnings/success
    accent: 'text-[#f97316]', // Orange accent
    accentBg: 'bg-[#f97316]',
  },
  dark: {
    // Text
    text: 'text-[#ECEDEE]',
    textMuted: 'text-[#9BA1A6]',
    
    // Background
    background: 'bg-[#151718]',
    
    // Tint/Primary (Light Green)
    tint: 'text-[#4ade80]',
    tintBg: 'bg-[#4ade80]',
    
    // Icon
    icon: 'text-[#9BA1A6]',
    iconSelected: 'text-[#4ade80]',
    
    // Border
    border: 'border-[#9BA1A6]',
    borderTint: 'border-[#4ade80]',
    
    // Accent colors for earnings/success
    accent: 'text-[#fb923c]', // Light orange accent
    accentBg: 'bg-[#fb923c]',
  },
};

// Helper function to get walker colors for StyleSheet
export const getWalkerColors = (colorScheme: 'light' | 'dark') => {
  return WalkerColors[colorScheme];
};

// Helper function to get walker styles for NativeWind
export const getWalkerStyles = (colorScheme: 'light' | 'dark') => {
  return walkerStyles[colorScheme];
};

// Usage examples:
/*
// For StyleSheet:
import { getWalkerColors } from '@/constants/walker-colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

const colorScheme = useColorScheme();
const colors = getWalkerColors(colorScheme);

<View style={{ backgroundColor: colors.background }}>
  <Text style={{ color: colors.text }}>Welcome Walker!</Text>
  <Text style={{ color: colors.accent }}>$245.00 earned</Text>
</View>

// For NativeWind:
import { getWalkerStyles } from '@/constants/walker-colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

const colorScheme = useColorScheme();
const styles = getWalkerStyles(colorScheme);

<View className={styles.background}>
  <Text className={styles.text}>Welcome Walker!</Text>
  <Text className={styles.accent}>$245.00 earned</Text>
</View>
*/