import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const AuthScreen = () => {

  return (
    <View className="flex-1 bg-surface-dark">
    

      <SafeAreaView className="flex-1">

        <View className="items-center pt-10">
         
          <Text className="text-4xl font-bold text-primary font-serif tracking-wider uppercase">
            Chat App
          </Text>
        </View>

        <View className="flex-1 justify-center items-center px-6">
         <View className="mt-6 items-center">
            <Text className="text-5xl font-bold text-foreground text-center font-sans">
              Connect & Chat
            </Text>
            <Text className="text-3xl font-bold text-primary font-mono">Seamlessly</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;