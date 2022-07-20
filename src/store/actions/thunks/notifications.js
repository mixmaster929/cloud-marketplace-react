import { Axios, Canceler } from '../../../core/axios';
import * as actions from '..';
import api from '../../../core/api';
import auth from '../../../core/auth';
import request from '../../../core/auth/request';

export const fetchNotificationList = (userId) => async (dispatch) => {

  dispatch(actions.getNotificationList.request(Canceler.cancel));

  try {
    const jwt = auth.getToken();
    const requestURL = api.localbaseUrl + '/notification/' + userId;
    const { data } = await Axios.get(requestURL, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
				Authorization: `Bearer ${jwt}`,
			},
      cancelToken: Canceler.token,
      params: {}
    });
    dispatch(actions.getNotificationList.success(data.data));
  } catch (err) {
    dispatch(actions.getNotificationList.failure(err));
  }
};