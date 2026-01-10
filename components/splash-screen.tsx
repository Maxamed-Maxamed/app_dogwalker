import { Image } from "expo-image";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function CustomSplashScreen() {
  const dot1 = useSharedValue(0.3);
  const dot2 = useSharedValue(0.3);
  const dot3 = useSharedValue(0.3);

  useEffect(() => {
    const animate = (val: SharedValue<number>, delay: number) => {
      val.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 500 }),
            withTiming(0.3, { duration: 500 }),
          ),
          -1,
          true,
        ),
      );
    };

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, [dot1, dot2, dot3]);

  const dot1Style = useAnimatedStyle(() => ({ opacity: dot1.value }));
  const dot2Style = useAnimatedStyle(() => ({ opacity: dot2.value }));
  const dot3Style = useAnimatedStyle(() => ({ opacity: dot3.value }));

  return (
    <View className="flex-1 bg-primary-600 items-center justify-center">
      {/* White Circle Logo Container */}
      <View className="bg-white rounded-full p-8 shadow-xl mb-6">
        <Image
          source={require("@/assets/images/dog-logo.png")}
          style={{ width: 80, height: 80 }}
          contentFit="contain"
        />
      </View>

      {/* App Name */}
      <Text className="text-white text-4xl mb-2 font-bold">DogWalker</Text>

      {/* Subtitle */}
      <Text className="text-white/80 text-lg mb-10">
        Professional Dog Walking
      </Text>

      {/* Animated Dots */}
      <View className="flex-row gap-x-2">
        <Animated.View
          style={dot1Style}
          className="w-2.5 h-2.5 bg-white rounded-full"
        />
        <Animated.View
          style={dot2Style}
          className="w-2.5 h-2.5 bg-white rounded-full"
        />
        <Animated.View
          style={dot3Style}
          className="w-2.5 h-2.5 bg-white rounded-full"
        />
      </View>
    </View>
  );
}
