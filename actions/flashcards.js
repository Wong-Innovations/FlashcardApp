import { DELETE_SET, DELETE_CARD, CREATE_SET, CREATE_CARD, ADD_CARD_PAGE, GET_CARDS, UPDATE_CARD_WEIGHT } from '../constants';
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

export const addCardPage = (index, index2) => ({
  type: ADD_CARD_PAGE,
  setIndex: index
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
