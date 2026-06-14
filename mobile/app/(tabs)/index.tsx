import { Chat } from "../../types/index"
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import EmptyUI from "../../components/EmptyUI";
import ChatItem from "../../components/ChatItem";
import { UseChats } from "../../hooks/useChat";
import { CreateOutlineIcon } from "../../lib/customeIcons";
import { useEffect, useState } from "react";
import { useSocketStore } from "../../lib/socket";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatsTab = () => {
  const router = useRouter();
  const result = UseChats();
const {isConnected,socket}=useSocketStore()
const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
   useEffect(() => {
    if (isConnected) {
      setConnectionStatus('connected');
    } else if (socket?.connected === false || (!socket && !isConnected)) {
      setConnectionStatus('disconnected');
    } else {
      setConnectionStatus('connecting');
    }
  }, [isConnected, socket]);
  
  
  console.log("🟡 STATE:", JSON.stringify({
    isLoading: result.isLoading,
    isPending: result.isPending,
    isFetching: result.isFetching,
    status: result.status,
    chatsLength: result.data?.length,
    error: result.error?.message,
  }));
  
  if (result.isLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size={"large"} color={"#2563EB"} />
      </View>
    );
  }

  if (result.error) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-4">
        <Text className="text-red-500 text-lg mb-2">Failed to load chats</Text>
        <Pressable onPress={() => result.refetch()} className="mt-4 px-4 py-2 bg-blue-600 rounded-lg">
          <Text className="text-white font-semibold">Retry</Text>
        </Pressable>
      </View>
    );
  }

  const handleChatPress = (chat: Chat) => {
    router.push({
      pathname: "/chat/[id]",
      params: {
        id: chat._id,
        participantId: chat.participant._id,
        name: chat.participant.name,
        avatar: chat.participant.avatar,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={result.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ChatItem chat={item} onPress={() => handleChatPress(item)} />}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 }}
        ListHeaderComponent={ <Header connectionStatus={connectionStatus} />}
        ListEmptyComponent={
          <EmptyUI
            title="No chats yet"
            subtitle="Start a conversation!"
            iconName="chatbubbles-outline"
            iconColor="#9CA3AF"
            iconSize={64}
            buttonLabel="New Chat"
            onPressButton={() => router.push("/new-chat")}
          />
        }
      />
    </SafeAreaView>
  );
};

export default ChatsTab;

function Header({ connectionStatus }: { connectionStatus: 'connecting' | 'connected' | 'disconnected' }) {
  const router = useRouter();

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return '#10B981'; // Green
      case 'connecting':
        return '#F59E0B'; // Yellow/Amber
      case 'disconnected':
        return '#EF4444'; // Red
      default:
        return '#9CA3AF'; // Gray
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected';
      default:
        return '';
    }
  };

  return (
    <View className="px-5 pt-2 pb-4 bg-gray-50">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-gray-900">Chats</Text>
          <View className="flex-row items-center mt-1">
            <View 
              className="w-2 h-2 rounded-full mr-1.5"
              style={{ backgroundColor: getStatusColor() }}
            />
            <Text className="text-xs text-gray-500">
              socket {getStatusText()}
            </Text>
          </View>
        </View>
        <Pressable
          className="size-10 bg-blue-600 rounded-full items-center justify-center shadow-sm"
          onPress={() => router.push("/new-chat")}
        >
          <CreateOutlineIcon size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}