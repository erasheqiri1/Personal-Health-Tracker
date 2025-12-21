
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
 
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

   
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

    
      <Stack.Screen name="plans" options={{ headerShown: false }} />

      <Stack.Screen name="ushtrime" options={{ headerShown: false }} />

  
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
    </Stack>
  );
}
