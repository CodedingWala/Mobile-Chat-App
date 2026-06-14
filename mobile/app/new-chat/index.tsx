
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserItem from "../../components/UserItem";
import { Chat, User } from "../../types";
import { useGetOrCreateChat, useUsers } from "../../hooks/useUser";
import { FilledCircleXIcon, PersonOutlineIcon, SearchOutlineIcon } from "../../lib/customeIcons";
import { useSocketStore } from "../../lib/socket";

const NewChatScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allUsers, isLoading } = useUsers();
  const { mutate: getOrCreateChat, isPending: isCreatingChat } = useGetOrCreateChat();
  const { onlineUsers } = useSocketStore();

  const users = allUsers?.filter((u) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return u.name?.toLowerCase().includes(query) || u.email?.toLowerCase().includes(query);
  });

  const handleUserSelect = (user: User) => {
    getOrCreateChat(user._id, {
      onSuccess: (chat: Chat) => {
        router.dismiss();

        setTimeout(() => {
          router.push({
            pathname: "/chat/[id]",
            params: {
              id: chat._id,
              participantId: chat.participant._id,
              name: chat.participant.name,
              avatar: chat.participant.avatar,
            },
          });
        }, 100);
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-1 bg-gray-50">
        <View className="flex-1 bg-gray-50 rounded-t-3xl overflow-hidden">
     
          <View className="px-5 pt-3 pb-3 bg-white border-b border-gray-100 flex-row items-center">
            <Pressable
              className="w-9 h-9 rounded-full items-center justify-center mr-2 bg-gray-100"
              onPress={() => router.back()}
            >
              <FilledCircleXIcon  size={20} color="#6B7280" />
            </Pressable>

            <View className="flex-1">
              <Text className="text-gray-900 text-xl font-semibold">New chat</Text>
              <Text className="text-gray-500 text-xs mt-0.5">
                Search for a user to start chatting
              </Text>
            </View>
          </View>

          <View className="px-5 pt-3 pb-2 bg-gray-50">
            <View className="flex-row items-center bg-white rounded-full px-3 py-1.5 gap-2 border border-gray-200 shadow-sm">
              <SearchOutlineIcon size={18} color="#9CA3AF" />
              <TextInput
                placeholder="Search users"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-gray-900 text-sm"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View className="flex-1 bg-gray-50">
            {isCreatingChat || isLoading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#2563EB" />
              </View>
            ) : !users || users.length === 0 ? (
              <View className="flex-1 items-center justify-center px-5">
                <PersonOutlineIcon size={64} color="#D1D5DB" />
                <Text className="text-gray-500 text-lg mt-4">No users found</Text>
                <Text className="text-gray-400 text-sm mt-1 text-center">
                  Try a different search term
                </Text>
              </View>
            ) : (
              <ScrollView
                className="flex-1 px-5 pt-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
              >
                <Text className="text-gray-400 text-xs mb-3">USERS</Text>
                {users.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    isOnline={onlineUsers?.has(user._id)}
                    onPress={() => handleUserSelect(user)}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewChatScreen;