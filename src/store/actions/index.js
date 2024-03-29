import { 
    createAction as action, 
    createAsyncAction as asyncAction 
} from 'typesafe-actions';

export const getNftBreakdown = asyncAction(
    'nft/GET_NFT_BREAKDOWN',
    'nft/GET_NFT_BREAKDOWN_SUCCESS',
    'nft/GET_NFT_BREAKDOWN_FAIL'
)();

export const getNftShowcase = asyncAction(
    'nft/GET_NFT_SHOWCASE',
    'nft/GET_NFT_SHOWCASE_SUCCESS',
    'nft/GET_NFT_SHOWCASE_FAIL'
)();

export const getNftDetail = asyncAction(
    'nft/GET_NFT_DETAIL',
    'nft/GET_NFT_DETAIL_SUCCESS',
    'nft/GET_NFT_DETAIL_FAIL'
)();

export const getHotCollections = asyncAction(
    'nft/GET_HOT_COLLECTIONS',
    'nft/GET_HOT_COLLECTIONS_SUCCESS',
    'nft/GET_HOT_COLLECTIONS_FAIL'
)();

export const getAuthorList = asyncAction(
    'nft/GET_AUTHOR_LIST',
    'nft/GET_AUTHOR_LIST_SUCCESS',
    'nft/GET_AUTHOR_LIST_FAIL'
)();

export const getAuthorRanking = asyncAction(
    'nft/GET_AUTHOR_RANKING',
    'nft/GET_AUTHOR_RANKING_SUCCESS',
    'nft/GET_AUTHOR_RANKING_FAIL'
)();

export const getBlogPosts = asyncAction(
    'nft/GET_BLOG_POSTS',
    'nft/GET_BLOG_POSTS_SUCCESS',
    'nft/GET_BLOG_POSTS_FAIL'
)();

export const getRecentPosts = asyncAction(
    'nft/GET_RECENT_POSTS',
    'nft/GET_RECENT_POSTS_SUCCESS',
    'nft/GET_RECENT_POSTS_FAIL'
)();

export const getTags = asyncAction(
    'nft/GET_TAGS',
    'nft/GET_TAGS_SUCCESS',
    'nft/GET_TAGS_FAIL'
)();

export const getComments = asyncAction(
    'nft/GET_COMMENTS',
    'nft/GET_COMMENTS_SUCCESS',
    'nft/GET_COMMENTS_FAIL'
)();

export const getCategoryList = asyncAction(
    'nft/GET_CATEGORY_LIST',
    'nft/GET_CATEGORY_LIST_SUCCESS',
    'nft/GET_CATEGORY_LIST_FAIL'
)();

export const getNotificationList = asyncAction(
    'nft/GET_NOTIFICATION_LIST',
    'nft/GET_NOTIFICATION_LIST_SUCCESS',
    'nft/GET_NOTIFICATION_LIST_FAIL'
)();

export const getCollectionList = asyncAction(
    'nft/GET_COLLECTION_LIST',
    'nft/GET_COLLECTION_LIST_SUCCESS',
    'nft/GET_COLLECTION_LIST_FAIL'
)();

export const getNftsList = asyncAction(
    'nft/GET_NFTS_LIST',
    'nft/GET_NFTS_LIST_SUCCESS',
    'nft/GET_NFTS_LIST_FAIL'
)();

export const getNftsListByFilter = asyncAction(
    'nft/GET_NFTS_LIST_BY_FILTER',
    'nft/GET_NFTS_LIST_SUCCESS_BY_FILTER',
    'nft/GET_NFTS_LIST_FAIL_BY_FILTER'
)();

export const getNftsListByFilter1 = asyncAction(
    'nft/GET_NFTS_LIST_BY_FILTER1',
    'nft/GET_NFTS_LIST_SUCCESS_BY_FILTER1',
    'nft/GET_NFTS_LIST_FAIL_BY_FILTER1'
)();

export const getNftsListByUser = asyncAction(
    'nft/GET_NFTS_LIST_BY_USER',
    'nft/GET_NFTS_LIST_SUCCESS_BY_USER',
    'nft/GET_NFTS_LIST_FAIL_BY_USER'
)();

export const clearNfts = action('nft/CLEAR_ALL_NFTS')();
export const clearFilter = action('nft/CLEAR_FILTER')();
export const filterCategories = action('nft/FILTER_CATEGORIES')();
export const filterStatus = action('nft/FILTER_STATUS')();
export const filterItemsType = action('nft/FILTER_ITEMS_TYPE')();
export const filterCollections = action('nft/FILTER_COLLECTIONS')();
export const filterNftTitle = action('nft/FILTER_NFT_TITLE')();