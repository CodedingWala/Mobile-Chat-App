import { Stack } from "expo-router";
import "../global.css"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

export default function RootLayout() {
  const client=new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <Stack />
    </QueryClientProvider>
  )
}
