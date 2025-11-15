
import { Stack } from 'expo-router';
import React from 'react';

const COLORS = {
  green: '#355E3B',
};

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.green },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      {/* Faqja e parë e adminit */}
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Paneli i adminit',
          headerBackVisible: false,
        }}
      />

      {/* KËTU E FSHEHIM HEADER-IN E JASHTËM */}
      <Stack.Screen
        name="ushqime"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ushtrime"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
