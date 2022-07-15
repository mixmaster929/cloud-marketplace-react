import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clock from "./Clock";
import { carouselNew, settings, settingsnew, carouselCollection, carouselCollectionSingle, carouselNew5 } from './constants';
import * as selectors from '../../store/selectors';
import { fetchNftsBreakdown } from "../../store/actions/thunks";
import api from "../../core/api";
import { totalSupplies, getAllTokenURIs } from "../../core/contracts/mint/interact";
import { Axios, Canceler } from '../../core/axios';
import {
	useNavigate,
} from "react-router-dom";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const CarouselNewRedux = () => {

	const [nfts, setNFT] = useState([])


	useEffect(async () => {
		const tokenUris = await getAllTokenURIs()
		if (tokenUris && tokenUris.length > 0) {
			await Promise.all(tokenUris.map(async (item) => {
				const { data } = await Axios.get(item)
				setNFT((todo) => [...todo, data])
			}));
		}

	}, [])

	const [height, setHeight] = useState(0);

	const onImgLoad = ({ target: img }) => {
		let currentHeight = height;
		if (currentHeight < img.offsetHeight) {
			setHeight(img.offsetHeight);
		}
	}
	const navigate = useNavigate();
	return (
		<div className='nft'>
			<Slider {...carouselCollection}>
				{nfts && nfts.length > 0 && nfts.map((nft, index) => (
					<div className='itm' index={index} key={index}>
						<div className="d-item">
							<div className="nft__item">
								{nft.deadline &&
									<div className="de_countdown">
										<Clock />
									</div>
								}
								<div className="author_list_pp">
									<span onClick={() => window.open("/home", "_self")}>
										{nft.image &&
											<img className="lazy" src={nft.image} alt="" />
										}
										<i className="fa fa-check"></i>
									</span>
								</div>
								<div className="nft__item_wrap" style={{ height: `${height}px` }}>
									<Outer>
										<span>
											<img src={nft.image} className="lazy nft__item_preview" onLoad={onImgLoad} alt="" />
										</span>
									</Outer>
								</div>
								<div className="nft__item_info">
									<span onClick={() => window.open("/", "_self")}>
										<h4>{nft.name}</h4>
									</span>
									<div className="nft__item_price">
										{nft.price} ETH<span>1/10</span>
									</div>
									<div className="nft__item_action">
										<span onClick={() => window.open("/", "_self")}>Place a bid</span>
									</div>
									<div className="nft__item_like">
										<i className="fa fa-heart"></i><span>333</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
}

export default memo(CarouselNewRedux);
