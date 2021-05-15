import React, { useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

import Flashcard from './Flashcard';
import NewFlashcard from './NewFlashcard';

const FlashcardPreview = ({ navigation }) => {
  
  const [buttonVisible, setButtonVisible] = useState(1);
  const [addingCard, setAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    description: ''
  });
  const [editCard, setEditCard] = useState(-1);
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
  const addCard = () => {
    setAddingCard(true);
    setButtonVisible(0);
  }

  const saveCard = () => {
    setFlashcards([
      {
        ...newCard,
        card: [{
          main: [''],
          secondary: [''],
          answer: '',
        }]
      },
      ...flashcards
    ]);
    closeCard();
  }

  const closeCard = () => {
    setNewCard({
      name: '',
      description: ''
    });
    setButtonVisible(1);
    setAddingCard(false);
  }

  const openContext = (index) => {
    setEditCard(index);
  }

  const closeContext = () => {
    setEditCard(-1);
  } 

  return (
    <View style={{ flex: 1, paddingBottom: 110 }}>
      <ScrollView style={styles.flashcardWrapper} contentContainerStyle={{ flexGrow: 1 }}>
        {(addingCard) ? (
          <View style={styles.flashcard}>
            <NewFlashcard
              value={newCard}
              onChangeText={setNewCard}
            />
          </View>
        ) : null}
        {flashcards.map((flashcard, index) => {
          return (
            <View style={styles.flashcard}>
              <Flashcard
                main={[flashcard.name]}
                secondary={[flashcard.description]}
                onPress={() => handlePress(index)}
                onLongPress={() => openContext(index)}
              />
            </View>
          )
        })}
      </ScrollView>
      {/* Bottom Button */}
      {(buttonVisible)? (<View style={styles.bottom}>
        <TouchableOpacity onPress={addCard}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>NEW SET</Text>
          </View>
        </TouchableOpacity>
      </View>) : (<View style={styles.bottom}>
        <TouchableOpacity onPress={saveCard}>
          <View style={{
            ...styles.buttonWrapper,
            backgroundColor: '#32cd32',
            borderWidth: 0,
          }}>
            <Text style={{...styles.buttonText,color:'#FFF'}}>SAVE</Text>
          </View>
        </TouchableOpacity>
      </View>)}

      {(editCard > -1)? (
        <View style={{
          ...styles.bottom,
          borderWidth:2,
          borderRadius:25,
          backgroundColor:'#FFF',
          zIndex:1000,
        }}>
          <TouchableOpacity onPress={() => {navigation.navigate('Edit', { flashcards: flashcards[editCard].card });closeContext()}}>
            <View style={styles.contextButtons}>
              <Text style={styles.buttonText}>EDIT</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: 350,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity onPress={() => {setFlashcards(flashcards.filter((val,index)=>(index != editCard)));closeContext()}}>
            <View style={styles.contextButtons}>
              <Text style={styles.buttonText}>DELETE</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: 350,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity onPress={() => {closeContext();}}>
            <View style={styles.contextButtons}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null }
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
  bottom: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 36
  },
  buttonWrapper: {
    width: 350,
    height: 50,
    borderRadius: 50,
    borderColor: '#333',
    borderWidth: 2,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  contextButtons: {
    width: 350,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default FlashcardPreview;