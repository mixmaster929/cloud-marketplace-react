import React, { memo } from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useNavigate } from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
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
  .btn-collection{
    background-color: rgb(0, 154, 213);
    display: block;
    width: max-content;
    text-align: center;
    color: #fff !important;
    border-radius: 6px;
    letter-spacing: normal;
    outline: 0;
    font-weight: 800;
    text-decoration: none;
    padding: 8px 40px;
    font-size: 14px;
    border: none;
    margin: auto;
  }
  .collection-description{
    font-size: 16px;
    font-weight: bold;
    margin: 18px auto 10px;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Colection = () => {

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  const createCollection = () => {
    navigate('/collections/create')
  }

  return (
    <div>
      <GlobalStyles />
      <section className='jumbotron breadcumb no-bg' >
        <div className='mainbreadcumb' style={{ paddingTop: '10px' }}>
        </div>
      </section>

      <section className='container d_coll no-top no-bottom'>
        <div className='row'>
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                <div className="profile_name">
                  <h1 className="collection-title">My Collections</h1>
                </div>
                <div className="collection-description">Create, curate, and manage collections of unique NFTs to share and sell.</div>
                <div>
                  <input type="button" className="btn-collection" onClick={createCollection} id="changepassword" value="Create a collection" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="items_filter">
              <ul className="de_nav">
                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
                <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Owned</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default memo(Colection);