import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Supabase authentication
      console.log('Login attempt:', { email, password });
      
      // Simulate login for now
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => router.push('/') }
        ]);
      }, 1000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</Text>
          <Text className="text-gray-600 text-center">
            Sign in to continue your learning journey
          </Text>
        </View>

        {/* Login Form */}
        <View className="space-y-4">
          {/* Email Input */}
          <View>
            <Text className="text-gray-700 font-medium mb-2">Email Address</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-gray-700 font-medium mb-2">Password</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="self-end">
            <Text className="text-blue-500 font-medium">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity 
            className={`py-4 px-6 rounded-lg mt-6 ${
              loading ? 'bg-gray-400' : 'bg-blue-500'
            }`}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Register Link */}
        <View className="items-center">
          <Text className="text-gray-600 mb-4">
            Don't have an account?
          </Text>
          <Link href="/auth/register" asChild>
            <TouchableOpacity className="bg-gray-100 py-3 px-6 rounded-lg border border-gray-300">
              <Text className="text-gray-700 font-semibold">Create Account</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Demo Note */}
        <View className="mt-8 p-4 bg-blue-50 rounded-lg">
          <Text className="text-blue-800 text-sm text-center">
            💡 Demo Mode: Authentication will be implemented with Supabase
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}