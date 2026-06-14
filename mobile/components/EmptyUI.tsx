import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { ChatBubbleIcon } from "../lib/customeIcons";

type EmptyUIProps = {
  title: string;
  subtitle?: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
  iconSize?: number;
  buttonLabel?: string;
  onPressButton?: () => void;
};

function EmptyUI({
  title,
  subtitle,
  iconName = "chatbubbles-outline",
  iconColor = "#9CA3AF",
  iconSize = 64,
  buttonLabel,
  onPressButton,
}: EmptyUIProps) {
  return (
    <View className="flex-1 items-center justify-center py-20">
      {iconName && <ChatBubbleIcon  size={iconSize} color={iconColor} />}
      <Text className="text-gray-500 text-lg mt-4">{title}</Text>
      {subtitle ? <Text className="text-gray-400 text-sm mt-1">{subtitle}</Text> : null}
      {buttonLabel && onPressButton ? (
        <Pressable className="mt-6 bg-blue-600 px-6 py-3 rounded-lg" onPress={onPressButton}>
          <Text className="text-white font-semibold">{buttonLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default EmptyUI;