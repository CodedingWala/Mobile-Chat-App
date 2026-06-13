import { Stack } from "expo-router";
import "../global.css"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import { useState } from "react";
export default function RootLayout() {
  const [client] = useState(() => new QueryClient());


  return (
     <QueryClientProvider client={client}>
      <Stack screenOptions={{headerShown:false}} >
        <Stack.Screen  name="(auth)" />
        <Stack.Screen  name="(tabs)" />
        <Stack.Screen  name="new-chat" />
      </Stack>
    </QueryClientProvider>
  )
}
