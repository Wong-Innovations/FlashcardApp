import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

import Flashcard from './Flashcard';

const FlashcardPreview = ({ navigation }) => {
  
  const [flashcards, setFlashcards] = useState(
    [
      { name: 'Japanese Vocab',
        description: 'Words and Sentence Practice',
        card: [
          {
            main: ['元気', '元気ですか。', '元気です。'],
            secondary: ['', 'Are you well?', 'I am well.'],
            answer: 'genki',
          },
          {
            main: ['こら', 'これわ何ですか。', 'これわいくらですか。'],
            secondary: ['', 'What is this?', 'How much is this?'],
            answer: 'kore',
          },
        ]
      },
      { name: 'Hiragana',
        description: 'Japanese Lettering Practice',
        card: [
          {
            main: ['あ'],
            secondary: [''],
            answer: 'a',
          },
          {
            main: ['い'],
            secondary: [''],
            answer: 'i',
          },
        ]
      },
    ]);

  const handlePress = (index) => {
    navigation.navigate('Cards', { flashcards: flashcards[index] })
  }

  return (
    <View>
      {flashcards.map((flashcard, index) => {
        return (
          <View style={styles.flashcardWrapper}>
            <View style={styles.flashcard}>
              <Flashcard
                main={[flashcard.name]}
                secondary={[flashcard.description]}
                onPress={() => handlePress(index)}
              />
            </View>
          </View>
        )
      })}

    </View>
    
  );
}

const styles = StyleSheet.create({
  flashcard: {
    marginTop: 25,
  },
  main: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  secondary: {
    marginTop: 10,
  },
  flashcardWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FlashcardPreview;