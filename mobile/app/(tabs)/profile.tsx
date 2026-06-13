// app/(tabs)/profile.tsx
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

const Profile = () => {
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const userDataStr = await SecureStore.getItemAsync('userData')
      if (userDataStr) {
        setUserData(JSON.parse(userDataStr))
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      Alert.alert('Error', 'Failed to load user data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true)
            try {
           
              await SecureStore.deleteItemAsync('token')
              await SecureStore.deleteItemAsync('userData')
              
              router.replace('/(auth)')
            } catch (error) {
              console.error('Logout error:', error)
              Alert.alert('Error', 'Failed to logout. Please try again.')
            } finally {
              setIsLoggingOut(false)
            }
          },
        },
      ],
      { cancelable: false }
    )
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    )
  }


  const getInitials = () => {
    if (!userData?.name) return '?'
    return userData.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
  
        <View className="bg-blue-600 pt-8 pb-12 rounded-b-3xl">
          <Text className="text-white text-2xl font-bold text-center">Profile</Text>
        </View>

       
        <View className="items-center -mt-10 mb-6">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center shadow-lg border-4 border-blue-600">
            <Text className="text-3xl font-bold text-blue-600">
              {getInitials()}
            </Text>
          </View>
        </View>

   
        <View className="bg-white rounded-xl mx-4 p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-4 pb-4 border-b border-gray-100">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="person-outline" size={20} color="#2563EB" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-xs">Full Name</Text>
              <Text className="text-gray-900 text-base font-semibold">
                {userData?.name || 'Not set'}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="mail-outline" size={20} color="#2563EB" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-xs">Email Address</Text>
              <Text className="text-gray-900 text-base font-semibold">
                {userData?.email || 'Not set'}
              </Text>
            </View>
          </View>
        </View>

   
        <View className="bg-white rounded-xl mx-4 p-4 shadow-sm">
          <TouchableOpacity 
            className="flex-row items-center py-3 border-b border-gray-100"
            onPress={() => Alert.alert('Coming Soon', 'Edit profile feature coming soon!')}
          >
            <Ionicons name="create-outline" size={22} color="#6B7280" />
            <Text className="flex-1 text-gray-700 text-base ml-3">Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center py-3 border-b border-gray-100"
            onPress={() => Alert.alert('Coming Soon', 'Privacy settings coming soon!')}
          >
            <Ionicons name="lock-closed-outline" size={22} color="#6B7280" />
            <Text className="flex-1 text-gray-700 text-base ml-3">Privacy & Security</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center py-3"
            onPress={() => Alert.alert('Coming Soon', 'App settings coming soon!')}
          >
            <Ionicons name="settings-outline" size={22} color="#6B7280" />
            <Text className="flex-1 text-gray-700 text-base ml-3">App Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

     
        <View className="mx-4 mt-8">
          <TouchableOpacity
            className={`bg-red-500 py-4 rounded-xl items-center flex-row justify-center ${
              isLoggingOut ? 'opacity-70' : 'active:bg-red-600'
            } shadow-md`}
            disabled={isLoggingOut}
            onPress={handleLogout}
          >
            {isLoggingOut ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={20} color="white" />
                <Text className="text-white font-bold text-base ml-2">Logout</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

       
        <Text className="text-center text-gray-400 text-xs mt-8 mb-4">
          ChatApp Version 1.0.0
        </Text>
      </SafeAreaView>
    </View>
  )
}

export default Profile