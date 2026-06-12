import { Stack } from "expo-router";
import "../global.css"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
export default function RootLayout() {
  const client=new QueryClient()


  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

  return (
   <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
     <QueryClientProvider client={client}>
      <Stack screenOptions={{headerShown:false}} >
        <Stack.Screen  name="(auth)" />
        <Stack.Screen  name="(tabs)" />
      </Stack>
    </QueryClientProvider>
   </ClerkProvider>
  )
}
