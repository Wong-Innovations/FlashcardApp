import { DELETE_SET, DELETE_CARD, CREATE_SET, CREATE_CARD, GET_CARDS, UPDATE_CARD_WEIGHT, EDIT_CARD } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteSet = (index) => ({
  type: DELETE_SET,
  setIndex: index
});

export const deleteCard = (index, index2) => ({
  type: DELETE_CARD,
  setIndex: index,
  cardIndex: index2
});

export const createSet = (name, description) => ({
  type: CREATE_SET,
  name: name,
  description: description
});

export const createCard = (index, card) => ({
  type: CREATE_CARD,
  setIndex: index,
  main: card.main,
  secondary: card.secondary,
  answer: card.answer
});

export const editCard = (index, index2, value) => ({
  type: EDIT_CARD,
  setIndex: index,
  cardIndex: index2,
  newCard: value
});

export const updateCardWeight = (index, index2, weightChange) => ({
  type: UPDATE_CARD_WEIGHT,
  setIndex: index,
  cardIndex: index2,
  weightChange: weightChange
});

export const localGetFlashcards = () => {
  try {
    return async dispatch => {
      const jsonValue = await AsyncStorage.getItem('flashcards');
      if (jsonValue != null) {
        dispatch({
          type: GET_CARDS,
          data: JSON.parse(jsonValue),
        });
      }
    }
  } catch (e) {}
}
