import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      {/* Header Section */}
      <View className="bg-primary-500 pt-12 pb-8 px-6 rounded-b-3xl">
        <Text className="text-white text-3xl font-bold">🐕 DogWalker</Text>
        <Text className="text-primary-100 text-lg mt-2">
          Find trusted walkers for your furry friend
        </Text>
      </View>

      {/* Main Content */}
      <View className="px-6 py-6">
        {/* Welcome Card */}
        <View className="bg-secondary-50 dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-sm">
          <View className="flex-row items-center gap-3">
            <Text className="text-2xl">👋</Text>
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Welcome!
            </Text>
          </View>
          <Text className="text-gray-600 dark:text-gray-300 mt-3">
            Your dog deserves the best walks. Let&apos; get started!
          </Text>
        </View>

        {/* Quick Actions */}
        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </Text>
        
        <View className="flex-row gap-4 mb-6">
          <Pressable className="flex-1 bg-primary-500 rounded-xl p-4 items-center active:bg-primary-600">
            <Text className="text-3xl mb-2">🔍</Text>
            <Text className="text-white font-semibold">Find Walker</Text>
          </Pressable>
          
          <Pressable className="flex-1 bg-secondary-500 rounded-xl p-4 items-center active:bg-secondary-600">
            <Text className="text-3xl mb-2">📅</Text>
            <Text className="text-white font-semibold">Book Walk</Text>
          </Pressable>
        </View>

        {/* Feature Cards */}
        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Features
        </Text>

        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-700">
          <View className="flex-row items-center gap-3">
            <View className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
              <Text className="text-xl">📍</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-900 dark:text-white">
                Live GPS Tracking
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-sm">
                Track your dogs walk in real-time
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-700">
          <View className="flex-row items-center gap-3">
            <View className="bg-secondary-100 dark:bg-secondary-900 p-3 rounded-full">
              <Text className="text-xl">⭐</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-900 dark:text-white">
                Verified Walkers
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-sm">
                Background-checked and reviewed
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-700">
          <View className="flex-row items-center gap-3">
            <View className="bg-accent-100 dark:bg-accent-900 p-3 rounded-full">
              <Text className="text-xl">💬</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-900 dark:text-white">
                In-App Messaging
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-sm">
                Chat directly with your walker
              </Text>
            </View>
          </View>
        </View>

        {/* Test Link */}
        <Link href="/modal" asChild>
          <Pressable className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mt-4 active:bg-gray-200 dark:active:bg-gray-600">
            <Text className="text-center text-gray-700 dark:text-gray-200 font-medium">
              Open Modal (Test Navigation)
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
