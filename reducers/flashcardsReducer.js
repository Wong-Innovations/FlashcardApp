import { DELETE_SET, DELETE_CARD } from '../constants';

const initialState = {
  flashcards: [
    { name: 'Japanese Vocab',
      description: 'Words and Sentence Practice',
      card: [
        {
          main: ['元気', '元気ですか。', '元気です。'],
          secondary: ['', 'Are you well?', 'I am well.'],
          answer: 'genki',
        },
        {
          main: ['こら', 'これわ何ですか。', 'これわいくらですか。'],
          secondary: ['', 'What is this?', 'How much is this?'],
          answer: 'kore',
        },
      ]
    },
    { name: 'Hiragana',
      description: 'Japanese Lettering Practice',
      card: [
        {
          main: ['あ'],
          secondary: [''],
          answer: 'a',
        },
        {
          main: ['い'],
          secondary: [''],
          answer: 'i',
        },
      ]
    },
  ]
};

const deleteSetReducer = (state = initialState, action) => {
  const newFlashcards = state.flashcards;
  switch(action.type) {

    case DELETE_SET:
      newFlashcards.splice(action.setIndex, 1);
      console.log(newFlashcards);
      return { flashcards: newFlashcards };

    case DELETE_CARD:
      newFlashcards[action.setIndex].card.splice(action.cardIndex, 1);
      console.log(newFlashcards);
      return { flashcards: newFlashcards };

    default:
      return state;
  }
}

export default deleteSetReducer;