import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions/thunks';
import { clearNfts, clearFilter } from '../../store/actions';
import NftCard from './NftCard';
import { shuffleArray } from '../../store/utils';
import LoadingSpinner from '../pages/LoadingSpinner';

const ColumnNewRedux = ({ showLoadMore = true, shuffle = false, userId = null, itemType = false }) => {

    const dispatch = useDispatch();
    // const nftItems = useSelector(selectors.nftItems);
    // const nfts = nftItems ? shuffle ? shuffleArray(nftItems) : nftItems : [];
    // console.log("item=>", itemType)
    const nftStateByUser = useSelector(selectors.nftStateByUser);
    const _nfts = nftStateByUser.data ? shuffle ? shuffleArray(nftStateByUser.data) : [] : [];
    const nfts = itemType && _nfts && _nfts.length> 0 ? _nfts.filter(element => element.status !== 'has_offers') : _nfts;
    const [height, setHeight] = useState(0);

    const onImgLoad = ({target:img}) => {
        let currentHeight = height;
        if(currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }
    
    useEffect(() => {
        dispatch(actions.fetchAllNftsByUser(userId));
    }, [dispatch, userId]);

    //will run when component unmounted
    useEffect(() => {
        return () => {
            dispatch(clearFilter());
            dispatch(clearNfts());
        }
    },[dispatch]);

    const loadMore = () => {
        dispatch(actions.fetchAllNftsByUser(userId));
    }

    return (
        <div className='row'>
            {nfts && nfts.length>=0? nfts.map((nft, index) => (
                <NftCard nft={nft} key={index} onImgLoad={onImgLoad} height={height} />
            )) : <LoadingSpinner />}
            { showLoadMore && nfts.length <= 10 &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={loadMore} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </div>              
    );
};

export default memo(ColumnNewRedux);