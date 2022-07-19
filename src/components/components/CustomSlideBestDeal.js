import React, { memo, useState, useEffect } from "react";
import { createGlobalStyle } from 'styled-components';
import Modals from '../pages/Modal/payment';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const GlobalStyles = createGlobalStyle`
	.nft__item{
		padding: 0;
	}
	.nft__item_wrap{
		margin-top: 0;
	}
`;

const CustomSlideBestDeal = ({ card }) => {
  
  const [toggleModal, setToggleModal] = useState(false);
  const navigate = useNavigate();
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  }

  const openBidModal = (e) => {
    setToggleModal(true)
  }

  const handleClose = (value) => {
    setToggleModal(value)
  }

  const goNFTDetail = (id) => {
    navigate("/ItemDetail/" + id);
  }

  return (
    <div>
      <GlobalStyles />
        <div className='itm' index={card.id}>
          {toggleModal && <Modals onClick={() => handleClose()} cardItem={card} maxPrice={card.price} type="buy" />}
          <div className="d-item">
            <div className="nft__item">
              <div className="nft__item_wrap" style={{ height: `${height}px` }}>
                <Outer>
                  <span>
                    <img src={card.preview_image} className="lazy nft__item_preview" onLoad={onImgLoad} alt="" />
                  </span>
                </Outer>
              </div>
              <div className="nft__item_info">
                <span onClick={() => window.open("/", "_self")}>
                  <h4>{card.title}</h4>
                </span>
                <div className="nft__item_price">
                  {card.price} ETH<span>1/10</span>
                </div>
                <div className="nft__item_action">
                  <input type="button" onClick={(e) => openBidModal(e)} className="btn-bid" value="Buy" />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default memo(CustomSlideBestDeal);