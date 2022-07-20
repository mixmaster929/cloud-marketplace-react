import React, { useEffect, useState, useCallback } from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { buyListItem, buyApprove } from '../../core/contracts/buy/interact';
import LoadingSpinner from './LoadingSpinner';
import * as selectors from '../../store/selectors';
import { fetchNftDetail } from "../../store/actions/thunks";
import { useSelector, useDispatch } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import auth from "../../core/auth";
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../core/api";
import request from '../../core/auth/request';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  .requirefields{
    color: red;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Createpage = () => {
  // const userInfo = auth.getUserInfo();
  // const userID = userInfo.id;
  const { id } = useParams();

  const [price, setPrice] = useState(0);              // nft price

  const [isLoading, setLoading] = useState(false);    //component loading
  const nftDetailState = useSelector(selectors.nftDetailState);
	const nft = nftDetailState.data ? nftDetailState.data[0] : [];
	
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNftDetail(id));
  }, [dispatch, id]);

  const [error, setError] = useState(true)
  const onChangePrice = (e) => {
    if(e.target.value === null || e.target.value ===""){
      setError(true);
    }
    else{
      setError(false)
    }
    setPrice(e.target.value)
  }

  const createBuyItem = (index) => {
    setLoading(true)
    const fetchData = async() => {
      const { buy_approve_success } = await buyApprove(index)
      if(buy_approve_success){
        const { buy_list_success } = await buyListItem(index, price)
        if(buy_list_success){
          const requestURL = api.localbaseUrl +'/nfts';
          // const nftDetail = { index, price }
          const data = { index, price, "item_type": "ready" }
          await request(requestURL, { method: 'PUT', body: data })
            .then((response) => {
                if(response.success){
                  setLoading(false)
                  NotificationManager.success('Minted successfully!');
                }
            }).catch((err) => {
                console.log(err);
                NotificationManager.error('Failed to save data to database!');
            });
        }
      }
    }
    fetchData()
  }

  return (
    <div>
      <GlobalStyles />
      <NotificationContainer />

      {isLoading ? <LoadingSpinner /> :
        <section className='container'>

          <div className="row">
            <div className="col-lg-7 offset-lg-1 mb-5">
              <div id="form-create-item" className="form-border">
                <div className="field-set">
                  <div className="spacer-single"></div>
                  <h5>Select method</h5>
                  <div className="de_tab tab_methods">
                    <ul className="de_nav">
                      <li id='btn1' className="active">
                        <span>
                          <i className="fa fa-tag"></i>Fixed price </span>
                      </li>
                    </ul>
                    <div className="de_tab_content pt-3">
                      <div id="tab_opt_1">
                        <h5>Price</h5>
                        {error && <span className="requirefields">*Required fields</span>}
                        <input onChange={(e) => onChangePrice(e)} type="number" name="price" id="price" className="form-control" placeholder="enter price for one item (ETH)" />
                      </div>
                    </div>
                  </div>
                  <div className="spacer-10"></div>
                  <button id="mintButton" className="btn-main" onClick={() => createBuyItem(id)}>Create Item</button>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <h5>Preview item</h5>
              <div className="nft__item m-0">
                <div className="author_list_pp">
                  <span>
                    <img className="lazy" src={nft.users && nft.users.avatar? (api.publicUrl + "/uploads/profiles/" + nft.users.avatar) : '../../img/author_single/author_thumbnail.jpg'} alt="" />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="nft__item_wrap">
                  <span>
                    <img src={nft && nft.preview_image && nft.preview_image} id="get_file_2" className="lazy nft__item_preview" alt="" />
                  </span>
                </div>
                <div className="nft__item_info">
                  <span >
                    <h4>{nft.title}</h4>
                  </span>
                  <div className="nft__item_price">
                    {price} / {nft.price} ETH
                  </div>
                  <div className="nft__item_action">
                    <span>Place a bid</span>
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i><span>50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }

      <Footer />
    </div>
  );
}

export default Createpage;