import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Clock from "../components/Clock";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from '../../store/selectors';
import { fetchNftDetail } from "../../store/actions/thunks";
import api from "../../core/api";
import auth from "../../core/auth";
import moment from "moment";
import { useNavigate, useParams } from 'react-router-dom';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #403f83;
    border-bottom: solid 1px #dddddd;
  }
  .mr40{
    margin-right: 40px;
  }
  .mr15{
    margin-right: 15px;
  }
  .btn2{
    background: #f6f6f6;
    color: #8364E2 !important;
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
	.nft-price{
		color: #0d0c22;
    font-weight: bold;
    font-size: 28px;
    padding-right: 10px;
	}
	.nft-price-img{
		width: 24px;
    height: 24px;
    margin-top: -12px;
    margin-right: 5px;
	}
  .btn-sell{
    float: right;
    width: max-content;
    text-align: center;
    color: #fff !important;
    background: rgb(0, 154, 213);
    border-radius: 6px;
    letter-spacing: normal;
    outline: 0;
    font-weight: 800;
    text-decoration: none;
    padding: 8px 40px;
    font-size: 16px;
    border: none
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

const ItemDetailRedux = () => {
	const { nftId } = useParams();

	const [openMenu0, setOpenMenu0] = React.useState(true);
	const [openMenu, setOpenMenu] = React.useState(false);
	const [openMenu1, setOpenMenu1] = React.useState(false);

	const handleBtnClick0 = () => {
		setOpenMenu0(!openMenu0);
		setOpenMenu(false);
		setOpenMenu1(false);
		document.getElementById("Mainbtn0").classList.add("active");
		document.getElementById("Mainbtn").classList.remove("active");
		document.getElementById("Mainbtn1").classList.remove("active");
	};
	const handleBtnClick = () => {
		setOpenMenu(!openMenu);
		setOpenMenu1(false);
		setOpenMenu0(false);
		document.getElementById("Mainbtn").classList.add("active");
		document.getElementById("Mainbtn1").classList.remove("active");
		document.getElementById("Mainbtn0").classList.remove("active");
	};
	const handleBtnClick1 = () => {
		setOpenMenu1(!openMenu1);
		setOpenMenu(false);
		setOpenMenu0(false);
		document.getElementById("Mainbtn1").classList.add("active");
		document.getElementById("Mainbtn").classList.remove("active");
		document.getElementById("Mainbtn0").classList.remove("active");
	};

	const dispatch = useDispatch();
	const nftDetailState = useSelector(selectors.nftDetailState);
	const nft = nftDetailState.data ? nftDetailState.data[0] : [];
	const users = nftDetailState.data ? nftDetailState.data[1] : [];
	// console.log("nft detail=>", nft)

	const [openCheckout, setOpenCheckout] = React.useState(false);
	const [openCheckoutbid, setOpenCheckoutbid] = React.useState(false);

	useEffect(() => {
		dispatch(fetchNftDetail(nftId));
	}, [dispatch, nftId]);

	const navigate = useNavigate();
	const navigateTo = (link) => {
		console.log("link=>", link)
		navigate(link);
	}

	const userInfo = auth.getUserInfo();

	return (
		<div>
			<GlobalStyles />
			<section className='container'>
				<div className='row mt-md-5 pt-md-4'>
					<div className="col-md-6 text-center">
						<img src={nft.preview_image} className="img-fluid img-rounded mb-sm-30" alt="" />
					</div>
					<div className="col-md-6">
						<div className="item_info">
							<div className="auction-detail">
								{nft.status === 'on_auction' &&
									<>
										Auctions ends in
										<div className="de_countdown">
											<Clock deadline={nft.deadline} />
										</div>
									</>
								}
								{(userInfo.id === nft.user_id) && <input type="button" className="btn-sell" value="Sell" onClick={() => navigateTo("/createone/" + nft.id)} />}
							</div>
							<h2>{nft.title}</h2>
							<div className="item_info_counts">
								<div className="item_info_type"><i className="fa fa-image"></i>{nft.category}</div>
								<div className="item_info_views"><i className="fa fa-eye"></i>{nft.views}</div>
								<div className="item_info_like"><i className="fa fa-heart"></i>{nft.likes}</div>
							</div>
							<p>{nft.description}</p>

							<div className="d-flex flex-row">
								<div className="mr40">
									<h6>Creator</h6>
									<div className="item_author">
										<div className="author_list_pp">
											<span>
												{/* nft creator image */}
												<img className="lazy" src={nft.users && nft.users.avatar ? (api.publicUrl + "/uploads/profiles/" + nft.users.avatar) : '../../img/author_single/author_thumbnail.jpg'} alt="" />
												<i className="fa fa-check"></i>
											</span>
										</div>
										<div className="author_list_info">
											{/* nft creator username */}
											<span>{nft.users && nft.users.username}</span>
										</div>
									</div>
								</div>
								<div className="mr40">
									<h6>Collection</h6>
									<div className="item_author">
										<div className="author_list_pp">
											<span>
												<img className="lazy" src={nft.preview_image} alt="" />
												<i className="fa fa-check"></i>
											</span>
										</div>
										<div className="author_list_info">
											<span>{nft.title}</span>
										</div>
									</div>
								</div>
							</div>

							<div className="spacer-40"></div>

							<div className="de_tab">

								<ul className="de_nav">
									<li id='Mainbtn0' className="active"><span onClick={() => handleBtnClick0()}>Details</span></li>
									<li id='Mainbtn' ><span onClick={() => handleBtnClick()}>Bids</span></li>
									<li id='Mainbtn1' className=''><span onClick={() => handleBtnClick1()}>History</span></li>
								</ul>

								<div className="de_tab_content">
									{openMenu0 && (
										<div className="tab-1 onStep fadeIn">
											<div className="d-block mb-3">
												<div className="mr40">
													<h6>Owner</h6>
													<div className="item_author">
														<div className="author_list_pp">
															<span>
																<img className="lazy" src={nft.users && nft.users.avatar ? (api.publicUrl + "/uploads/profiles/" + nft.users.avatar) : '../../img/author_single/author_thumbnail.jpg'} alt="" />
																<i className="fa fa-check"></i>
															</span>
														</div>
														<div className="author_list_info">
															<span>{nft.users && nft.users.username}</span>
														</div>
													</div>
												</div>

												<div className="row mt-5">
													<div className="col-lg-4 col-md-6 col-sm-6">
														<div className="nft_attr">
															<h5>Background</h5>
															<h4>Yellowish Sky</h4>
															<span>85% have this trait</span>
														</div>
													</div>
													<div className="col-lg-4 col-md-6 col-sm-6">
														<div className="nft_attr">
															<h5>Eyes</h5>
															<h4>Purple Eyes</h4>
															<span>14% have this trait</span>
														</div>
													</div>
													<div className="col-lg-4 col-md-6 col-sm-6">
														<div className="nft_attr">
															<h5>Nose</h5>
															<h4>Small Nose</h4>
															<span>45% have this trait</span>
														</div>
													</div>
													<div className="col-lg-4 col-md-6 col-sm-6">
														<div className="nft_attr">
															<h5>Mouth</h5>
															<h4>Smile Red Lip</h4>
															<span>61% have this trait</span>
														</div>
													</div>
													<div className="col-lg-4 col-md-6 col-sm-6">
														<div className="nft_attr">
															<h5>Neck</h5>
															<h4>Pink Ribbon</h4>
															<span>27% have this trait</span>
														</div>
													</div>
													<div className="col-lg-4 col-md-6 col-sm-6">
														<div className="nft_attr">
															<h5>Hair</h5>
															<h4>Pink Short</h4>
															<span>35% have this trait</span>
														</div>
													</div>
													<div className="col-lg-4 col-md-6 col-sm-6">
														<div className="nft_attr">
															<h5>Accessories</h5>
															<h4>Heart Necklace</h4>
															<span>33% have this trait</span>
														</div>
													</div>
													<div className="col-lg-4 col-md-6 col-sm-6">
														<div className="nft_attr">
															<h5>Hat</h5>
															<h4>Cute Panda</h4>
															<span>62% have this trait</span>
														</div>
													</div>
													<div className="col-lg-4 col-md-6 col-sm-6">
														<div className="nft_attr">
															<h5>Clothes</h5>
															<h4>Casual Purple</h4>
															<span>78% have this trait</span>
														</div>
													</div>
												</div>

											</div>
										</div>
									)}

									{openMenu && (
										<div className="tab-1 onStep fadeIn">
											{nft.bids && nft.bids.map((bid, index) => (
												<div className="p_list" key={index}>
													<div className="p_list_pp">
														<span>
															<img className="lazy" src={nft.users && nft.users.avatar ? (api.publicUrl + "/uploads/profiles/" + nft.users.avatar) : '../../img/author_single/author_thumbnail.jpg'} alt="" />
															<i className="fa fa-check"></i>
														</span>
													</div>
													<div className="p_list_info">
														Bid {(bid.user_id === nft.user_id) && 'accepted'} <b>{bid.value} ETH</b>
														<span>by <b>{users ? users.find(element => element.id === bid.user_id).username : nft.users.username}</b> at {moment(bid.created_at).format('L, LT')}</span>
													</div>
												</div>
											))}
										</div>
									)}

									{openMenu1 && (
										<div className="tab-2 onStep fadeIn">
											{nft.history && nft.history.map((bid, index) => (
												<div className="p_list" key={index}>
													<div className="p_list_pp">
														<span>
															<img className="lazy" src={api.baseUrl + bid.author.avatar.url} alt="" />
															<i className="fa fa-check"></i>
														</span>
													</div>
													<div className="p_list_info">
														Bid {bid.author.id === nft.author.id && 'accepted'} <b>{bid.value} ETH</b>
														<span>by <b>{bid.author.username}</b> at {moment(bid.created_at).format('L, LT')}</span>
													</div>
												</div>
											))}
										</div>
									)}
									<div className="">
										<h5>Price</h5>
										<div className="nft-price"><img className="nft-price-img" src="../../img/misc/ethereum.svg" alt="" />{nft.price}<span>($250)</span></div>
									</div>
									{/* button for checkout */}
									<div className="d-flex flex-row mt-5">
										<button className='btn-main lead mb-5 mr15' onClick={() => setOpenCheckout(true)}>Buy Now</button>
										<button className='btn-main btn2 lead mb-5' onClick={() => setOpenCheckoutbid(true)}>Place Bid</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
			{openCheckout &&
				<div className='checkout'>
					<div className='maincheckout'>
						<button className='btn-close' onClick={() => setOpenCheckout(false)}>x</button>
						<div className='heading'>
							<h3>Checkout</h3>
						</div>
						<p>You are about to purchase a <span className="bold">AnimeSailorClub #304</span>
							<span className="bold">from Monica Lucas</span></p>
						<div className='detailcheckout mt-4'>
							<div className='listcheckout'>
								<h6>
									Enter quantity.
									<span className="color">10 available</span>
								</h6>
								<input type="text" name="buy_now_qty" id="buy_now_qty" className="form-control" />
							</div>

						</div>
						<div className='heading mt-3'>
							<p>Your balance</p>
							<div className='subtotal'>
								10.67856 ETH
							</div>
						</div>
						<div className='heading'>
							<p>Service fee 2.5%</p>
							<div className='subtotal'>
								0.00325 ETH
							</div>
						</div>
						<div className='heading'>
							<p>You will pay</p>
							<div className='subtotal'>
								0.013325 ETH
							</div>
						</div>
						<button className='btn-main lead mb-5'>Checkout</button>
					</div>
				</div>
			}
			{openCheckoutbid &&
				<div className='checkout'>
					<div className='maincheckout'>
						<button className='btn-close' onClick={() => setOpenCheckoutbid(false)}>x</button>
						<div className='heading'>
							<h3>Place a Bid</h3>
						</div>
						<p>You are about to purchase a <span className="bold">AnimeSailorClub #304</span>
							<span className="bold">from Monica Lucas</span></p>
						<div className='detailcheckout mt-4'>
							<div className='listcheckout'>
								<h6>
									Your bid (ETH)
								</h6>
								<input type="text" className="form-control" />
							</div>
						</div>
						<div className='detailcheckout mt-3'>
							<div className='listcheckout'>
								<h6>
									Enter quantity.
									<span className="color">10 available</span>
								</h6>
								<input type="text" name="buy_now_qty" id="buy_now_qty" className="form-control" />
							</div>
						</div>
						<div className='heading mt-3'>
							<p>Your balance</p>
							<div className='subtotal'>
								10.67856 ETH
							</div>
						</div>
						<div className='heading'>
							<p>Service fee 2.5%</p>
							<div className='subtotal'>
								0.00325 ETH
							</div>
						</div>
						<div className='heading'>
							<p>You will pay</p>
							<div className='subtotal'>
								0.013325 ETH
							</div>
						</div>
						<button className='btn-main lead mb-5'>Checkout</button>
					</div>
				</div>
			}
		</div>
	);
}

export default memo(ItemDetailRedux);