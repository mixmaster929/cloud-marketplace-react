import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';
import auth from '../../../core/auth';

const jwt = auth.getToken();

export const fetchNftsBreakdown = (authorId, isMusic = false) => async (dispatch) => {

  dispatch(actions.getNftBreakdown.request(Canceler.cancel));

  try {
    let filter = authorId ? 'filters[author][id][$eq]='+authorId : '';
    let music = isMusic ? 'filters[category][$eq]=music' : '';
    const relations = [
      'author',
      'author.avatar',
      'preview_image',
    ];
    let populate = `populate=${relations}&`;

    const { data } = await Axios.get(`${api.baseUrl}${api.nfts}?${populate}${filter}&${music}`, {
      cancelToken: Canceler.token,
      params: {}
    });
    // console.log("fetchNftsBreakdown=>", data)
    dispatch(actions.getNftBreakdown.success(data));
  } catch (err) {
    dispatch(actions.getNftBreakdown.failure(err));
  }
};

export const fetchNftShowcase = () => async (dispatch) => {

  dispatch(actions.getNftShowcase.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.nftShowcases}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftShowcase.success(data.data.attributes));
  } catch (err) {
    dispatch(actions.getNftShowcase.failure(err));
  }
};

export const fetchNftDetail = (nftId) => async (dispatch) => {
  dispatch(actions.getNftDetail.request(Canceler.cancel));
  try {
    const requestURL = api.localbaseUrl + '/nftdetail/' + nftId;

    const { data } = await Axios.get(requestURL, {
      headers: {
				Authorization: `Bearer ${jwt}`,
			},
      cancelToken: Canceler.token,
      params: {}
    });
    dispatch(actions.getNftDetail.success(data.data));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err));
  }
};


export const fetchAllNfts = () => async (dispatch) => {
  dispatch(actions.getNftsList.request(Canceler.cancel));

  try {
    
    const requestURL = api.localbaseUrl + '/nfts/';

    const { data } = await Axios.get(requestURL, {
      headers: {
				Authorization: `Bearer ${jwt}`,
			},
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftsList.success(data.data));
  } catch (err) {
    dispatch(actions.getNftsList.failure(err));
  }
};

export const fetchAllNftsByFilter = (filter, collection_id) => async (dispatch) => {
  dispatch(actions.getNftsListByFilter.request(Canceler.cancel));

  try {
    const jwt = auth.getToken();
    const requestURL = api.localbaseUrl + '/nftsByFilter/' + filter + "/" + collection_id;

    const { data } = await Axios.get(requestURL, {
      headers: {
				Authorization: `Bearer ${jwt}`,
			},
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftsListByFilter.success(data.data));
  } catch (err) {
    dispatch(actions.getNftsListByFilter.failure(err));
  }
};

export const fetchAllNftsByFilter1 = (filter) => async (dispatch) => {
  dispatch(actions.getNftsListByFilter1.request(Canceler.cancel));

  try {
    const jwt = auth.getToken();
    const requestURL = api.localbaseUrl + '/nftsByFilter/' + filter;

    const { data } = await Axios.get(requestURL, {
      headers: {
				Authorization: `Bearer ${jwt}`,
			},
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftsListByFilter1.success(data.data));
  } catch (err) {
    dispatch(actions.getNftsListByFilter1.failure(err));
  }
};

export const fetchAllNftsByUser = (userId) => async (dispatch) => {
  dispatch(actions.getNftsListByUser.request(Canceler.cancel));

  try {
    const jwt = auth.getToken();
    // const userInfo = auth.getUserInfo();
    const requestURL = api.localbaseUrl + '/nftsByUser/' + userId;
    
    const { data } = await Axios.get(requestURL, {
      headers: {
				Authorization: `Bearer ${jwt}`,
			},
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftsListByUser.success(data.data));
  } catch (err) {
    dispatch(actions.getNftsListByUser.failure(err));
  }
};