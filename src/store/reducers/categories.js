import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  categoryList: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {

    case getType(actions.getCategoryList.request):
      return { ...state, categoryList: entityLoadingStarted(state.categoryList, action.payload) };
    case getType(actions.getCategoryList.success):
      return { ...state, categoryList: entityLoadingSucceeded(state.categoryList, action.payload) };
    case getType(actions.getCategoryList.failure):
      return { ...state, categoryList: entityLoadingFailed(state.categoryList) };

    default:
      return state;
  }
};

export default states;
