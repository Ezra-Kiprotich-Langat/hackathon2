import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3b82f6", // Blue primary color
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "SkillScore",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="auth"
          options={{
            title: "Authentication",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="upload"
          options={{
            title: "Upload File",
          }}
        />
        <Stack.Screen
          name="questions"
          options={{
            title: "Practice Questions",
          }}
        />
        <Stack.Screen
          name="results"
          options={{
            title: "Results",
          }}
        />
      </Stack>
    </>
  );
}
