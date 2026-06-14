import { View, Text, ActivityIndicator, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, Tabs } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import { ChatBubbleIcon, PersonOutlineIcon } from '../../lib/customeIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const TabLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking token:", error);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-gray-500 mt-4">Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }} edges={['bottom']}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E5E7EB",
            borderTopWidth: 1,
            height: Platform.OS === 'ios' ? 83 : 60,
            paddingBottom: Platform.OS === 'ios' ? 20 : 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: "#2563EB",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
        }}
      >
        <Tabs.Screen 
          name='index' 
          options={{
            title: "Chats",
            tabBarIcon: ({ color, focused, size }) => (
              <ChatBubbleIcon size={size} color={focused? "#2563EB" :"#9CA3AF"  } focused={focused} />
            )
          }} 
        />
        <Tabs.Screen 
          name='profile' 
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused, size }) => (
              <PersonOutlineIcon size={size} color={focused? "#2563EB" :"#9CA3AF"  } />
            )
          }} 
        />
      </Tabs>
    </SafeAreaView>
  );
}

export default TabLayout;