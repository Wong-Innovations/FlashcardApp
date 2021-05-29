import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { updateCardWeight } from '../actions/flashcards';

import Flashcard from './Flashcard';

const ChoiceCards = ({ navigation, route }) => {

  const flashcards = useSelector(state => state.flashcards[route.params.setIndex]);

  const dispatch = useDispatch();

  const getRandomCard = () => {
    let cdf = [0];
    let counter = 0;
    flashcards.card.map((card) => {
      counter += card.srs;
      cdf.push(counter);
    });
    const randomNum = Math.floor(Math.random() * cdf[cdf.length-1]);
    let start = 0, end = cdf.length-1;
    while (start <= end) {
      let mid = Math.floor((end+start)/2);
      if (start === end)
        return mid;
      else if (cdf[mid] <= randomNum && randomNum <= cdf[mid+1])
        return mid;
      else if (cdf[mid] < randomNum) 
        start = mid + 1;
      else
        end = mid;
    }
  }

  const [cardCompleted, setCardCompleted] = useState(false);
  const [cardNumber, setCardNumber] = useState(getRandomCard());
  const [vertical, setVertical] = useState(false);
  
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const populateOptions = () => {
    let newOptions = [cardNumber];
    while (newOptions.length < 4) {
      let i = Math.floor(Math.random() * flashcards.card.length);
      if (!newOptions.includes(i))
        newOptions.push(i);
    }
    shuffleArray(newOptions);
    return newOptions;
  }

  const [options, setOptions] = useState(populateOptions());

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: flashcards.name
    });
  });

  const handleCheckGuess = (guess) => {
    Keyboard.dismiss();
    if (guess == flashcards.card[cardNumber].answer) {
      dispatch(updateCardWeight(route.params.setIndex, cardNumber, -1));
      setCardCompleted(true);
      setTimeout(() => {
        setCardCompleted(false);
        while (true) {
          let newIndex = getRandomCard();
          if (cardNumber !== newIndex) {
            setCardNumber(newIndex);
            setOptions(populateOptions());
            break;
          }
        }
      } , 1500);
    } else {
      dispatch(updateCardWeight(route.params.setIndex, cardNumber, 2));
    }
  }

  useEffect(()=>{
    setVertical(false);
    options.map((option)=>{
      if (flashcards.card[option].answer.length > 5)
        setVertical(true);
    });
  }, [options]);

  return (
    <View style={{ flex: 1 }}>
      {/* Flashcard Wrapper */}
      <View style={styles.flashcardWrapper}>
        <View style={styles.flashcard}>
          <Flashcard
            main={flashcards.card[cardNumber].main}
            secondary={flashcards.card[cardNumber].secondary}
          />
        </View>

      </View>

      {/* Answer Verification */}
      {(vertical)? (
        <View>
          <View style={styles.longAnswerWrapper}>
            <TouchableOpacity onPress={() => handleCheckGuess(flashcards.card[options[0]].answer)}>
              <View style={styles.longAnswerOption}>
                <Text style={styles.main}>{flashcards.card[options[0]].answer}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.longAnswerWrapper}>
            <TouchableOpacity  onPress={() => handleCheckGuess(flashcards.card[options[1]].answer)}>
              <View style={{...styles.longAnswerOption, marginTop: 10 }}>
                <Text style={styles.main}>{flashcards.card[options[1]].answer}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.longAnswerWrapper}>
            <TouchableOpacity onPress={() => handleCheckGuess(flashcards.card[options[2]].answer)}>
              <View style={{...styles.longAnswerOption, marginTop: 10 }}>
                <Text style={styles.main}>{flashcards.card[options[2]].answer}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.longAnswerWrapper}>
            <TouchableOpacity  onPress={() => handleCheckGuess(flashcards.card[options[3]].answer)}>
              <View style={{...styles.longAnswerOption, marginTop: 10 }}>
                <Text style={styles.main}>{flashcards.card[options[3]].answer}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.answerWrapper}>
            <TouchableOpacity onPress={() => handleCheckGuess(flashcards.card[options[0]].answer)}>
              <View style={styles.answerOption}>
                <Text style={styles.main}>{flashcards.card[options[0]].answer}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => handleCheckGuess(flashcards.card[options[1]].answer)}>
              <View style={styles.answerOption}>
                <Text style={styles.main}>{flashcards.card[options[1]].answer}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.answerWrapper}>
            <TouchableOpacity onPress={() => handleCheckGuess(flashcards.card[options[2]].answer)}>
              <View style={{...styles.answerOption, marginTop: 10 }}>
                <Text style={styles.main}>{flashcards.card[options[2]].answer}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => handleCheckGuess(flashcards.card[options[3]].answer)}>
              <View style={{...styles.answerOption, marginTop: 10 }}>
                <Text style={styles.main}>{flashcards.card[options[3]].answer}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Bottom Button */}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate('Cards', { setIndex: route.params.setIndex })}>
          <View style={styles.bottomButtonWrapper}>
            <Text style={styles.buttonText}>RECALL CARDS</Text>
          </View>
        </TouchableOpacity>
      </View>

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
              color={'#32cd32'}
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
  longAnswerWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  answerOption: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 45,
    maxWidth: 189,
    minWidth: 189,
  },
  longAnswerOption: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 390,
  },
  main: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 36
  },
  bottomButtonWrapper: {
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

export default ChoiceCards;