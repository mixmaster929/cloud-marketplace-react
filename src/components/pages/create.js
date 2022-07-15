import React, { useEffect, useState, useCallback } from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import {
  approve,
  mintNFT,
} from "../../core/contracts/mint/interact";
import { createAuction } from '../../core/contracts/bid/interact';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import Select from 'react-select';
import * as selectors from '../../store/selectors';
import { fetchCollectionList } from "../../store/actions/thunks";
import { useSelector, useDispatch } from 'react-redux';
import request from '../../core/auth/request';
import api from '../../../src/core/api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import auth from "../../core/auth";

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
  const userInfo = auth.getUserInfo();
  const userID = userInfo.id;
  
  const availableStatus = {
    BUY_NOW: 'buy_now',
    ON_AUCTION: 'on_auction',
    HAS_OFFERS: 'has_offers',
  }
  const blockchainOptions = [
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'solana', label: 'Solana' }
  ]

  // const [status, setStatus] = useState("");           // mint response status
  const [isActive, setIsActive] = useState(false)     // unlock once purchased
  const [name, setName] = useState();                 // nft name
  const [description, setDescription] = useState(); // nft description
  const [price, setPrice] = useState(0);              // nft price
  const [royalty, setRoyalty] = useState();         // nft royalty
  const [chainId, setChain] = useState(blockchainOptions[0].value);             // blockchain id
  const [collectionId, setCollection] = useState();   // collection id

  const [fileImg, setFileImg] = useState(null);       // upload preview
  const [imageTemp, setImageTemp] = useState(null);

  const [isLoading, setLoading] = useState(false);    //component loading

  const [nftStatus, setNftStatus] = useState(availableStatus.ON_AUCTION);

  const [deadlinePreview, setDeadlinePreview] = useState('');
  const [deadlinePreviewTimestamp, setDeadlinePreviewTimestamp] = useState('');

  const collectionState = useSelector(selectors.collectionState);
  const collections = collectionState.data ? collectionState.data : {};
  const [collectionOptions, setCollectionOptions] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollectionList());
  }, [dispatch]);

  useEffect(() => {
    collections.length > 0 && collections.map((collection) => {
      setCollectionOptions((todo) => [...todo, { label: collection.name, value: collection.id }])
    })
  }, [collections]);

  useEffect(() => {
    if(collectionOptions.length>0)
    {
      setCollection(collectionOptions[0].value)
    }
  }, [collectionOptions]);

  const unlockClick = () => {
    setIsActive(true);
  }
  const unlockHide = () => {
    setIsActive(false);
  };

  const handleImagePicture = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setImageTemp(reader.result)
    };
    reader.readAsDataURL(file);

    setFileImg(file);
  }

  const sendFileToIPFS = async (e) => {

    if (!fileImg || !name) {
      return
    }
    let ImgHash = false;
    setLoading(true)
    if (fileImg) {
      try {
        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data"
          },
        });
        ImgHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
        console.log("ImgHash=>", ImgHash);
        onMintProcess(ImgHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.   

      } catch (error) {
        console.log("Error sending File to IPFS: ")
        console.log(error)
      }
    }
  }

  const onMintProcess = async (tokenURI) => {
    const { success } = await mintNFT(tokenURI, price, deadlinePreview, deadlinePreviewTimestamp, name, description, collectionId, chainId, royalty);
    if (success) {
      const { approve_success } = await approve();
      if (approve_success) {
        const { auction_success } = await createAuction(price, deadlinePreviewTimestamp);
        if (auction_success) {
          const requestURL = api.localbaseUrl +'/nfts';
          const nftDetail = { userID, tokenURI, price, deadlinePreview, deadlinePreviewTimestamp, name, description, collectionId, chainId, royalty }

          await request(requestURL, { method: 'POST', body: nftDetail })
            .then((response) => {
              if(response.success){
                setLoading(false)
                setName();
                setDescription();
                setPrice(0);
                setRoyalty();
                setImageTemp(null);
                setFileImg(null);
                setDeadlinePreview('');
                setDeadlinePreviewTimestamp('');
                NotificationManager.success('Minted successfully!');
              }
            }).catch((err) => {
              console.log(err);
              NotificationManager.error('Failed to save data to database!');
            });
        }
        else{
          NotificationManager.error('Failed on Auction Creation!');
        }
      }
      else{
        NotificationManager.error('Failed on NFT approve!');
      }
    }
    else{
      NotificationManager.error('Failed on Mint!');
    }
  };

  

  const blockchainSelection = (e) => {
    setChain(e.value)
  }

  const onChangeTitle = (e) => {
    setName(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onChangePrice = (e) => {
    setPrice(e.target.value)
  }

  const onChangeRoyalty = (e) => {
    setRoyalty(e.target.value)
  }

  const onChangeCollection = (e) => {
    setCollection(e.value)
  }

  const handleShow = () => {
    setNftStatus(availableStatus.BUY_NOW);
    document.getElementById("btn1").classList.add("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.remove("active");
  }
  const handleShow1 = () => {
    setNftStatus(availableStatus.ON_AUCTION);
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.add("active");
    document.getElementById("btn3").classList.remove("active");
  }
  const handleShow2 = () => {
    setNftStatus(availableStatus.HAS_OFFERS);
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.add("active");
  }

  const handleDeadlinePreview = (e) => {
    setDeadlinePreview(e.target.value)
    const current_timestamp = e.target.valueAsNumber;
    const localOffset = (-1) * new Date().getTimezoneOffset() * 60000;

    const timestamp = Math.round(new Date(current_timestamp - localOffset).getTime() / 1000);

    setDeadlinePreviewTimestamp(timestamp)

  }

  return (
    <div>
      <GlobalStyles />
      <NotificationContainer/>
      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>Create New Item</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? <LoadingSpinner /> :
        <section className='container'>

          <div className="row">
            <div className="col-lg-7 offset-lg-1 mb-5">
              <div id="form-create-item" className="form-border">
                <div className="field-set">
                  <h5>Upload file</h5> {imageTemp === null ? <span className="requirefields">*Required fields</span> : <span />}

                  <div className="d-create-file">
                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                    <div className='browse'>
                      <input type="button" id="get_file" className="btn-main" value="Browse" />
                      <input id='upload_file' type="file" onChange={(e) => handleImagePicture(e)} required />
                    </div>

                  </div>

                  <div className="spacer-single"></div>

                  <h5>Select method</h5>
                  <div className="de_tab tab_methods">
                    <ul className="de_nav">
                      {/* <li id='btn1' onClick={() => handleShow()}>
                        <span>
                          <i className="fa fa-tag"></i>Fixed price </span>
                      </li> */}
                      <li id='btn2' className="active">
                        <span>
                          <i className="fa fa-hourglass-1"></i>Timed auction </span>
                      </li>
                      {/* <li id='btn3' onClick={() => handleShow2()}>
                        <span>
                          <i className="fa fa-users"></i>Open for bids </span>
                      </li> */}
                    </ul>
                    <div className="de_tab_content pt-3">
                      <div id="tab_opt_1" className={nftStatus === availableStatus.ON_AUCTION ? 'hide' : ''}>
                        <h5>Price</h5>
                        <span className="requirefields">*Required fields</span>
                        <input onChange={(e) => onChangePrice(e)} type="number" name="price" id="price" className="form-control" placeholder="enter price for one item (ETH)" />

                      </div>
                      <div id="tab_opt_2" className={nftStatus === availableStatus.BUY_NOW ? 'hide' : ''}>
                        <h5>Minimum bid</h5>
                        {(price === 0 || price === null) && <span className="requirefields">*Required fields</span>}
                        <input type="number" name="price" id="price" onChange={(e) => onChangePrice(e)} className="form-control" placeholder="Enter minimum bid" />

                        <div className="spacer-20"></div>
                        <div className="row">
                          <div className="col-md-6">
                            <h5>Expiration date</h5>
                            {(deadlinePreview === '' || deadlinePreview === null) && <span className="requirefields">*Required fields</span>}
                            <input onBlur={handleDeadlinePreview} type="datetime-local" name="deadline" id="deadline" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div id="tab_opt_3"></div>
                    </div>
                  </div>
                  <div className="spacer-10"></div>

                  <h5>Name</h5>{name ? null : <span className="requirefields">*Required fields</span>}
                  <input type="text" name="item_title" id="item_title" className="form-control" onChange={(e) => onChangeTitle(e)} placeholder="e.g. 'Crypto Funk" />

                  <div className="spacer-10"></div>

                  <h5>Description</h5>
                  <textarea data-autoresize name="item_desc" id="item_desc" className="form-control" onChange={(e) => onChangeDescription(e)} placeholder="e.g. 'This is very limited item'"></textarea>

                  <div className="spacer-10"></div>

                  <h5>Collection</h5>
                  {collectionOptions && collectionOptions.length>0 &&
                  <Select name="item_collection" id="item_collection" options={collectionOptions} onChange={(e) => onChangeCollection(e)} defaultValue={collectionOptions[0]} />}
                  <div className="spacer-10"></div>

                  <div className="switch-with-title">
                    <h5><i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>Unlock once purchased</h5>
                    <div className="de-switch">
                      <input type="checkbox" id="switch-unlock" className="checkbox" />
                      {isActive ? (
                        <label htmlFor="switch-unlock" onClick={unlockHide}></label>
                      ) : (
                        <label htmlFor="switch-unlock" onClick={unlockClick}></label>
                      )}
                    </div>
                    <div className="clearfix"></div>
                    <p className="p-info pb-3">Unlock content after successful transaction.</p>

                    {isActive ?
                      <div id="unlockCtn" className="hide-content">
                        <input type="text" name="item_unlock" id="item_unlock" className="form-control" placeholder="Access key, code to redeem or link to a file..." />
                      </div>
                      : null}
                  </div>
                  <h5>Blockchain</h5>
                  <Select name="item_blockchain" id="item_blockchain" onChange={blockchainSelection} options={blockchainOptions} defaultValue={blockchainOptions[0]} />
                  <div className="spacer-10"></div>
                  <h5>Royalties</h5>
                  <input type="number" name="item_royalties" id="item_royalties" className="form-control" onChange={(e) => onChangeRoyalty(e)} placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" />
                  <div className="spacer-10"></div>
                  <button id="mintButton" className="btn-main" onClick={(e) => sendFileToIPFS(e)}>Create Item</button>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <h5>Preview item</h5>
              <div className="nft__item m-0">
                {deadlinePreview && <div className="de_countdown">
                  <Clock deadline={deadlinePreview} />
                </div>}
                <div className="author_list_pp">
                  <span>
                    <img className="lazy" src="./img/author/author-1.jpg" alt="" />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="nft__item_wrap">
                  <span>
                    <img src={imageTemp ? imageTemp : "./img/collections/coll-item-3.jpg"} id="get_file_2" className="lazy nft__item_preview" alt="" />
                  </span>
                </div>
                <div className="nft__item_info">
                  <span >
                    <h4>{name}</h4>
                  </span>
                  <div className="nft__item_price">
                    {price} ETH
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
          {/* <p id="status"> {status} </p> */}
        </section>
      }

      <Footer />
    </div>
  );
}

export default Createpage;