// app/chat/[id].tsx
import EmptyUI from "../../components/EmptyUI";
import MessageBubble from "../../components/MessageBubble";
import { useMessages } from "../../hooks/useMessages";
import { useSocketStore } from "../../lib/socket";
import { Message, MessageSender } from "../../types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetMe } from "../../hooks/useAuth";
import { BackIcon, SendIcon } from "../../lib/customeIcons";

type ChatParams = {
  id: string;
  participantId: string;
  name: string;
  avatar: string;
};

const ChatDetailScreen = () => {
  const { id: chatId, avatar, name, participantId } = useLocalSearchParams<ChatParams>();

  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const { data: currentUser } = GetMe();
  const { data: messages = [], isLoading: messagesLoading } = useMessages(chatId);

  const store = useSocketStore();

  const joinChat = store?.joinChat || (() => console.log("joinChat not available"));
  const leaveChat = store?.leaveChat || (() => console.log("leaveChat not available"));
  const sendMessage = store?.sendMessage || (() => console.log("sendMessage not available"));
  const isConnected = store?.isConnected || false;
  const onlineUsers = store?.onlineUsers || new Set<string>();

  const isOnline = participantId ? onlineUsers.has(participantId) : false;

 
  useEffect(() => {
    if (chatId && isConnected && joinChat) {
      joinChat(chatId);
    }

    return () => {
      if (chatId && leaveChat) {
        leaveChat(chatId);
      }
    };
  }, [chatId, isConnected]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (!messageText.trim() || isSending || !isConnected || !currentUser) {
      console.log("❌ Cannot send message:", {
        hasText: !!messageText.trim(),
        isSending,
        isConnected,
        hasCurrentUser: !!currentUser
      });
      return;
    }

    setIsSending(true);
    sendMessage(chatId, messageText.trim(), {
      _id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      avatar: currentUser.avatar,
    });
    setMessageText("");
    setIsSending(false);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // ✅ Loading states
  if (messagesLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-gray-500 mt-4">Loading messages...</Text>
      </View>
    );
  }

const storeState = useSocketStore.getState();
console.log("Socket store initialized:", {
  hasStore: !!store,
  isConnected: storeState?.isConnected,
  hasJoinChat: typeof storeState?.joinChat === 'function'
});


  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >

      <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "bottom"]}>
        {/* Header */}
        <View className="flex-row items-center px-4 py-2 bg-white border-b border-gray-100">
          <Pressable onPress={() => router.back()} className="p-2">
            <BackIcon size={24} color="#2563EB"/>
          </Pressable>

          <View className="flex-row items-center flex-1 ml-2">
            <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
              <Text className="text-blue-600 font-bold text-lg">
                {name?.charAt(0)?.toUpperCase() || '?'}
              </Text>
            </View>
            <View className="ml-3">
              <Text className="text-gray-900 font-semibold text-base" numberOfLines={1}>
                {name || 'User'}
              </Text>
              <Text className="text-gray-400 text-xs">
                {isConnected ? (isOnline ? "🟢 Online" : "⚫ Offline") : "🔌 Connecting..."}
              </Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        
          <View className="flex-1 bg-gray-50">
            {messages.length === 0 ? (
              <EmptyUI
                title="No messages yet"
                subtitle="Start the conversation!"
                iconName="chatbubbles-outline"
                iconColor="#9CA3AF"
                iconSize={64}
              />
            ) : (
              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}
                onContentSizeChange={() => {
                  scrollViewRef.current?.scrollToEnd({ animated: false });
                }}
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message: Message) => {
                  const senderId = (message.sender as MessageSender)._id;
                  const isFromMe = currentUser ? senderId === currentUser._id : false;
                  return <MessageBubble key={message._id}  message={message} isFromMe={isFromMe} />;
                })}
              </ScrollView>
            )}

            {/* Input Bar */}
            <View className="px-3 pb-3 pt-2 bg-white border-t border-gray-100">
              <View className="flex-row items-end bg-gray-50 rounded-3xl px-3 py-1.5 gap-2 justify-center">

                <TextInput
                  placeholder="Type a message"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 text-gray-900 text-base mb-2"
                  multiline
                  style={{ maxHeight: 100 }}
                  value={messageText}
                  onChangeText={setMessageText}
                  editable={!isSending}
                />

                <Pressable
                  className="w-8 h-8 rounded-full items-center justify-center bg-blue-600"
                  onPress={handleSend}
                  disabled={!messageText.trim() || isSending}
                >
                  {isSending ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                  <SendIcon size={18} color="#FFFFFF" />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatDetailScreen;