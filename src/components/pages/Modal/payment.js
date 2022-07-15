import { Button, Modal, Tab, Tabs } from 'react-bootstrap';
import React, { memo, useEffect, useState } from "react";
import { createGlobalStyle } from 'styled-components';
import { placeBid, getCurrentBid } from "../../../core/contracts/bid/interact";
import LoadingSpinner from '../LoadingSpinner';
import request from '../../../core/auth/request';
import auth from '../../../core/auth';
import api from '../../../core/api';
import { useDispatch } from 'react-redux';

const GlobalStyles = createGlobalStyle`
	.modal-price1{
		margin-left:5px;
		outline: none !important;
		border: none !important;
		color: #0066FF;
		margin-top: 25px;
		font-size: 15px;
		&:focus {
			outline: none !important;
			border: none !important;
		}
	}
	.btn-bid:disabled{
		background:  #fff !important;
		color: #0066FF !important;
		cursor: no-drop;
		border: 1px solid #0066FF;
 }
	.error {
		color: #FC4118;
	}
	.modal-price2{
		margin-bottom: 15px;
		margin-left: 5px;
	}
	.add-payment1{
		float: left;
	}
	.add-payment2{
		color: #FC4118;
		float: right;
	}
`;

const Modals = ({ onClick, cardItem, maxPrice }) => {
	const [value, setInitialAmount] = useState(maxPrice ? maxPrice : cardItem.price);
	const [error, setError] = useState(true);
	const [isLoading, setLoading] = useState(false);    //component loading
	const dispatch = useDispatch();
	const handlePrice = (e) => {
		setInitialAmount(e.target.value)
		const diff = Number(e.target.value) - cardItem.price;
		if (diff <= 0) {
			setError(true)
		}
		else {
			setError(false)
		}
	}
	const placeAuctionBid = async (e, index) => {
		setLoading(true);
		const { bid_success, bid_status, address } = await placeBid(String(value), index - 1)
		if (bid_success) {
			const userInfo = auth.getUserInfo();
			const user_id = userInfo.id;
			const nft_id = cardItem.id;
			const nftbid = { user_id, nft_id, value, address }

			const requestURL = api.localbaseUrl +'/nftbid';
			await request(requestURL, { method: 'POST', body: nftbid })
				.then((response) => {
					if (response.success) {
						// dispatch(fetchAllNfts());
					}
				}).catch((err) => {
					console.log(err);
				}).finally(() => {
					setLoading(false);
				});
		}
	}

	const placeAuctionCreditBid = () => {

	}
	const [tabKey, initTabKey] = useState('one')
	return (
		<div>
			<GlobalStyles />
			<Modal show={true} onHide={onClick}>
				<Modal.Header>
					<Modal.Title></Modal.Title>
					<div className="form-border w-100">
						<div className="de_tab tab_simple">
							<div className="de_tab_content">
								<div className="tab-1">
									<div className="row wow fadeIn animated" style={{ backgroundSize: 'cover', visibility: 'visible', animationName: 'fadeIn' }}>
										<div className="col-lg-12 mb-sm-20">
											<div className="field-set">
												<Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
													<Tab eventKey="one" title="ETH">
														ETH<input type="number" className="modal-price1" autoFocus value={value} onChange={handlePrice} />
														{error && <div className='error'>Amount is too low</div>}
														<div>≈<span className="modal-price2">€{Number(cardItem.price) * Number(2000)}</span></div>
														{/* <div style={{marginTop: '10px', marginBottom: '10px'}}>
															<span className='add-payment1'>Payment method</span>
															<span className='add-payment2'>Select/Add a credit card</span>
														</div> */}
														<div className="btn-modal-footer">
															{isLoading ? <LoadingSpinner /> :
																<input type="button" id="bid-button" onClick={(e) => placeAuctionBid(e, cardItem.id)} className="btn-bid" value="Bid" disabled={error} />
															}
														</div>
														<div style={{ marginTop: '10px', marginBottom: '10px' }}>
															<div>You bid on</div>
															<div></div>
														</div>
														<div style={{ marginTop: '10px', marginBottom: '10px' }}>
															<div>Balances</div>
															<div></div>
														</div>
													</Tab>
													<Tab eventKey="two" title="Credit Card">
														ETH<input type="number" className="modal-price1" autoFocus value={value} onChange={handlePrice} />
														{error && <div className='error'>Amount is too low</div>}
														<div>≈<span className="modal-price2">€{Number(cardItem.price) * Number(2000)}</span></div>
														<div style={{ marginTop: '10px', marginBottom: '10px' }}>
															<span className='add-payment1'>Payment method</span>
															<span className='add-payment2'>Select/Add a credit card</span>
														</div>
														<div className="btn-modal-footer">
															<input type="button" id="credit-button" onClick={(e) => placeAuctionCreditBid(e)} className="btn-bid" value="Bid" />
														</div>
														<div style={{ marginTop: '10px', marginBottom: '10px' }}>
															<div>You bid on</div>
															<div></div>
														</div>
													</Tab>
												</Tabs>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Header>
			</Modal>
		</div>
	)
}

export default memo(Modals);