import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons";

// import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SecureStore from 'expo-secure-store';


const TabLayout = () => {
 const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await SecureStore.getItem("user");
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  if (true) { <Redirect href={"/(auth)"} /> }
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#0D0D0F",
        borderTopColor: "#1A1A1D",
        borderTopWidth: 1,
        height: 88,
        padding: 8
      },
      tabBarActiveTintColor: "#A261F4",
      tabBarInactiveTintColor: "#C7ACF9",
      tabBarLabelStyle: { fontSize: 16, fontWeight: "600" },


    }}>
      <Tabs.Screen name='index' options={{
        title: "Chats",
        tabBarIcon: ({ color, focused, size }) => (
          <Ionicons
            name={focused ? "chatbubbles" : "chatbubbles-outline"} size={size} color={color}
          />
        )
      }} />
      <Tabs.Screen name='profile' options={{
        title: "profile",
        tabBarIcon: ({ color, focused, size }) => (
          <Ionicons
            name={focused ? "person" : "person-outline"} size={size} color={color}
          />
        )
      }} />
    </Tabs>
  )
}

export default TabLayout