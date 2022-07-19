import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { 
  initEntityState, 
  entityLoadingStarted, 
  entityLoadingSucceeded, 
  entityLoadingFailed, 
  remapObject 
} from '../utils';

export const defaultState = {
  nftBreakdown: initEntityState(null),
  nftDetail: initEntityState(null),
  nftShowcase: initEntityState(null),
  nftList: initEntityState(null),
  nftListByFilter: initEntityState(null),
  nftListByFilter1: initEntityState(null),
  nftListByUser: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    //new codes from laravel API
    case getType(actions.getNftsList.request):
      return { ...state, nftList: entityLoadingStarted(state.nftList, action.payload) };
    case getType(actions.getNftsList.success):
      return { ...state, nftList: entityLoadingSucceeded(state.nftList, action.payload) };
    case getType(actions.getNftsList.failure):
      return { ...state, nftList: entityLoadingFailed(state.nftList) };

    case getType(actions.getNftsListByFilter.request):
      return { ...state, nftListByFilter: entityLoadingStarted(state.nftListByFilter, action.payload) };
    case getType(actions.getNftsListByFilter.success):
      return { ...state, nftListByFilter: entityLoadingSucceeded(state.nftListByFilter, action.payload) };
    case getType(actions.getNftsListByFilter.failure):
      return { ...state, nftListByFilter: entityLoadingFailed(state.nftListByFilter) };
    
    case getType(actions.getNftsListByFilter1.request):
      return { ...state, nftListByFilter1: entityLoadingStarted(state.nftListByFilter1, action.payload) };
    case getType(actions.getNftsListByFilter1.success):
      return { ...state, nftListByFilter1: entityLoadingSucceeded(state.nftListByFilter1, action.payload) };
    case getType(actions.getNftsListByFilter1.failure):
      return { ...state, nftListByFilter1: entityLoadingFailed(state.nftListByFilter1) };
      
    case getType(actions.getNftsListByUser.request):
      return { ...state, nftListByUser: entityLoadingStarted(state.nftListByUser, action.payload) };
    case getType(actions.getNftsListByUser.success):
      return { ...state, nftListByUser: entityLoadingSucceeded(state.nftListByUser, action.payload) };
    case getType(actions.getNftsListByUser.failure):
      return { ...state, nftListByUser: entityLoadingFailed(state.nftListByUser) };

    case getType(actions.getNftBreakdown.request):
      return { ...state, nftBreakdown: entityLoadingStarted(state.nftBreakdown, action.payload) };
    case getType(actions.getNftBreakdown.success):
      //append existing data with new data
      let payload = state.nftBreakdown.data ? [...state.nftBreakdown.data, ...remapObject(action.payload)] : remapObject(action.payload);
      return { ...state, nftBreakdown: entityLoadingSucceeded(state.nftBreakdown, payload) };
    case getType(actions.getNftBreakdown.failure):
      return { ...state, nftBreakdown: entityLoadingFailed(state.nftBreakdown) };
    
    // nft detail
    case getType(actions.getNftDetail.request):
      return { ...state, nftDetail: entityLoadingStarted(state.nftDetail, action.payload) };
    case getType(actions.getNftDetail.success):
      return { ...state, nftDetail: entityLoadingSucceeded(state.nftDetail, action.payload) };
    case getType(actions.getNftDetail.failure):
      return { ...state, nftDetail: entityLoadingFailed(state.nftDetail) };
    
    case getType(actions.getNftShowcase.request):
      return { ...state, nftShowcase: entityLoadingStarted(state.nftShowcase, action.payload) };
    case getType(actions.getNftShowcase.success):
      return { ...state, nftShowcase: entityLoadingSucceeded(state.nftShowcase, action.payload) };
    case getType(actions.getNftShowcase.failure):
      return { ...state, nftShowcase: entityLoadingFailed(state.nftShowcase) };

    case getType(actions.clearNfts):
      return { ...state, nftBreakdown: initEntityState(null)};
    
    default:
      return state;
  }
};

export default states;
