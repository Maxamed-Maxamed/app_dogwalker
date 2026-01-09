import { CustomSplashScreen } from '@/components/splash-screen';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [fontsLoaded, fontError]);

  // Render custom splash screen until fonts are ready
  if (!fontsLoaded && !fontError) {
    return <CustomSplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            // Global animations
            animation: 'slide_from_right',
            // Customize animation speed
            animationDuration: 300,
          }}
        >
          {/* Entry point - handles routing logic */}
          <Stack.Screen 
            name="index" 
            options={{ 
              headerShown: false,
              // No animation on initial load
              animation: 'none',
            }} 
          />

          {/* Role selection screen */}
          <Stack.Screen 
            name="role-selection" 
            options={{ 
              headerShown: false,
              // Prevent going back to index
              gestureEnabled: false,
            }} 
          />

          {/* Dog Owner flow - all screens nested under owner/ */}
          <Stack.Screen 
            name="owner" 
            options={{ 
              headerShown: false,
              // Custom transition for role switch
              animation: 'fade',
            }} 
          />

          {/* Dog Walker flow - all screens nested under walker/ */}
          <Stack.Screen 
            name="walker" 
            options={{ 
              headerShown: false,
              // Custom transition for role switch
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