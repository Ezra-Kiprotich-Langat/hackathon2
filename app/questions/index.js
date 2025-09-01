import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function QuestionsScreen() {
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedCount, setSelectedCount] = useState(10);

  const difficulties = [
    { id: 'easy', name: 'Easy', description: 'Basic concepts and definitions', color: 'bg-green-500' },
    { id: 'medium', name: 'Medium', description: 'Application and analysis', color: 'bg-yellow-500' },
    { id: 'hard', name: 'Hard', description: 'Critical thinking and synthesis', color: 'bg-red-500' }
  ];

  const questionCounts = [5, 10, 15, 20];

  const mockQuestions = [
    {
      id: 1,
      question: "What is the primary function of mitochondria in a cell?",
      options: [
        "Protein synthesis",
        "Energy production",
        "DNA replication",
        "Waste removal"
      ],
      correctAnswer: 1,
      explanation: "Mitochondria are known as the powerhouse of the cell because they produce ATP through cellular respiration."
    },
    {
      id: 2,
      question: "Which process converts glucose into pyruvate?",
      options: [
        "Glycolysis",
        "Krebs cycle",
        "Electron transport",
        "Photosynthesis"
      ],
      correctAnswer: 0,
      explanation: "Glycolysis is the metabolic pathway that converts glucose into pyruvate, releasing energy in the process."
    }
  ];

  const handleGenerateQuestions = async () => {
    setGenerating(true);
    
    try {
      // TODO: Implement Gemini API call for question generation
      console.log('Generating questions with:', {
        difficulty: selectedDifficulty,
        count: selectedCount
      });
      
      // Simulate API call
      setTimeout(() => {
        setQuestions(mockQuestions.slice(0, selectedCount));
        setGenerating(false);
        Alert.alert(
          'Questions Generated!',
          `${selectedCount} ${selectedDifficulty} questions are ready.`,
          [
            { text: 'Review Questions', onPress: () => {} },
            { text: 'Start Quiz', onPress: () => router.push('/questions/quiz') }
          ]
        );
      }, 2000);
    } catch (error) {
      setGenerating(false);
      Alert.alert('Error', 'Failed to generate questions. Please try again.');
    }
  };

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      Alert.alert('No Questions', 'Please generate questions first.');
      return;
    }
    router.push('/questions/quiz');
  };

  const handleReviewQuestions = () => {
    if (questions.length === 0) {
      Alert.alert('No Questions', 'Please generate questions first.');
      return;
    }
    router.push('/questions/review');
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Practice Questions</Text>
          <Text className="text-gray-600 text-center">
            Generate AI-powered questions from your uploaded document
          </Text>
        </View>

        {/* Document Info */}
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <View className="flex-row items-center">
            <Text className="text-2xl mr-3">📄</Text>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">sample-document.pdf</Text>
              <Text className="text-gray-600 text-sm">Ready for question generation</Text>
            </View>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-800 text-xs font-medium">✓ Processed</Text>
            </View>
          </View>
        </View>

        {/* Difficulty Selection */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Select Difficulty</Text>
          <View className="space-y-3">
            {difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty.id}
                className={`p-4 rounded-lg border-2 ${
                  selectedDifficulty === difficulty.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
                onPress={() => setSelectedDifficulty(difficulty.id)}
              >
                <View className="flex-row items-center">
                  <View className={`w-4 h-4 rounded-full ${difficulty.color} mr-3`} />
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-800">{difficulty.name}</Text>
                    <Text className="text-gray-600 text-sm">{difficulty.description}</Text>
                  </View>
                  {selectedDifficulty === difficulty.id && (
                    <Text className="text-blue-500 text-xl">✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question Count Selection */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Number of Questions</Text>
          <View className="flex-row flex-wrap gap-3">
            {questionCounts.map((count) => (
              <TouchableOpacity
                key={count}
                className={`px-6 py-3 rounded-lg border-2 ${
                  selectedCount === count
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 bg-white'
                }`}
                onPress={() => setSelectedCount(count)}
              >
                <Text className={`font-semibold ${
                  selectedCount === count ? 'text-white' : 'text-gray-700'
                }`}>
                  {count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Generate Button */}
        <TouchableOpacity 
          className={`py-4 px-6 rounded-lg mb-6 ${
            generating ? 'bg-gray-400' : 'bg-blue-500'
          }`}
          onPress={handleGenerateQuestions}
          disabled={generating}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {generating ? 'Generating Questions...' : 'Generate Questions'}
          </Text>
        </TouchableOpacity>

        {/* Generation Status */}
        {generating && (
          <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <Text className="text-yellow-800 font-medium text-center">
              🤖 AI is analyzing your document...
            </Text>
            <Text className="text-yellow-600 text-sm text-center mt-1">
              Creating {selectedCount} {selectedDifficulty} questions
            </Text>
          </View>
        )}

        {/* Questions Generated */}
        {questions.length > 0 && (
          <View className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <Text className="text-green-800 font-medium text-center mb-3">
              ✅ {questions.length} questions generated successfully!
            </Text>
            <View className="flex-row space-x-3">
              <TouchableOpacity 
                className="flex-1 bg-green-500 py-3 px-4 rounded-lg"
                onPress={handleStartQuiz}
              >
                <Text className="text-white text-center font-semibold">Start Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 bg-white border border-green-500 py-3 px-4 rounded-lg"
                onPress={handleReviewQuestions}
              >
                <Text className="text-green-500 text-center font-semibold">Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Info Section */}
        <View className="bg-blue-50 rounded-lg p-4">
          <Text className="text-blue-800 font-medium mb-2">💡 Question Types:</Text>
          <Text className="text-blue-700 text-sm leading-5">
            • Multiple choice questions\n
            • True/false statements\n
            • Fill-in-the-blank\n
            • Short answer questions
          </Text>
        </View>

        {/* Demo Note */}
        <View className="mt-6 p-4 bg-gray-50 rounded-lg">
          <Text className="text-gray-700 text-sm text-center">
            🚧 Demo Mode: Questions will be generated using Google Gemini API
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}