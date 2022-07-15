import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';
import auth, { authorUrl } from '../../../core/auth';

export const fetchAuthorList = (authorId) => async (dispatch) => {

  dispatch(actions.getAuthorList.request(Canceler.cancel));

  try {
    const jwt = auth.getToken();
    const requestURL = authorUrl(authorId);
    if (authorId) {
      const { data } = await Axios.get(requestURL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        cancelToken: Canceler.token,
        params: {}
      });
      dispatch(actions.getAuthorList.success(data.data));
    }
  } catch (err) {
    dispatch(actions.getAuthorList.failure(err));
  }
};

export const fetchAuthorRanking = () => async (dispatch) => {

  dispatch(actions.getAuthorRanking.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.authorsSales}`, {
      cancelToken: Canceler.token,
      params: {}
    });
    dispatch(actions.getAuthorRanking.success(data.data.attributes.results));
  } catch (err) {
    dispatch(actions.getAuthorRanking.failure(err));
  }
};
