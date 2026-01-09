/**
 * Owner Theme Colors - Blue/Teal theme for Dog Owners
 * Can be used with both NativeWind/Tailwind and StyleSheet
 */

// Owner color values
const ownerTintColorLight = '#0a7ea4';
const ownerTintColorDark = '#4FB3D4';

// Owner Colors Object (for StyleSheet usage)
export const OwnerColors = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    tint: ownerTintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: ownerTintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: ownerTintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: ownerTintColorDark,
  },
};

// For tailwind.config.js
export const ownerTheme = {
  colors: {
    owner: {
      // Primary tint colors
      tint: {
        light: ownerTintColorLight,
        dark: ownerTintColorDark,
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
        light: ownerTintColorLight,
        dark: ownerTintColorDark,
      },
    },
  },
};

// NativeWind className utilities for Owner theme
export const ownerStyles = {
  light: {
    // Text
    text: 'text-[#11181C]',
    textMuted: 'text-[#687076]',
    
    // Background
    background: 'bg-white',
    
    // Tint/Primary
    tint: 'text-[#0a7ea4]',
    tintBg: 'bg-[#0a7ea4]',
    
    // Icon
    icon: 'text-[#687076]',
    iconSelected: 'text-[#0a7ea4]',
    
    // Border
    border: 'border-[#687076]',
    borderTint: 'border-[#0a7ea4]',
  },
  dark: {
    // Text
    text: 'text-[#ECEDEE]',
    textMuted: 'text-[#9BA1A6]',
    
    // Background
    background: 'bg-[#151718]',
    
    // Tint/Primary
    tint: 'text-[#4FB3D4]',
    tintBg: 'bg-[#4FB3D4]',
    
    // Icon
    icon: 'text-[#9BA1A6]',
    iconSelected: 'text-[#4FB3D4]',
    
    // Border
    border: 'border-[#9BA1A6]',
    borderTint: 'border-[#4FB3D4]',
  },
};

// Helper function to get owner colors for StyleSheet
export const getOwnerColors = (colorScheme: 'light' | 'dark') => {
  return OwnerColors[colorScheme];
};

// Helper function to get owner styles for NativeWind
export const getOwnerStyles = (colorScheme: 'light' | 'dark') => {
  return ownerStyles[colorScheme];
};

// Usage examples:
/*
// For StyleSheet:
import { getOwnerColors } from '@/constants/owner-colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

const colorScheme = useColorScheme();
const colors = getOwnerColors(colorScheme);

<View style={{ backgroundColor: colors.background }}>
  <Text style={{ color: colors.text }}>Welcome Owner!</Text>
</View>

// For NativeWind:
import { getOwnerStyles } from '@/constants/owner-colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

const colorScheme = useColorScheme();
const styles = getOwnerStyles(colorScheme);

<View className={styles.background}>
  <Text className={styles.text}>Welcome Owner!</Text>
</View>
*/