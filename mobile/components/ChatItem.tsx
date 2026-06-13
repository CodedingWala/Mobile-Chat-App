import { View, Text } from 'react-native'
import { Chat } from '../types'
import React from 'react'

const ChatItem = ({ chat, onPress }: { chat: Chat; onPress: () => void }) => {
  return (
    <View>
      <Text>ChatItem</Text>
    </View>
  )
}

export default ChatItem