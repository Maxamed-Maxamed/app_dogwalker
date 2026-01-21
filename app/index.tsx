import { useColorScheme } from "@/hooks/use-color-scheme";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay for smooth transition
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner briefly
  if (!isReady) {
    return (
      <View
        className={`flex-1 justify-center items-center ${
          colorScheme === "dark" ? "bg-[#151718]" : "bg-white"
        }`}
      >
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#4FB3D4" : "#0a7ea4"}
        />
      </View>
    );
  }

  // Always go to role selection
  // TODO: Add AsyncStorage check here later for persistent role
  return <Redirect href="/role-selection" />;
}
