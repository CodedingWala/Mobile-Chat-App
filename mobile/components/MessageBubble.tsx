import { Message } from "../types";
import { View, Text } from "react-native";

function MessageBubble({ message, isFromMe }: { message: Message; isFromMe: boolean }) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getSenderName = () => {
    if (isFromMe) return "You";
    if (typeof message.sender === 'object' && message.sender?.name) {
      return message.sender.name;
    }
    return "User";
  };

  return (
    <View className={`mb-4 ${isFromMe ? "items-end" : "items-start"}`}>
      {/* Sender Name - Darker for visibility */}
      <Text className={`text-xs font-medium ${isFromMe ? "text-blue-600 mr-2" : "text-gray-600 ml-2"}`}>
        {getSenderName()}
      </Text>
      
      {/* Message Row with Time */}
      <View className="flex-row items-end">
        {/* Message Bubble */}
        <View
          className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
            isFromMe
              ? "bg-blue-600 rounded-br-sm"
              : "bg-blue-100 rounded-bl-sm"
          }`}
        >
          <Text 
            className={`text-base ${isFromMe ? "text-white" : "text-gray-900"}`}
          >
            {message.text}
          </Text>
        </View>
        
        {/* Time - Consistent gray for both */}
        <Text className={`text-xs text-gray-400 ${isFromMe ? "ml-2" : "mr-2"}`}>
          {formatTime(message.createdAt)}
        </Text>
      </View>
    </View>
  );
}

export default MessageBubble;