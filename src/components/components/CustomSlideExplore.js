import React, { memo, useState, useEffect } from "react";
import { createGlobalStyle } from 'styled-components';
import Clock from "./Clock";
import Modals from '../pages/Modal/payment';
import LoadingSpinner from '../pages/LoadingSpinner';
import { claimToken, getCurrentBid, isOpen, getCurrentBidOwner } from '../../core/contracts/bid/interact'
import request from '../../core/auth/request';
import auth from '../../core/auth';
import api from '../../../src/core/api'

const GlobalStyles = createGlobalStyle`
.nft_coll{
  padding-bottom: 0px;
  margin: 0px;
}
.nft-detail-sub2{
  font-size: 15px;
    font-weight: 700;
    text-align: left;
    margin-top: 10px;
    margin-left: 5px;
    font-family: apercu-pro, system-ui, sans-serif;
    line-height: 22px;
}
.nft-detail-sub3{
  margin-bottom: 10px;
}
.nft-detail-sub4{
  margin-top: 35px;
  // margin-left: 5x;
  // margin-right: 5px;
}
.nft-detail-countbids{
  float: right;
  margin-right: 5px;
  font-size: 0.7rem;
}
.nft-detail-countdown{
  float: left;
  // margin-left: 10px;
  // position: relative;
    font-size: 0.7rem;
    position: absolute;
    // right: 20px;
    // background: #ffffff;
    padding: 6px 10px;
    padding-left: 5px;
    border-radius: 30px;
    // -moz-border-radius: 30px;
    // -webkit-border-radius: 30px;
    // border: solid 2px #8364E2;
    z-index: 1;
    color: #0d0c22;
    .Clock-days{
      font-weight: bold;
      display: inline-block;
      margin-right: 5px;
    }
    .Clock-hours{
      font-weight: bold;
      display: inline-block;
      margin-right: 5px;
    }
    .Clock-minutes{
      font-weight: bold;
      display: inline-block;
      margin-right: 5px;
    }
    .Clock-seconds{
      font-weight: bold;
      display: inline-block;
      margin-right: 5px;
    }
}
  .btn-bid{
    min-width: 100%;
    background-color: #0066FF;
    display: block;
    width: max-content;
    text-align: center;
    color: #fff !important;
    border-radius: 6px;
    letter-spacing: normal;
    outline: 0;
    font-weight: 800;
    text-decoration: none;
    padding: 8px 40px;
    font-size: 14px;
    border: none
  }
 .btn-bid:hover{
  background:  #23C3A3;
}
`;

const CustomSlideExplore = ({ card }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [showNFT, setShowNFT] = useState(true);
  const [maxPrice, setMaxPrice] = useState(card.price)
  const [isLoading, setLoading] = useState(false);
  const [bidCounter, setBidCounter] = useState(0);
  const [rendering, setRendering] = useState();

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setRendering({})
    // }, 3000);
		// return () => clearInterval(interval);
	}, []);

  useEffect(async () => {
    const currentBid = await getCurrentBid(card.id - 1);
    setBidCounter(currentBid[1]);
    let arr_prices = [];
    card.bids && card.bids.length > 0 && card.bids.map((item) => {
      arr_prices.push(item.value)
    })
    const max = arr_prices.length > 0 ? Math.max(...arr_prices) : 0;
    setMaxPrice(max)
  }, [card]);

  
  useEffect(() => {
    if (showNFT) {
      const interval = setInterval(() => {
        const timestamp1 = Number(card.deadline_timestamp);
        var timestamp2 = Math.round(new Date().getTime() / 1000);

        if ((timestamp1 - timestamp2) < 5 && (timestamp1 - timestamp2) > 0) {
          setLoading(true)
        }
        if ((timestamp1 - timestamp2) === 0) {
          clearInterval(interval)
          updateNFT(card.id)
          setLoading(false)
        }
        if((timestamp1 - timestamp2) < 0){
          clearInterval(interval)
          setShowNFT(false)
          return;
        }

      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const updateNFT = async (auctionId) => {
    console.log("updateNFT ended")
    const currentBid = await getCurrentBid(auctionId - 1);
    const currentBidOwner = await getCurrentBidOwner(auctionId - 1);
    const userInfo = auth.getUserInfo();
    const data = { auctionId, currentBidOwner }

    if (currentBid) {
      const requestURL = api.localbaseUrl + '/nfts';
      await request(requestURL, { method: 'PUT', body: data })
        .then((response) => {
        }).catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
      console.log("userInfo.email=>", userInfo.email)
      if (userInfo.email === 'smart.topdev929@gmail.com'){
        const isOpend = await isOpen(auctionId-1)
        if(!isOpend){
          console.log("auction ended")
          // await claimToken(auctionId - 1)
        }
      }
    }
  }

  const openBidModal = (e) => {
    setToggleModal(true)
  }

  const handleClose = (value) => {
    setToggleModal(value)
  }

  return (
    <div>
      <GlobalStyles />
      {isLoading ? <LoadingSpinner /> :
        showNFT && <div className='itm' index={card.id}>
          {toggleModal && <Modals onClick={() => handleClose()} cardItem={card} maxPrice={maxPrice} />}
          <div className="nft_coll">
            <div className="nft_wrap">
              <span><img src={card.preview_image} className="lazy img-fluid" alt="" /></span>
            </div>
            <div className="nft_coll_pp">
            </div>
            <div className="nft_coll_info">
              <div className="nft-detail">
                <div className="nft-detail-sub1">

                </div>
                <div className="nft-detail-sub2">
                  <span>{maxPrice !== 0 ? maxPrice : card.price} ETH</span>
                </div>
                <div className="nft-detail-sub3">
                  <div className="nft-detail-countdown"><Clock deadline={card.deadline} /></div>
                  <span className="nft-detail-countbids">{bidCounter} bids</span>
                </div>
                <div className="nft-detail-sub4">
                  <input type="button" onClick={(e) => openBidModal(e)} className="btn-bid" value="Bid" />
                </div>
              </div>
              <span>{card.uniqueId}</span>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default memo(CustomSlideExplore);