import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import Flashcard from './components/Flashcard';

export default function App() {

  const [flashcard, setFlashcards] = useState([]);
  const [guess, setGuess] = useState('');
  const [cardCompleted, setCardCompleted] = useState(false);

  const answer = "genki";

  const handleCheckGuess = () => {
    Keyboard.dismiss();
    if (guess == answer) {
      setCardCompleted(true);
      setTimeout(() => {
        handleChangeCard();
        setCardCompleted(false);
      } , 1500);
    }
    setGuess('');
  }

  const handleChangeCard = () => {

  } 

  return (
    <View style={styles.container}>
      
      {/* Flashcard Wrapper */}
      <View style={styles.flashcardWrapper}>
        <Text style={styles.sectionTitle}>My Flashcards</Text>

        <View style={styles.flashcard}>
          <Flashcard
            main={['元気', '元気ですか。', '元気です。']}
            secondary={['', 'Are you well?', 'I am well.']}
          />
          {/* <Flashcard main={'genki'} secondary={'genki'} /> */}
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
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  flashcardWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  flashcard: {
    marginTop: 25,
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
