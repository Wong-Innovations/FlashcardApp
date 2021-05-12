import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FlashcardPreview from './components/FlashcardPreview';
import RecallCards from './components/RecallCards';

const Stack = createStackNavigator();

export default function App() {

  

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'My Flashcard Sets'}
            component={FlashcardPreview}
          />
          <Stack.Screen 
            name={'Cards'}
            component={RecallCards}
            options={{ headerBackTitle: 'Back' }}
          />
        </Stack.Navigator>
        {/* <View style={styles.container}>
          <FlashcardPreview flashcards={flashcards} />
        </View> */}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
});
