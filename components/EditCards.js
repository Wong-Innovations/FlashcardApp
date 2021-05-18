import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Flashcard from './Flashcard';
import { localGetFlashcards, localSaveFlashcards } from './LocalStorage/LocalStorage';

const EditCards = ({ navigation, route }) => {

  const [cardNumber, setCardNumber] = useState(0);
  const [editCard, setEditCard] = useState(-1);
  const [flashcards, setFlashcards] = useState(null);
  const [asyncCall, setAsyncCall] = useState(false);

  setAsyncCall(true);
  localGetFlashcards().then((val) => setFlashcards(val)).then(() => setAsyncCall(false));

  const openContext = (index) => {
    setEditCard(index);
  }

  const closeContext = () => {
    setEditCard(-1);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (flashcards !== null) ? flashcards[route.params.index].name : 'test',
    });
  });

  useEffect(() => {
    return () => {
      while (asyncCall) {
        // do nothing
      }
    }
  });

  return (flashcards === null) ? null : (
    <View style={{ flex: 1, paddingBottom: 110 }}>
      {/* Flashcard Wrapper */}
      <View style={styles.flashcardWrapper}>
        {flashcards[route.params.index].card.map((flashcard, index) => {
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
          <TouchableOpacity onPress={() => {
            let temp = [];
            flashcards.forEach((element, index) => {
              if (index != route.params.index) temp.push(element);
              else temp.push({
                name: element.name,
                description: element.description,
                card: element.card.filter((val,index)=>(index != editCard))
              });
            });
            setFlashcards(temp);
            setAsyncCall(true);
            localSaveFlashcards(flashcards).then(() => setAsyncCall(false));
            console.log(temp);
            closeContext();
          }}>
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

export default EditCards;