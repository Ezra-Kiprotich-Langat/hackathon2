import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { fullName, email, password, confirmPassword } = formData;
    
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Supabase registration
      console.log('Registration attempt:', { fullName, email, password });
      
      // Simulate registration for now
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => router.push('/auth') }
        ]);
      }, 1000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Create Account</Text>
          <Text className="text-gray-600 text-center">
            Join SkillScore and start your learning journey
          </Text>
        </View>

        {/* Registration Form */}
        <View className="space-y-4">
          {/* Full Name Input */}
          <View>
            <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(value) => updateFormData('fullName', value)}
              autoComplete="name"
            />
          </View>

          {/* Email Input */}
          <View>
            <Text className="text-gray-700 font-medium mb-2">Email Address</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
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
              placeholder="Create a password (min. 6 characters)"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              secureTextEntry
              autoComplete="new-password"
            />
          </View>

          {/* Confirm Password Input */}
          <View>
            <Text className="text-gray-700 font-medium mb-2">Confirm Password</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              secureTextEntry
              autoComplete="new-password"
            />
          </View>

          {/* Terms and Conditions */}
          <View className="mt-4">
            <Text className="text-gray-600 text-sm text-center">
              By creating an account, you agree to our{' '}
              <Text className="text-blue-500 font-medium">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-blue-500 font-medium">Privacy Policy</Text>
            </Text>
          </View>

          {/* Register Button */}
          <TouchableOpacity 
            className={`py-4 px-6 rounded-lg mt-6 ${
              loading ? 'bg-gray-400' : 'bg-blue-500'
            }`}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Login Link */}
        <View className="items-center">
          <Text className="text-gray-600 mb-4">
            Already have an account?
          </Text>
          <Link href="/auth" asChild>
            <TouchableOpacity className="bg-gray-100 py-3 px-6 rounded-lg border border-gray-300">
              <Text className="text-gray-700 font-semibold">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Demo Note */}
        <View className="mt-8 p-4 bg-blue-50 rounded-lg">
          <Text className="text-blue-800 text-sm text-center">
            💡 Demo Mode: User registration will be implemented with Supabase
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}