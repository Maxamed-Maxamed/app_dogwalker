// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

/**
 * Supported icon names (SF Symbols format).
 * Add your SF Symbols to Material Icons mappings in getIconName().
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
type IconSymbolName =
  | "house.fill"
  | "paperplane.fill"
  | "chevron.left.forwardslash.chevron.right"
  | "chevron.right"
  | "person.fill"
  | "pawprint.fill"
  | "bubble.left.fill";

// Safe icon name accessor to prevent object injection
const getIconName = (
  name: IconSymbolName,
): ComponentProps<typeof MaterialIcons>["name"] => {
  switch (name) {
    case "house.fill":
      return "home";
    case "paperplane.fill":
      return "send";
    case "chevron.left.forwardslash.chevron.right":
      return "code";
    case "chevron.right":
      return "chevron-right";
    case "person.fill":
      return "person";
    case "pawprint.fill":
      return "pets";
    case "bubble.left.fill":
      return "chat-bubble";
    default:
      return "help";
  }
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={getIconName(name)}
      style={style}
    />
  );
}
