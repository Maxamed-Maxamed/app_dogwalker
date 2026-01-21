import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import "../global.css";
import { useColorScheme } from '@/hooks/use-color-scheme';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load custom fonts if needed
  const [fontsLoaded, fontError] = useFonts({
    // Add your custom fonts here
    // 'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),#
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render anything until fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
          }}
        >
          {/* Entry point - handles routing logic */}
          <Stack.Screen 
            name="index" 
            options={{ 
              headerShown: false,
              animation: 'none',
            }} 
          />

          {/* Role selection screen */}
          <Stack.Screen 
            name="role-selection" 
            options={{ 
              headerShown: false,
              gestureEnabled: false,
            }} 
          />

          {/* Dog Owner flow */}
          <Stack.Screen 
            name="owner" 
            options={{ 
              headerShown: false,
              animation: 'fade',
            }} 
          />

          {/* Dog Walker flow */}
          <Stack.Screen 
            name="walker" 
            options={{ 
              headerShown: false,
              animation: 'fade',
            }} 
          />

          {/* 404 - Not Found */}
          <Stack.Screen 
            name="+not-found" 
            options={{ 
              headerShown: false,
            }} 
          />
        </Stack>

        {/* Status bar styling based on theme */}
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}