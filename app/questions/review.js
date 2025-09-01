import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function ReviewScreen() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Mock questions and answers data
  const questions = [
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
      userAnswer: 1,
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
      userAnswer: 2,
      explanation: "Glycolysis is the metabolic pathway that converts glucose into pyruvate, releasing energy in the process."
    },
    {
      id: 3,
      question: "What is the basic unit of heredity?",
      options: [
        "Chromosome",
        "Gene",
        "DNA",
        "Protein"
      ],
      correctAnswer: 1,
      userAnswer: 1,
      explanation: "A gene is the basic unit of heredity that carries information from parents to offspring."
    }
  ];

  const correctAnswers = questions.filter(q => q.userAnswer === q.correctAnswer).length;
  const score = Math.round((correctAnswers / questions.length) * 100);

  const toggleExpanded = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const getAnswerStatus = (question) => {
    return question.userAnswer === question.correctAnswer;
  };

  const getStatusColor = (isCorrect) => {
    return isCorrect ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (isCorrect) => {
    return isCorrect ? '✅' : '❌';
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Review Answers</Text>
          <Text className="text-gray-600 text-center">
            Review your answers and learn from explanations
          </Text>
        </View>

        {/* Score Summary */}
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <View className="items-center">
            <Text className="text-4xl font-bold text-blue-600 mb-2">{score}%</Text>
            <Text className="text-lg font-semibold text-gray-800 mb-1">
              {correctAnswers} out of {questions.length} correct
            </Text>
            <Text className="text-gray-600">
              {score >= 80 ? '🎉 Excellent work!' : score >= 60 ? '👍 Good job!' : '📚 Keep studying!'}
            </Text>
          </View>
          
          <View className="flex-row justify-around mt-6 pt-4 border-t border-blue-200">
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-600">{correctAnswers}</Text>
              <Text className="text-green-600 font-medium">Correct</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-red-600">{questions.length - correctAnswers}</Text>
              <Text className="text-red-600 font-medium">Incorrect</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-600">{questions.length}</Text>
              <Text className="text-gray-600 font-medium">Total</Text>
            </View>
          </View>
        </View>

        {/* Questions Review */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Question Review</Text>
          
          {questions.map((question, index) => {
            const isCorrect = getAnswerStatus(question);
            const isExpanded = expandedQuestion === question.id;
            
            return (
              <View key={question.id} className="mb-4">
                <TouchableOpacity
                  className={`border-2 rounded-lg p-4 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                  onPress={() => toggleExpanded(question.id)}
                >
                  <View className="flex-row items-start">
                    <Text className="text-2xl mr-3">
                      {getStatusIcon(isCorrect)}
                    </Text>
                    <View className="flex-1">
                      <Text className="font-semibold text-gray-800 mb-2">
                        Question {index + 1}
                      </Text>
                      <Text className="text-gray-700 leading-6">
                        {question.question}
                      </Text>
                      
                      {!isExpanded && (
                        <View className="mt-3">
                          <Text className={`font-medium ${getStatusColor(isCorrect)}`}>
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-gray-400 text-lg ml-2">
                      {isExpanded ? '▼' : '▶'}
                    </Text>
                  </View>
                </TouchableOpacity>

                {isExpanded && (
                  <View className="mt-2 bg-white border border-gray-200 rounded-lg p-4">
                    {/* Answer Options */}
                    <Text className="font-semibold text-gray-800 mb-3">Answer Options:</Text>
                    {question.options.map((option, optionIndex) => {
                      const isUserAnswer = question.userAnswer === optionIndex;
                      const isCorrectAnswer = question.correctAnswer === optionIndex;
                      
                      let optionStyle = 'bg-gray-50 border-gray-200';
                      let textStyle = 'text-gray-700';
                      
                      if (isCorrectAnswer) {
                        optionStyle = 'bg-green-100 border-green-300';
                        textStyle = 'text-green-800';
                      } else if (isUserAnswer && !isCorrectAnswer) {
                        optionStyle = 'bg-red-100 border-red-300';
                        textStyle = 'text-red-800';
                      }
                      
                      return (
                        <View
                          key={optionIndex}
                          className={`p-3 mb-2 rounded border ${optionStyle}`}
                        >
                          <View className="flex-row items-center">
                            <Text className={`flex-1 ${textStyle}`}>
                              {option}
                            </Text>
                            {isCorrectAnswer && (
                              <Text className="text-green-600 font-semibold ml-2">✓ Correct</Text>
                            )}
                            {isUserAnswer && !isCorrectAnswer && (
                              <Text className="text-red-600 font-semibold ml-2">Your Answer</Text>
                            )}
                          </View>
                        </View>
                      );
                    })}
                    
                    {/* Explanation */}
                    <View className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <Text className="font-semibold text-blue-800 mb-2">💡 Explanation:</Text>
                      <Text className="text-blue-700 leading-6">
                        {question.explanation}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View className="space-y-4">
          <TouchableOpacity 
            className="bg-blue-500 py-4 px-6 rounded-lg"
            onPress={() => router.push('/questions')}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Generate New Questions
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-green-500 py-4 px-6 rounded-lg"
            onPress={() => router.push('/questions/quiz')}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Retake Quiz
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="border border-gray-300 py-4 px-6 rounded-lg"
            onPress={() => router.push('/results')}
          >
            <Text className="text-gray-700 text-center font-semibold text-lg">
              View Detailed Results
            </Text>
          </TouchableOpacity>
        </View>

        {/* Study Tips */}
        <View className="mt-8 bg-yellow-50 rounded-lg p-4">
          <Text className="text-yellow-800 font-medium mb-2">📚 Study Tips:</Text>
          <Text className="text-yellow-700 text-sm leading-5">
            • Review incorrect answers and their explanations\n
            • Focus on topics where you made mistakes\n
            • Generate more questions on challenging areas\n
            • Practice regularly to improve retention
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}