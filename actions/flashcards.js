import { DELETE_SET, DELETE_CARD } from '../constants';

export const deleteSet = (index) => ({
  type: DELETE_SET,
  setIndex: index
});

export const deleteCard = (index, index2) => ({
  type: DELETE_CARD,
  setIndex: index,
  cardIndex: index2
});