import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselCollection, mysettings } from "./constants";
import CustomSlide from "./CustomSlide";
import * as selectors from '../../store/selectors';
import { fetchAllNfts } from "../../store/actions/thunks";

const NewCardCollectionRedux = () => {
  

  const dispatch = useDispatch();
  const nftState = useSelector(selectors.nftState);
	const nfts = nftState.data ? nftState.data : {};
  
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchAllNfts());
    }, 2000);
		return () => clearInterval(interval);
	}, [dispatch]);

  return (
    <div className='nft'>
      <Slider {...mysettings}>
        {nfts && nfts.length > 0 && nfts.map((item, index) => (
          <CustomSlide
            key={item.id}
            card={item}
          />
        ))}
      </Slider>
    </div>
  );
}

export default memo(NewCardCollectionRedux);
