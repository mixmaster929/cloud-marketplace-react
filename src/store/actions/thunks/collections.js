import { Axios, Canceler } from '../../../core/axios';
import * as actions from '..';
import api from '../../../core/api';
// import axios from "axios";
import auth from '../../../core/auth';

export const fetchCollectionList = () => async (dispatch) => {
  dispatch(actions.getCollectionList.request(Canceler.cancel));

  try {
    const jwt = auth.getToken();
    const requestURL = api.localbaseUrl + '/collection';
    
    const { data } = await Axios.get(requestURL, {
      headers: {
				Authorization: `Bearer ${jwt}`,
			},
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getCollectionList.success(data.data));
  } catch (err) {
    dispatch(actions.getCollectionList.failure(err));
  }
};