import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import flashcardsReducer from './reducers/flashcardsReducer';
import FlashcardPreview from './components/FlashcardPreview';
import RecallCards from './components/RecallCards';
import EditCards from './components/EditCards';
import ChoiceCards from './components/ChoiceCards';

const Stack = createStackNavigator();
const store = createStore(flashcardsReducer, applyMiddleware(thunk));

store.subscribe(() => {
  const jsonValue = JSON.stringify(store.getState().flashcards);
  AsyncStorage.setItem('flashcards', jsonValue);
});

export default function App() {

  return (
    <Provider store={store}>
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
            <Stack.Screen 
              name={'Edit'}
              component={EditCards}
              options={{ headerBackTitle: 'Back' }}
            />
            <Stack.Screen 
              name={'ChoiceCards'}
              component={ChoiceCards}
              options={{ headerBackTitle: 'Back' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
});
