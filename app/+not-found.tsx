import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
    const colors = Colors[colorScheme]; // ✅ Simple and clean
  return (  
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View className="flex-1 items-center justify-center">
        {/* Dog Icon */}
        <IconSymbol 
          name="pawprint.fill" 
          size={80} 
          color={colors.icon}           
        />
        
        {/* 404 Text */}
        <Text className="text-[#11181C] text-2xl font-bold mb-8">
          This screen doesn&apos;t exist.
        </Text>
        
        <Text className="text-[#11181C] text-lg">
          Looks like this dog got lost! 🐕
        </Text>
        
        {/* Go Back Link */}
        <Link href="/"  className="text-[#11181C]">
          <Text className="text-[#11181C]">
            Go to home screen
          </Text>
        </Link>
      </View>
    </>
  );
}
