import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { fetchCategoryList, fetchCollectionList, fetchAllNfts, fetchAllNftsByFilter } from "../../store/actions/thunks";
import { createGlobalStyle } from 'styled-components';
import LoadingSpinner from '../pages/LoadingSpinner'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

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
	.filter-sub1-active{
		border: none;
		background: none;
		color: #0066FF !important;

	}
	@media only screen and (max-width: 1199px) {

	}
`;
const CheckboxFilter = ({ category, nfts }) => {
	const [isLoading, setLoading] = useState(false);
	const [styleBtn, setStyleBtn] = useState(0);

	const dispatch = useDispatch();

	const categoriesState = useSelector(selectors.categoriesState);
	const categories = categoriesState.data ? categoriesState.data : {};
	// console.log("categories=>", categories)
	// const collectionState = useSelector(selectors.collectionState);
	// const nftCollections = collectionState.data ? collectionState.data : {};
	// console.log("nftCollections=>", nftCollections)
	// const nftStateByFilter = useSelector(selectors.nftStateByFilter);
	// const nfts = nftStateByFilter.data ? nftStateByFilter.data : {};

	// console.log("nfts=>", nfts)

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchCategoryList());
		// dispatch(fetchCollectionList());
		// dispatch(fetchAllNftsByFilter(category, 0));
	}, [dispatch]);

	const setStyleToButton = (each) => {
		console.log("index=>", each)
		setStyleBtn(each.id)
		navigate("/explore/" + category + "/" + each.id)
	}

	return (
		<div>
			<GlobalStyles />
			{isLoading ? <LoadingSpinner /> :
				<div className="accordion accordion-flush" id="accordionExample">
					{categories.length > 0 && categories.map((item, _index) => (
						<div className="accordion-item" key={_index}>
							<h2 className="accordion-header" id={_index}>
								<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne_" + _index} aria-expanded="true" aria-controls={"collapseOne_" + _index}>
									{item.name}
								</button>
							</h2>
							<div id={"collapseOne_" + _index} className="accordion-collapse collapse" aria-labelledby={_index} data-bs-parent="#accordionExample">
								<div className="accordion-body">
									{item.collections && item.collections.length > 0 && item.collections.map((collection, index) => {
										// if (each.value === category.id) {
											const result = nfts && nfts.length > 0 && nfts.filter(element => element.collection_id === collection.id);
											const counter = result ? result.length : 0
											return (<Link to={"/explore/" + category + "/" + collection.id} key={index}><button className='filter-sub1-active' id={"btn_" + collection.id}>{collection.name}<span className='filter-sub2'>{"(" + counter + ")"}</span></button></Link>)
										// }
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