import { RoleCard } from "@/components/RoleCard";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Fonts are loaded in _layout.tsx using expo-font's useFonts hook
// Available fonts: 'Poppins-Regular', 'Poppins-Bold', 'Poppins-SemiBold', 'Poppins-Medium', 'Poppins-Light'

export default function RoleSelectionScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = (role: "owner" | "walker") => {
    setIsLoading(true);

    console.log(`✅ Role selected: ${role}`);

    // TODO: Add AsyncStorage.setItem('userRole', role) here later for persistence

    // Navigate to appropriate splash screen
    if (role === "owner") {
      router.replace("/owner/splash");
    } else {
      router.replace("/walker/splash");
    }
  };

  return (
    <LinearGradient
      colors={
        colorScheme === "dark"
          ? ["#1e3a8a", "#1e40af", "#2563eb"]
          : ["#4F7CE8", "#5B8DEF", "#6FA3F5"]
      }
      className="flex-1"
      style={styles.container}
    >
      <SafeAreaView className="flex-1 px-6">
        {/* Logo */}
        <View className="items-center mt-8 mb-12">
          <Image
            source={require("@/assets/images/dog-logo.png")}
            className="w-24 h-24 rounded-2xl"
            resizeMode="contain"
          />
        </View>

        {/* Header */}
        <View className="items-center mb-12 px-4">
          <Text
            className="text-[34px] text-white text-center mb-3"
            style={styles.title}
          >
            Choose Your Role
          </Text>
          <Text
            className="text-[16px] text-white text-center opacity-95"
            style={styles.subtitle}
          >
            Select how you want to use DogWalker
          </Text>
        </View>

        {/* Role Cards */}
        <View className="gap-5 px-2 flex-1">
          {/* Dog Owner Card */}
          <RoleCard
            title="Dog Owner"
            subtitle="Find & book dog walkers"
            description="Book trusted dog walkers, track walks in real-time, and keep your furry friend happy and healthy."
            iconName="person.fill"
            iconColor="#5B8DEF"
            iconBackgroundColor="#D6E4FF"
            onPress={() => handleRoleSelection("owner")}
            disabled={isLoading}
          />

          {/* Dog Walker Card */}
          <RoleCard
            title="Dog Walker"
            subtitle="Earn money walking dogs"
            description="Set your schedule, walk adorable dogs, earn money, and build a reputation as a trusted walker."
            iconName="pawprint.fill"
            iconColor="#4CAF50"
            iconBackgroundColor="#C8E6C9"
            onPress={() => handleRoleSelection("walker")}
            disabled={isLoading}
          />

          {/* Bottom Text */}
          <Text
            className="text-white text-center text-[13px] opacity-90 mt-auto mb-6"
            style={styles.footerText}
          >
            You can switch roles anytime in settings
          </Text>
        </View>
      </SafeAreaView>

      {/* Loading Indicator */}
      {isLoading && (
        <View className="absolute inset-0 justify-center items-center bg-black/30">
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </LinearGradient>
  );
}

// Styles for custom fonts
const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  title: {
    fontFamily: "Poppins-Bold",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    letterSpacing: 0.3,
  },
  footerText: {
    fontFamily: "Poppins-Regular",
    letterSpacing: 0.2,
  },
});
