import { Stack } from 'expo-router';

export default function QuestionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3B82F6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Practice Questions',
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen 
        name="quiz" 
        options={{ 
          title: 'Quiz Mode',
          headerBackTitle: 'Questions'
        }} 
      />
      <Stack.Screen 
        name="review" 
        options={{ 
          title: 'Review Answers',
          headerBackTitle: 'Quiz'
        }} 
      />
    </Stack>
  );
}