import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type IconSymbolName =
  | "house.fill"
  | "paperplane.fill"
  | "chevron.left.forwardslash.chevron.right"
  | "chevron.right"
  | "person.fill"
  | "pawprint.fill"
  | "bubble.left.fill"
  | "figure.walk";

interface RoleCardProps {
  title: string;
  subtitle: string;
  description: string;
  iconName: IconSymbolName;
  iconColor: string;
  iconBackgroundColor: string;
  onPress: () => void;
  disabled?: boolean;
}

export function RoleCard({
  title,
  subtitle,
  description,
  iconName,
  iconColor,
  iconBackgroundColor,
  onPress,
  disabled = false,
}: RoleCardProps) {
  return (
    <Pressable
      className="bg-white dark:bg-gray-800 rounded-3xl p-7 items-center min-h-[200px] justify-center shadow-xl active:opacity-90 active:scale-[0.98]"
      style={styles.card}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-5"
        style={{ backgroundColor: iconBackgroundColor }}
      >
        <IconSymbol name={iconName} size={42} color={iconColor} />
      </View>
      <Text
        className="text-[22px] text-center mb-2 text-[#1F1F1F] dark:text-white"
        style={styles.title}
      >
        {title}
      </Text>
      <Text
        className="text-[14px] text-center mb-4 text-gray-600 dark:text-gray-300"
        style={styles.subtitle}
      >
        {subtitle}
      </Text>
      <Text
        className="text-[13px] text-center text-gray-600 dark:text-gray-400 leading-[20px] px-4"
        style={styles.description}
      >
        {description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
  },
  description: {
    fontFamily: "Poppins-Regular",
  },
});
