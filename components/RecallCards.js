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

  const handleChangeCard = () => {

  }

  return (
    <View>
      {/* Flashcard Wrapper */}
      <View style={styles.flashcardWrapper}>
        <View style={styles.flashcard}>
          <Flashcard
            main={route.params.flashcards.card[cardNumber].main}
            secondary={route.params.flashcards.card[cardNumber].secondary}
          />
        </View>

      </View>

      {/* Answer Verification */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.answerWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Answer'}
          value={guess}
          onChangeText={text => setGuess(text)}
        />

        <TouchableOpacity onPress={handleCheckGuess}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Check</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={cardCompleted}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Icon
              reverse
              name={'check'}
              type={'font-awesome'}
              color={"#32cd32"}
              reverseColor={'#FFF'}
              size={30}
            />
            <Text style={styles.modalText}>Good Job!</Text>
          </View>
        </View>
        
      </Modal>
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
    marginBottom: 15,
  },
  answerWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
  },
  buttonWrapper: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modal: {
    width: 250,
    height: 200,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
});

export default RecallCards;