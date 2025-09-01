import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  // Mock questions data
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
      explanation: "A gene is the basic unit of heredity that carries information from parents to offspring."
    }
  ];

  // Timer effect
  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, quizStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      setAnswers({
        ...answers,
        [currentQuestion]: selectedAnswer
      });
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1] || null);
      } else {
        handleFinishQuiz();
      }
    } else {
      Alert.alert('Please select an answer', 'You must choose an option before proceeding.');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setAnswers({
        ...answers,
        [currentQuestion]: selectedAnswer
      });
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const handleFinishQuiz = () => {
    const finalAnswers = {
      ...answers,
      [currentQuestion]: selectedAnswer
    };
    
    // Calculate score
    let correct = 0;
    questions.forEach((question, index) => {
      if (finalAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / questions.length) * 100);
    
    Alert.alert(
      'Quiz Complete!',
      `You scored ${correct}/${questions.length} (${score}%)`,
      [
        { text: 'View Results', onPress: () => router.push('/results') }
      ]
    );
  };

  if (!quizStarted) {
    return (
      <View className="flex-1 bg-white px-6 py-8">
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Ready to Start?</Text>
          <Text className="text-gray-600 text-center">
            You have {questions.length} questions to answer in 10 minutes
          </Text>
        </View>

        <View className="bg-blue-50 rounded-lg p-6 mb-8">
          <Text className="text-blue-800 font-medium mb-4">📋 Quiz Instructions:</Text>
          <Text className="text-blue-700 text-sm leading-6">
            • Read each question carefully\n
            • Select the best answer from the options\n
            • You can navigate back to previous questions\n
            • Timer will start when you begin\n
            • Submit when finished or time runs out
          </Text>
        </View>

        <View className="bg-gray-50 rounded-lg p-4 mb-8">
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-700 font-medium">Questions:</Text>
            <Text className="text-gray-800 font-semibold">{questions.length}</Text>
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-gray-700 font-medium">Time Limit:</Text>
            <Text className="text-gray-800 font-semibold">10 minutes</Text>
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-gray-700 font-medium">Difficulty:</Text>
            <Text className="text-gray-800 font-semibold">Medium</Text>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-blue-500 py-4 px-6 rounded-lg"
          onPress={handleStartQuiz}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Start Quiz
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <View className="flex-1 bg-white">
      {/* Header with timer and progress */}
      <View className="bg-blue-500 px-6 py-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </Text>
          <Text className="text-white font-semibold">
            ⏱️ {formatTime(timeLeft)}
          </Text>
        </View>
        <View className="bg-blue-300 h-2 rounded-full">
          <View 
            className="bg-white h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {/* Question */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-gray-800 leading-7">
            {question.question}
          </Text>
        </View>

        {/* Answer Options */}
        <View className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              className={`p-4 rounded-lg border-2 ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
              onPress={() => handleAnswerSelect(index)}
            >
              <View className="flex-row items-center">
                <View className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && (
                    <Text className="text-white text-xs font-bold">✓</Text>
                  )}
                </View>
                <Text className={`flex-1 text-base ${
                  selectedAnswer === index ? 'text-blue-800 font-medium' : 'text-gray-700'
                }`}>
                  {option}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 py-4 border-t border-gray-200">
        <View className="flex-row justify-between">
          <TouchableOpacity 
            className={`py-3 px-6 rounded-lg border ${
              currentQuestion === 0 
                ? 'border-gray-300 bg-gray-100' 
                : 'border-gray-400 bg-white'
            }`}
            onPress={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            <Text className={`font-semibold ${
              currentQuestion === 0 ? 'text-gray-400' : 'text-gray-700'
            }`}>
              ← Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-blue-500 py-3 px-6 rounded-lg"
            onPress={handleNextQuestion}
          >
            <Text className="text-white font-semibold">
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next →'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}