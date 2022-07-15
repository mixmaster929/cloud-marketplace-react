import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings, carouselCollection } from "./constants";
import CustomSlide from "./CustomSlide";
import * as selectors from '../../store/selectors';
import { fetchAllNfts } from "../../store/actions/thunks";

const CarouselCollectionRedux = () => {
  

  const dispatch = useDispatch();
  const nftState = useSelector(selectors.nftState);
	const nfts = nftState.data ? nftState.data : {};
  
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchAllNfts());
    }, 3000);
		return () => clearInterval(interval);
	}, [dispatch]);

  return (
    <div className='nft'>
      <Slider {...carouselCollection}>
        {nfts && nfts.length > 0 && nfts.map((item, index) => (
          <CustomSlide
            key={index}
            card={item}
          />
        ))}
      </Slider>
    </div>
  );
}

export default memo(CarouselCollectionRedux);
