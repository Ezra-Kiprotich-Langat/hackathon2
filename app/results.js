import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function ResultsScreen() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock results data
  const results = {
    score: 75,
    correctAnswers: 3,
    totalQuestions: 4,
    timeSpent: 480, // seconds
    difficulty: 'Medium',
    completedAt: new Date().toISOString(),
    topics: [
      { name: 'Cell Biology', correct: 2, total: 2, percentage: 100 },
      { name: 'Metabolism', correct: 1, total: 2, percentage: 50 }
    ],
    performance: {
      speed: 'Average', // Fast, Average, Slow
      accuracy: 'Good', // Excellent, Good, Needs Improvement
      consistency: 'Consistent' // Consistent, Variable
    },
    recommendations: [
      'Focus more on Metabolism concepts',
      'Practice more questions on cellular respiration',
      'Review the Krebs cycle process'
    ]
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getPerformanceIcon = (level) => {
    switch (level) {
      case 'Excellent': case 'Fast': case 'Consistent': return '🟢';
      case 'Good': case 'Average': case 'Variable': return '🟡';
      default: return '🔴';
    }
  };

  const renderOverview = () => (
    <View>
      {/* Main Score Card */}
      <View className={`rounded-lg p-6 mb-6 border ${getScoreBgColor(results.score)}`}>
        <View className="items-center">
          <Text className={`text-6xl font-bold mb-2 ${getScoreColor(results.score)}`}>
            {results.score}%
          </Text>
          <Text className="text-xl font-semibold text-gray-800 mb-1">
            {results.correctAnswers}/{results.totalQuestions} Correct
          </Text>
          <Text className="text-gray-600">
            {results.score >= 80 ? '🎉 Outstanding!' : 
             results.score >= 60 ? '👍 Well Done!' : '📚 Keep Practicing!'}
          </Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</Text>
        <View className="space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">⏱️ Time Spent</Text>
            <Text className="font-semibold text-gray-800">{formatTime(results.timeSpent)}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">📊 Difficulty</Text>
            <Text className="font-semibold text-gray-800">{results.difficulty}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">📅 Completed</Text>
            <Text className="font-semibold text-gray-800">
              {new Date(results.completedAt).toLocaleDateString()}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">⚡ Avg. per Question</Text>
            <Text className="font-semibold text-gray-800">
              {Math.round(results.timeSpent / results.totalQuestions)}s
            </Text>
          </View>
        </View>
      </View>

      {/* Performance Indicators */}
      <View className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Performance</Text>
        <View className="space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">Speed</Text>
            <View className="flex-row items-center">
              <Text className="mr-2">{getPerformanceIcon(results.performance.speed)}</Text>
              <Text className="font-semibold text-gray-800">{results.performance.speed}</Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">Accuracy</Text>
            <View className="flex-row items-center">
              <Text className="mr-2">{getPerformanceIcon(results.performance.accuracy)}</Text>
              <Text className="font-semibold text-gray-800">{results.performance.accuracy}</Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">Consistency</Text>
            <View className="flex-row items-center">
              <Text className="mr-2">{getPerformanceIcon(results.performance.consistency)}</Text>
              <Text className="font-semibold text-gray-800">{results.performance.consistency}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTopics = () => (
    <View>
      <Text className="text-lg font-semibold text-gray-800 mb-4">Topic Breakdown</Text>
      {results.topics.map((topic, index) => (
        <View key={index} className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-semibold text-gray-800">{topic.name}</Text>
            <Text className={`font-bold ${getScoreColor(topic.percentage)}`}>
              {topic.percentage}%
            </Text>
          </View>
          
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">Correct Answers</Text>
            <Text className="text-gray-800">{topic.correct}/{topic.total}</Text>
          </View>
          
          {/* Progress Bar */}
          <View className="bg-gray-200 h-2 rounded-full">
            <View 
              className={`h-2 rounded-full ${
                topic.percentage >= 80 ? 'bg-green-500' :
                topic.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${topic.percentage}%` }}
            />
          </View>
        </View>
      ))}
    </View>
  );

  const renderRecommendations = () => (
    <View>
      <Text className="text-lg font-semibold text-gray-800 mb-4">Recommendations</Text>
      <View className="bg-blue-50 rounded-lg p-4 mb-6">
        <Text className="text-blue-800 font-medium mb-3">💡 Areas for Improvement:</Text>
        {results.recommendations.map((recommendation, index) => (
          <View key={index} className="flex-row items-start mb-2">
            <Text className="text-blue-600 mr-2">•</Text>
            <Text className="text-blue-700 flex-1">{recommendation}</Text>
          </View>
        ))}
      </View>
      
      <View className="bg-green-50 rounded-lg p-4">
        <Text className="text-green-800 font-medium mb-3">🎯 Next Steps:</Text>
        <View className="space-y-2">
          <View className="flex-row items-start">
            <Text className="text-green-600 mr-2">•</Text>
            <Text className="text-green-700 flex-1">Upload more documents on weak topics</Text>
          </View>
          <View className="flex-row items-start">
            <Text className="text-green-600 mr-2">•</Text>
            <Text className="text-green-700 flex-1">Practice with harder difficulty levels</Text>
          </View>
          <View className="flex-row items-start">
            <Text className="text-green-600 mr-2">•</Text>
            <Text className="text-green-700 flex-1">Review explanations for incorrect answers</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-8 border-b border-gray-200">
        <Text className="text-3xl font-bold text-gray-800 mb-2">Quiz Results</Text>
        <Text className="text-gray-600">
          Detailed analysis of your performance
        </Text>
      </View>

      {/* Tab Navigation */}
      <View className="bg-white border-b border-gray-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
          <View className="flex-row space-x-6 py-4">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'topics', name: 'Topics', icon: '📚' },
              { id: 'recommendations', name: 'Tips', icon: '💡' }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                className={`pb-2 border-b-2 ${
                  selectedTab === tab.id ? 'border-blue-500' : 'border-transparent'
                }`}
                onPress={() => setSelectedTab(tab.id)}
              >
                <View className="flex-row items-center">
                  <Text className="mr-2">{tab.icon}</Text>
                  <Text className={`font-medium ${
                    selectedTab === tab.id ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {tab.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 py-6">
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'topics' && renderTopics()}
        {selectedTab === 'recommendations' && renderRecommendations()}
      </ScrollView>

      {/* Action Buttons */}
      <View className="bg-white px-6 py-4 border-t border-gray-200">
        <View className="space-y-3">
          <TouchableOpacity 
            className="bg-blue-500 py-4 px-6 rounded-lg"
            onPress={() => router.push('/questions')}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Practice More Questions
            </Text>
          </TouchableOpacity>
          
          <View className="flex-row space-x-3">
            <TouchableOpacity 
              className="flex-1 border border-gray-300 py-3 px-4 rounded-lg"
              onPress={() => router.push('/questions/review')}
            >
              <Text className="text-gray-700 text-center font-semibold">
                Review Answers
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 border border-gray-300 py-3 px-4 rounded-lg"
              onPress={() => router.push('/upload')}
            >
              <Text className="text-gray-700 text-center font-semibold">
                Upload New Document
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}