import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { fetchCategoryList, fetchCollectionList, fetchAllNfts, fetchAllNftsByFilter } from "../../store/actions/thunks";
import { createGlobalStyle } from 'styled-components';
import LoadingSpinner from '../pages/LoadingSpinner'
import { useNavigate, useParams } from 'react-router-dom';
import request from '../../core/auth/request';
import api from '../../../src/core/api'

const GlobalStyles = createGlobalStyle`
	.accordion-button{
		padding: 0px;
	}
	.accordion-button:not(.collapsed){
		color: #212529;
		background-color: white;
	}
	.accordion-button:focus{
		border-color: white;
		box-shadow: none;
	}
	.accordion-body{
		padding: 0px;
	}
	.filter-sub1{
		border: none;
		background: none;
	}
	.filter-sub1:active {
		color: #0066FF !important;
	}
	@media only screen and (max-width: 1199px) {

	}
`;
const CheckboxFilter = (filter) => {
	const [isLoading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const categoriesState = useSelector(selectors.categoriesState);
	const categories = categoriesState.data ? categoriesState.data : {};

	const collectionState = useSelector(selectors.collectionState);
	const nftCollections = collectionState.data ? collectionState.data : {};
	
	const nftState = useSelector(selectors.nftState);
	const nfts = nftState.data ? nftState.data : {};
	console.log("nfts=>", nfts)
	const navigate = useNavigate();
	const { category, id } = useParams();

	useEffect(() => {
		dispatch(fetchCategoryList());
		dispatch(fetchCollectionList());
		dispatch(fetchAllNfts());
	}, [dispatch]);

	const getNftsWithCollectionId = (idk) => {
		navigate("/explore/" + category + "/" + idk);
	}
	const [counters, setCounter] = useState(0)
	const getNftCounters = async (collection_id) => {
		const requestURL = api.localbaseUrl + '/getNftCounters';
		const { data } = await request(requestURL, { method: 'POST', body: { collection_id } })
		// setCounter(data)
		// return data;
	}
	
	return (
		<div>
			<GlobalStyles />
			{isLoading ? <LoadingSpinner /> :
				<div className="accordion accordion-flush" id="accordionExample">
					{categories.length > 0 && categories.map((category, index) => (
						<div className="accordion-item" key={index}>
							<h2 className="accordion-header" id={index}>
								<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne_" + index} aria-expanded="true" aria-controls={"collapseOne_" + index}>
									{/* categories */}
									{category.name}
								</button>
							</h2>
							<div id={"collapseOne_" + index} className="accordion-collapse collapse" aria-labelledby={index} data-bs-parent="#accordionExample">
								<div className="accordion-body">
									{/* collections */}
									{nftCollections && nftCollections.length > 0 && nftCollections.map((each, index) => {
										if(each.category_id === category.id){
											const result = nfts && nfts.length>0 && nfts.find(element => element.collection_id === each.id);
											const counter = result? new Array(result).length : 0
											return (<button key={ index } className='filter-sub1' onClick={(e) => getNftsWithCollectionId(each.id)}>{each.name}<span className='filter-sub2'>{"(" + counter + ")"}</span></button>)
										}
									})}
								</div>
							</div>
						</div>
					))}
				</div>}
		</div>
	);
}

export default memo(CheckboxFilter)