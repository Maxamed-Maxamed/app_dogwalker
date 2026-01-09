import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Custom useColorScheme hook that provides a non-null color scheme value
 * Defaults to 'light' if the system color scheme is undefined
 * 
 * @returns 'light' | 'dark' - Never returns null/undefined
 */
export function useColorScheme(): 'light' | 'dark' {
  const colorScheme = useRNColorScheme();
  
  // Default to 'light' if colorScheme is null/undefined
  return colorScheme ?? 'light';
}