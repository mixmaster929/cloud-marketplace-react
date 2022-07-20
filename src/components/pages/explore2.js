import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import CheckboxFilter from '../components/CheckboxFilter';
import NewCardCollectionRedux from '../components/CarouselCollectionExploreRedux';
import * as selectors from '../../store/selectors';
import { fetchAllNftsByFilter, fetchAllNftsByFilter1 } from "../../store/actions/thunks";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from './LoadingSpinner'

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
  color: rgba(255, 255, 255, .5);;
}
header#myHeader .logo .d-block{
  display: none !important;
}
header#myHeader .logo .d-none{
  display: block !important;
}
.mainside{
  .connect-wal{
    display: flex;
  }
  .logout{
    display: flex;
    align-items: center;
  }
}
.pagination{
    margin-top: 20px;
    display: flex;
    padding-bottm: 10px;
    flex-wrap: wrap;
    list-style: none;
    align-items: center;
    justify-content: center;
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

const Explore = () => {
  const { category, id } = useParams();
  const location = useLocation()
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const nftStateByFilter = useSelector(selectors.nftStateByFilter);
  const nfts = nftStateByFilter.data ? nftStateByFilter.data : {};

  const nftStateByFilter1 = useSelector(selectors.nftStateByFilter1);
  const nfts1 = nftStateByFilter1.data ? nftStateByFilter1.data : {};

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchAllNftsByFilter(category, id));
      dispatch(fetchAllNftsByFilter1(category));
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch, location]);

  return (
    <div>
      <GlobalStyles />
      <section className='container'>
        <div className='row'>
          <div className="spacer-double"></div>
          <div className='col-md-3'>
            <CheckboxFilter category = {category} id = {id} nfts={nfts1} />
          </div>

          <div className="col-md-9">
            { nfts && nfts.length>=0? <NewCardCollectionRedux nfts={nfts} /> : <LoadingSpinner /> }
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
};
export default Explore;