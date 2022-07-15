import { Axios, Canceler } from '../../../core/axios';
import * as actions from '..';
import api from '../../../core/api';
// import axios from "axios";
import auth from '../../../core/auth';

export const fetchCategoryList = () => async (dispatch) => {

  dispatch(actions.getCategoryList.request(Canceler.cancel));

  try {
    const jwt = auth.getToken();
    const requestURL = api.localbaseUrl + '/categories';
    const { data } = await Axios.get(requestURL, {
      headers: {
				Authorization: `Bearer ${jwt}`,
			},
      cancelToken: Canceler.token,
      params: {}
    });
    dispatch(actions.getCategoryList.success(data.data));
  } catch (err) {
    dispatch(actions.getCategoryList.failure(err));
  }
};

// export const fetchAuthorRanking = () => async (dispatch) => {

//   dispatch(actions.getAuthorRanking.request(Canceler.cancel));

//   try {
//     const { data } = await Axios.get(`${api.baseUrl}${api.authorsSales}`, {
//       cancelToken: Canceler.token,
//       params: {}
//     });
//     dispatch(actions.getAuthorRanking.success(data.data.attributes.results));
//   } catch (err) {
//     dispatch(actions.getAuthorRanking.failure(err));
//   }
// };
