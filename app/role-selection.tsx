import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { Href, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleSelection() {
  const router = useRouter();

  const handleSelectOwner = () => {
    // Navigate to owner flow
    router.push('/owner/(onboarding)/welcome' as unknown as Href);
  };

  const handleSelectWalker = () => {
    // Navigate to walker flow
    router.push('/walker/(onboarding)/welcome' as unknown as Href);
  };

  return (
    <View className="flex-1 bg-primary-600">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center px-6 py-10 justify-between">
          
          <View className="w-full items-center">
            {/* Logo Section */}
            <View className="items-center mt-4 mb-10">
              <Image
                source={require('@/assets/images/dog-logo.png')}
                style={{ width: 100, height: 100 }}
                contentFit="contain"
              />
            </View>

            {/* Title Section */}
            <View className="items-center mb-10">
              <Text className="text-white text-3xl font-bold mb-3">Choose Your Role</Text>
              <Text className="text-white/90 text-[17px] text-center px-4">
                Select how you want to use DogWalker
              </Text>
            </View>

            {/* Cards Section */}
            <View className="w-full gap-y-6">
              
              {/* Dog Owner Card */}
              <Pressable 
                onPress={handleSelectOwner}
                style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}
                className="bg-white rounded-[32px] p-6 shadow-sm"
              >
                <View className="flex-row items-center mb-4">
                  <View className="bg-blue-50/80 p-4 rounded-2xl mr-4">
                    <IconSymbol name="person.fill" size={30} color="#2563eb" />
                  </View>
                  <View>
                    <Text className="text-[20px] font-bold text-gray-900">Dog Owner</Text>
                    <Text className="text-gray-500 font-medium">Find & book dog walkers</Text>
                  </View>
                </View>
                <Text className="text-gray-600 leading-[22px] text-[15px]">
                  Book trusted dog walkers, track walks in real-time, and keep your furry friend happy and healthy.
                </Text>
              </Pressable>

              {/* Dog Walker Card */}
              <Pressable 
                onPress={handleSelectWalker}
                style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}
                className="bg-white rounded-[32px] p-6 shadow-sm"
              >
                <View className="flex-row items-center mb-4">
                  <View className="bg-green-50/80 p-4 rounded-2xl mr-4">
                    <IconSymbol name="pawprint.fill" size={30} color="#16a34a" />
                  </View>
                  <View>
                    <Text className="text-[20px] font-bold text-gray-900">Dog Walker</Text>
                    <Text className="text-gray-500 font-medium">Earn money walking dogs</Text>
                  </View>
                </View>
                <Text className="text-gray-600 leading-[22px] text-[15px]">
                  Set your schedule, walk adorable dogs, earn money, and build a reputation as a trusted professional.
                </Text>
              </Pressable>

            </View>
          </View>

          {/* Footer Section */}
          <View className="pb-4">
            <Text className="text-white/70 text-sm font-medium">
              You can switch roles anytime in settings
            </Text>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}
