import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
    notificationList: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {

    case getType(actions.getNotificationList.request):
      return { ...state, notificationList: entityLoadingStarted(state.notificationList, action.payload) };
    case getType(actions.getNotificationList.success):
      return { ...state, notificationList: entityLoadingSucceeded(state.notificationList, action.payload) };
    case getType(actions.getNotificationList.failure):
      return { ...state, notificationList: entityLoadingFailed(state.notificationList) };

    default:
      return state;
  }
};

export default states;
