import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import CheckboxFilter from '../components/CheckboxFilter';
import NewCardCollectionRedux from '../components/CarouselCollectionExploreRedux';
import * as selectors from '../../store/selectors';
import { fetchAllNfts } from "../../store/actions/thunks";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const nftState = useSelector(selectors.nftState);
  const nfts = nftState.data ? nftState.data : {};
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(fetchAllNfts());
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, [dispatch, useParams]);

  return (
    <div>
      <GlobalStyles />
      <section className='container'>
        <div className='row'>
          <div className="spacer-double"></div>
          <div className='col-md-3'>
            <CheckboxFilter filter = {category} />
          </div>

          <div className="col-md-9">
            <div className='container'>
              <NewCardCollectionRedux nfts={nfts} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
};
export default Explore;