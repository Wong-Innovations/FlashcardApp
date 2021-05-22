import { DELETE_SET, DELETE_CARD, CREATE_SET, CREATE_CARD, ADD_CARD_PAGE, GET_CARDS, SAVE_CARDS } from '../constants';
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

// export const localGetFlashcards = () => (dispatch, getState) => {
//   return new Promise((resolve, reject) => {
//     AsyncStorage.getItem('flashcards').then((result) => {
//       dispatch({
//         type: GET_CARDS,
//         data: JSON.parse(result)
//       });
//       resolve({ success: true });
//     });
//   });
// }
