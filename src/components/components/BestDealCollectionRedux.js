import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselCollection, mysettings } from './constants';
import * as selectors from '../../store/selectors';
import { fetchAllNftsByFilter } from "../../store/actions/thunks";
import CustomSlideBestDeal from "./CustomSlideBestDeal";

const BestDealCollectionRedux = () => {

	const dispatch = useDispatch();
  const nftStateByFilter = useSelector(selectors.nftStateByFilter);
  const nfts = nftStateByFilter.data ? nftStateByFilter.data : {};
  
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchAllNftsByFilter("transfers", 0));
    }, 2000);
		return () => clearInterval(interval);
	}, [dispatch]);

	
	return (
		<div className='nft'>
			<Slider {...mysettings}>
				{nfts && nfts.length > 0 && nfts.map((item, index) => (
					<CustomSlideBestDeal
						key={item.id}
						card={item}
				/>
				))}
			</Slider>
		</div>
	);
}

export default memo(BestDealCollectionRedux);
