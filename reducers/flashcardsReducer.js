import { DELETE_SET, DELETE_CARD, CREATE_SET, CREATE_CARD, ADD_CARD_PAGE, GET_CARDS, SAVE_CARDS } from '../constants';

const initialState = {
  flashcards: [
    { name: '',
      description: '',
      card: [
        {
          main: [''],
          secondary: [''],
          answer: '',
        },
      ]
    },
  ]
};

const flashcardsReducer = (state = initialState, action) => {
  const newFlashcards = state.flashcards;
  switch(action.type) {

    case DELETE_SET:
      newFlashcards.splice(action.setIndex, 1);
      return { flashcards: newFlashcards };

    case DELETE_CARD:
      newFlashcards[action.setIndex].card.splice(action.cardIndex, 1);
      return { flashcards: newFlashcards };

    case CREATE_SET:
      newFlashcards.unshift({
        name: action.name,
        description: action.description,
        card: []
      });
      return { flashcards: newFlashcards };

    case CREATE_CARD:
      newFlashcards[action.setIndex].card.unshift({
        main: action.main,
        secondary: action.secondary,
        answer: action.answer
      });
      return { flashcards: newFlashcards };

    case ADD_CARD_PAGE:
      newFlashcards[action.setIndex].card[action.cardIndex].main.push('');
      newFlashcards[action.setIndex].card[action.cardIndex].secondary.push('');
      return { flashcards: newFlashcards };

    case GET_CARDS:
      return { flashcards: action.data };
      
    default:
      return state;
  }
}

export default flashcardsReducer;