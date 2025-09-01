import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3b82f6',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Sign In',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Create Account'
        }} 
      />
    </Stack>
  );
}