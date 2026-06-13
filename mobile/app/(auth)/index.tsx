// app/(auth)/login.tsx
import { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useLogin } from "../../hooks/useAuth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: loginMutation } = useLogin()

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      loginMutation({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert('Error', 'Failed to connect to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
        <KeyboardAvoidingView 
         behavior={Platform.OS === "ios" ? "padding" : "height"}
           style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
      <SafeAreaView className="flex-1">
         
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 justify-center px-6 py-10">
              <View className="items-center mb-8">
                <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                  <Ionicons name="chatbubbles" size={44} color="white" />
                </View>
                <Text className="text-3xl font-bold text-gray-900">ChatApp</Text>
                <Text className="text-gray-500 text-base mt-1">Connect with friends</Text>
              </View>

              <View className="mb-8">
                <Text className="text-2xl font-bold text-gray-900">Welcome back!</Text>
                <Text className="text-gray-600 text-base mt-1">
                  Sign in to continue chatting
                </Text>
              </View>

              <View className="gap-5">
                <View>
                  <Text className="text-gray-700 text-sm font-semibold mb-2 ml-1">
                    Email Address
                  </Text>
                  <View
                    className={`flex-row items-center bg-white rounded-xl border ${errors.email ? "border-red-400" : "border-gray-200"
                      } shadow-sm`}
                  >
                    <View className="pl-4">
                      <Ionicons name="mail-outline" size={20} color="#6B7280" />
                    </View>
                    <TextInput
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="you@example.com"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!isSubmitting}
                      className="flex-1 text-gray-900 px-3 py-4 text-base"
                    />
                  </View>
                  {errors.email && (
                    <Text className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</Text>
                  )}
                </View>

                <View>
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-gray-700 text-sm font-semibold ml-1">
                      Password
                    </Text>
                  </View>
                  <View
                    className={`flex-row items-center bg-white rounded-xl border ${errors.password ? "border-red-400" : "border-gray-200"
                      } shadow-sm`}
                  >
                    <View className="pl-4">
                      <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                    </View>
                    <TextInput
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      placeholder="Enter your password"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!isSubmitting}
                      className="flex-1 text-gray-900 px-3 py-4 text-base"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword((prev) => !prev)}
                      className="pr-4"
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#6B7280"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</Text>
                  )}
                </View>

                <TouchableOpacity
                  className={`bg-blue-600 py-4 rounded-xl items-center mt-4 ${isSubmitting ? 'opacity-70' : 'active:bg-blue-700'
                    } shadow-md`}
                  disabled={isSubmitting}
                  onPress={handleLogin}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text className="text-white font-bold text-base">Sign In</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-center mt-8 pt-4">
                <Text className="text-gray-600 text-base">New to ChatApp? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                  <Text className="text-blue-600 text-base font-bold">Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
      </SafeAreaView>
        </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;