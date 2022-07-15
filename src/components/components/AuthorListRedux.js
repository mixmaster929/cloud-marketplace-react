import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import UserTopSeller from './UserTopSeller';
import * as selectors from '../../store/selectors';
import { fetchAuthorList } from "../../store/actions/thunks";
import { totalSupplies, getAllTokenURIs } from "../../core/contracts/mint/interact";
import { Axios, Canceler } from '../../core/axios';

const AuthorList = () => {
    
    // const dispatch = useDispatch();
    // const authorsState = useSelector(selectors.authorsState);
    // const authors = authorsState.data ? authorsState.data : [];

    // useEffect(() => {
    //     dispatch(fetchAuthorList());
    // }, [dispatch]);

    const [newItems, setNewItems] = useState([])
	const [nfts, setNFT] = useState([])


	useEffect(async () => {
		const data = await getAllTokenURIs()
		setNewItems(data)
	}, [])

	const setNFTs = async () => {

		if (newItems && newItems.length > 0) {
			await Promise.all(newItems.map(async (item) => {
				const { data } = await Axios.get(item)
				setNFT((todo) => [...todo, data])
			}));
		}
	}

	useEffect(async () => {
		const data = await setNFTs()
	}, [newItems])

    return (
        <div>
            <ol className="author_list">
            { nfts && nfts.length && nfts.map((nft, index) => (
                <li key={index}>
                    <UserTopSeller user={nft} />
                </li>
            ))}
            </ol>
        </div>
    );
};
export default memo(AuthorList);