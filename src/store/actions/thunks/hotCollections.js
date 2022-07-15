import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import auth, { authorUrl } from '../../../core/auth';

export const fetchHotCollections = (collectionId) => async (dispatch) => {
  dispatch(actions.getHotCollections.request(Canceler.cancel));

  try {
    const jwt = auth.getToken();
    const requestURL = authorUrl(collectionId);
    const { data } = await Axios.get(requestURL, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cancelToken: Canceler.token,
      params: {}
    });
    
    dispatch(actions.getHotCollections.success(data));
  } catch (err) {
    dispatch(actions.getHotCollections.failure(err));
  }
};
