import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  collectionList: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {

    case getType(actions.getCollectionList.request):
      return { ...state, collectionList: entityLoadingStarted(state.collectionList, action.payload) };
    case getType(actions.getCollectionList.success):
      return { ...state, collectionList: entityLoadingSucceeded(state.collectionList, action.payload) };
    case getType(actions.getCollectionList.failure):
      return { ...state, collectionList: entityLoadingFailed(state.collectionList) };

    default:
      return state;
  }
};

export default states;
