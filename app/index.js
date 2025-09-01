import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function HomePage() {
  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar style="light" />
      
      {/* Hero Section */}
      <View className="bg-blue-500 px-6 py-12">
        <View className="items-center">
          <Text className="text-4xl font-bold text-white mb-4">📖 SkillScore</Text>
          <Text className="text-lg text-blue-100 text-center mb-6">
            Transform your documents into interactive learning experiences
          </Text>
          <Text className="text-sm text-blue-200 text-center">
            Upload files • Generate questions • Test your knowledge
          </Text>
        </View>
      </View>

      {/* Features Section */}
      <View className="px-6 py-8">
        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
          How it works
        </Text>
        
        <View className="space-y-4">
          {/* Feature 1 */}
          <View className="flex-row items-center bg-gray-50 p-4 rounded-lg">
            <View className="bg-blue-500 w-10 h-10 rounded-full items-center justify-center mr-4">
              <Text className="text-white font-bold">1</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">Upload Your Files</Text>
              <Text className="text-gray-600 text-sm">PDF, DOCX, TXT, or Images</Text>
            </View>
          </View>

          {/* Feature 2 */}
          <View className="flex-row items-center bg-gray-50 p-4 rounded-lg">
            <View className="bg-green-500 w-10 h-10 rounded-full items-center justify-center mr-4">
              <Text className="text-white font-bold">2</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">AI Generates Questions</Text>
              <Text className="text-gray-600 text-sm">Powered by Google Gemini</Text>
            </View>
          </View>

          {/* Feature 3 */}
          <View className="flex-row items-center bg-gray-50 p-4 rounded-lg">
            <View className="bg-purple-500 w-10 h-10 rounded-full items-center justify-center mr-4">
              <Text className="text-white font-bold">3</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">Get Instant Feedback</Text>
              <Text className="text-gray-600 text-sm">Scores and detailed explanations</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="px-6 pb-8">
        <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
          Get Started
        </Text>
        
        <View className="space-y-3">
          {/* Upload Button */}
          <Link href="/upload" asChild>
            <TouchableOpacity className="bg-blue-500 py-4 px-6 rounded-lg shadow-sm">
              <Text className="text-white text-center font-semibold text-lg">
                📁 Upload Document
              </Text>
            </TouchableOpacity>
          </Link>

          {/* Auth Button */}
          <Link href="/auth" asChild>
            <TouchableOpacity className="bg-gray-100 py-4 px-6 rounded-lg border border-gray-300">
              <Text className="text-gray-700 text-center font-semibold text-lg">
                🔐 Sign In / Register
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* Footer */}
      <View className="bg-gray-100 px-6 py-6">
        <Text className="text-center text-gray-500 text-sm">
          SkillScore v1.0.0 • Built with React Native & Expo
        </Text>
      </View>
    </ScrollView>
  );
}