import React from 'react';
import SliderMain from '../components/SliderMain';
import FeatureBox from '../components/FeatureBox';
import NewCardCollectionRedux from '../components/CarouselCollectionRedux';
import CarouselNewRedux from '../components/CarouselNewRedux';
import AuthorListRedux from '../components/AuthorListRedux';
import Catgor from '../components/Catgor';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

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
      display: flex;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  .btn-viewall{
    background-color: rgb(0, 154, 213);
    // display: block;
    width: max-content;
    text-align: center;
    color: #fff !important;
    // background: #FC4118;
    border-radius: 25px;
    letter-spacing: normal;
    outline: 0;
    font-weight: 800;
    text-decoration: none;
    // padding: 8px 40px;
    font-size: 14px;
    border: none
    // background-color: #FC4118;
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

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const newCards = (e) => {
    navigate("/explore/new_signings/0");
  }

  const getBundles = () => {

  }

  const bestDeals = () => {

  }

  return(
    <div>
      <GlobalStyles/>
        <section className="jumbotron breadcumb no-bg h-vh" style={{backgroundImage: `url(${'./img/bg-shape-1.jpg'})`}}>
          <SliderMain/>
        </section>

        <section className='container no-top no-bottom'>
          <FeatureBox/>
        </section>

        <section className='container no-bottom'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='text-center'>
                <h2>{t('new_cards')}</h2><input type="button" className='btn-viewall' onClick={(e) => newCards(e)} value="view all"></input>
                <div className="small-border"></div>
              </div>
            </div>
            <div className='col-lg-12'>
              <NewCardCollectionRedux/>
            </div>
          </div>
        </section>

        <section className='container no-bottom'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='text-center'>
                <h2>{t('bundles')}</h2>
                <input type="button" className='btn-viewall' onClick={(e) => getBundles} value="view all"></input>
                <div className="small-border"></div>
              </div>
            </div>
            <div className='col-lg-12'>
              {/* <CarouselNewRedux/> */}
            </div>
          </div>
        </section>

        <section className='container no-bottom'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='text-center'>
                <h2>{t('best_deals')}</h2>
                <input type="button" className='btn-viewall' onClick={(e) => bestDeals} value="view all"></input>
                <div className="small-border"></div>
              </div>
            </div>
            <div className='col-lg-12'>
            {/* <CarouselNewRedux/> */}
            </div>
          </div>
        </section>

        <section className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='text-center'>
                <h2>Browse by category</h2>
                <div className="small-border"></div>
              </div>
            </div>
          </div>
          <Catgor/>
        </section>

      <Footer />

    </div>
  )
};
export default Home;