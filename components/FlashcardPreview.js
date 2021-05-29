import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { View, Text, StyleSheet, AppState } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';

import Flashcard from './Flashcard';
import NewFlashcard from './NewFlashcard';
import { deleteSet, createSet, editSet, localGetFlashcards } from '../actions/flashcards';

const FlashcardPreview = ({ navigation }) => {
  
  const [buttonVisible, setButtonVisible] = useState(1);
  const [addingCard, setAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    description: ''
  });
  const [updateSet, setUpdateSet] = useState({
    name: '',
    description: ''
  });
  const [updateSetNum, setUpdateSetNum] = useState(-1);
  const [editCard, setEditCard] = useState(-1);
  const flashcards = useSelector(state => state.flashcards);
  const dispatch = useDispatch();
  const deleteset = index => dispatch(deleteSet(index));
  const createset = (name, description) => dispatch(createSet(name, description));
  const editset = (index, value) => dispatch(editSet(index, value));

  // setAsyncCall(true);
  // localGetFlashcards().then((val) => setFlashcards(val)).then(() => setAsyncCall(false));

  const handlePress = (index) => {
    if (flashcards[index].card.length === 0)
      navigation.navigate('Edit', { setIndex: index });
    else
      navigation.navigate('Cards', { setIndex: index });
  }
  const addCard = () => {
    setAddingCard(true);
    setButtonVisible(0);
  }

  const saveCard = () => {
    if (addingCard) {
      createset(newCard.name, newCard.description);
      closeCard();
    } else {
      editset(updateSetNum, updateSet);
      setUpdateSetNum(-1);
      setButtonVisible(1);
    }
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

  useEffect(() => {
    dispatch(localGetFlashcards());
  }, []);

  AppState.addEventListener('change', state => {
    if (state === 'active') {
      dispatch(localGetFlashcards());
    }
  });

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
          return (index === updateSetNum)? (
            <View style={styles.flashcard}>
              <NewFlashcard
                value={updateSet}
                onChangeText={setUpdateSet}
              />
            </View>
          ) : (
            <View style={styles.flashcard}>
              <Flashcard
                main={[flashcard.name]}
                secondary={[flashcard.description]}
                onPress={() => handlePress(index)}
                onLongPress={() => openContext(index)}
              />
            </View>
          );
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
        <TouchableOpacity onPress={() => saveCard()}>
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
          <TouchableOpacity onPress={() => {navigation.navigate('Edit', { setIndex: editCard });closeContext()}}>
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
            setUpdateSet(flashcards[editCard]);
            setUpdateSetNum(editCard);
            setEditCard(-1);
            setButtonVisible(0);
          }}>
            <View style={styles.contextButtons}>
              <Text style={styles.buttonText}>RENAME</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: 350,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity onPress={() => {deleteset(editCard);closeContext();}}>
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

// const mapStateToProps = (state) => {
//   return {}
// }

// const mapDispatchToProps = {
//   getFlashcards: localGetFlashcards
// }

export default FlashcardPreview;