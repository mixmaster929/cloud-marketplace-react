import { combineReducers } from 'redux';
import nftReducer from './nfts';
import hotCollectionsReducer from './hotCollections';
import authorListReducer from './authorList';
import filterReducer from './filters';
import blogPostsReducer from './blogs';
import categoryReducer from './categories';
import collectionReducer from './collections';

export const rootReducer = combineReducers({
  NFT: nftReducer,
  hotCollection: hotCollectionsReducer,
  authors: authorListReducer,
  filters: filterReducer,
  blogs: blogPostsReducer,
  categories: categoryReducer,
  collections: collectionReducer, 
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;