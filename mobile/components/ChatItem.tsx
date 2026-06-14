import { Chat } from "../types";
import { Image } from "expo-image";
import { View, Text, Pressable } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { useSocketStore } from "../lib/socket";

const ChatItem = ({ chat, onPress }: { chat: Chat; onPress: () => void }) => {
  const participant = chat.participant;

  const { onlineUsers } = useSocketStore();

  const isOnline = onlineUsers?.has(participant._id);
  const getInitials = () => {
      if (!participant.name) return '?'
      return participant.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

  return (
    <Pressable className="flex-row items-center py-3 active:opacity-70 bg-white px-2 rounded-xl mb-2" onPress={onPress}>
    
      <View className="relative">
        <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
          <Text className="text-lg font-bold text-blue-600">
            {getInitials()}
          </Text>
        </View>
        {isOnline && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </View>

      
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-gray-900">
            {participant.name}
          </Text>
          {chat.lastMessageAt && (
            <Text className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(chat.lastMessageAt), { addSuffix: true })}
            </Text>
          )}
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <Text
            className="text-sm text-gray-500 flex-1 mr-3"
            numberOfLines={1}
          >
            {chat.lastMessage?.text || "No messages yet"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatItem;