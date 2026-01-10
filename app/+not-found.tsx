import { IconSymbol } from "@/components/ui/icon-symbol";
import { getColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  // Use safe helper function to prevent object injection
  const colors = getColors(colorScheme);
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        {/* Dog Icon */}
        <IconSymbol name="pawprint.fill" size={80} color={colors.icon} />

        {/* 404 Text */}
        <Text
          className="text-2xl font-bold mb-8 mt-4 text-center px-4"
          style={{ color: colors.muted }}
        >
          This screen doesn&apos;t exist.
        </Text>

        <Text
          className="text-lg text-center px-4 mb-4"
          style={{ color: colors.muted }}
        >
          Looks like this dog got lost! 🐕
        </Text>

        {/* Go Back Link */}
        <Link
          href="/"
          className="mt-4 px-4 py-2 rounded-lg"
          style={{ borderWidth: 1, borderColor: colors.border }}
        >
          <Text style={{ color: colors.text }}>Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}
