import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/expo'

const AuthLayout = () => {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) { return null }
  if (isSignedIn) return <Redirect href={"/(tabs)"} />
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0D0D0F" } }}>
      <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
      <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
    </Stack>
  )
}

export default AuthLayout