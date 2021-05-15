import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import Flashcard from './Flashcard';

const RecallCards = ({ navigation, route }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.flashcards.name
    });
  });

  const [guess, setGuess] = useState('');
  const [cardCompleted, setCardCompleted] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [editCard, setEditCard] = useState(-1);

  const handleCheckGuess = () => {
    Keyboard.dismiss();
    if (guess == route.params.flashcards.card[cardNumber].answer) {
      setCardCompleted(true);
      setTimeout(() => {
        handleChangeCard();
        setCardCompleted(false);
        if (cardNumber < route.params.flashcards.card.length-1)
          setCardNumber(cardNumber+1);
        else
          setCardNumber(0);
      } , 1500);
    }
    setGuess('');
  }

  const handleChangeCard = (index) => {

  }

  const openContext = (index) => {
    setEditCard(index);
  }

  const closeContext = () => {
    setEditCard(-1);
  } 

  return (
    <View style={{ flex: 1, paddingBottom: 110 }}>
      {/* Flashcard Wrapper */}
      <View style={styles.flashcardWrapper}>
        {route.params.flashcards.map((flashcard, index) => {
          return (
            <View style={styles.flashcard}>
              <Flashcard
                main={flashcard.main}
                secondary={flashcard.secondary}
                onLongPress={() => openContext(index)}
              />
            </View>
          )
        })}
      </View>

      {(editCard > -1)? (
        <View style={{
          ...styles.bottom,
          borderWidth:2,
          borderRadius:25,
          backgroundColor:'#FFF',
          zIndex:1000,
        }}>
          <TouchableOpacity onPress={() => {closeContext()}}>
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
          <TouchableOpacity onPress={() => {closeContext()}}>
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
          <TouchableOpacity onPress={closeContext}>
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
  flashcardWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  flashcard: {
    marginTop: 25,
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

export default RecallCards;