import { createStore, combineReducers } from 'redux';
import flashcardsReducer from '../reducers/flashcardsReducer';

const rootReducer = combineReducers(
  { flashcards: flashcardsReducer }
);

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;