import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ColumnNewRedux from '../components/ColumnNewRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from '../../store/selectors';
import { fetchAuthorList } from "../../store/actions/thunks";
import api from "../../core/api";
import auth from "../../core/auth";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
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
const userInfo = auth.getUserInfo();
const _authorId = userInfo? userInfo.id : null;

const Colection = ({ authorId =_authorId }) => {
  console.log("collection=>", authorId)
const [openMenu, setOpenMenu] = React.useState(true);
const [openMenu1, setOpenMenu1] = React.useState(false);
const [openMenu2, setOpenMenu2] = React.useState(false);
const [openMenu3, setOpenMenu3] = React.useState(false);
const [openMenu4, setOpenMenu4] = React.useState(false);

const handleBtnClick = () => {
  setOpenMenu(!openMenu);
  setOpenMenu1(false);
  setOpenMenu2(false);
  setOpenMenu3(false);
  setOpenMenu4(false);
  document.getElementById("Mainbtn").classList.add("active");
  document.getElementById("Mainbtn1").classList.remove("active");
  document.getElementById("Mainbtn2").classList.remove("active");
  document.getElementById("Mainbtn3").classList.remove("active");
  document.getElementById("Mainbtn4").classList.remove("active");
};

const handleBtnClick1 = () => {
  setOpenMenu1(!openMenu1);
  setOpenMenu2(false);
  setOpenMenu(false);
  setOpenMenu3(false);
  setOpenMenu4(false);
  document.getElementById("Mainbtn1").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
  document.getElementById("Mainbtn2").classList.remove("active");
  document.getElementById("Mainbtn3").classList.remove("active");
  document.getElementById("Mainbtn4").classList.remove("active");
};

const handleBtnClick2 = () => {
  setOpenMenu2(!openMenu2);
  setOpenMenu(false);
  setOpenMenu1(false);
  setOpenMenu3(false);
  setOpenMenu4(false);
  document.getElementById("Mainbtn2").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
  document.getElementById("Mainbtn1").classList.remove("active");
  document.getElementById("Mainbtn3").classList.remove("active");
  document.getElementById("Mainbtn4").classList.remove("active");
};

const handleBtnClick3 = () => {
  setOpenMenu3(!openMenu3);
  setOpenMenu(false);
  setOpenMenu1(false);
  setOpenMenu2(false);
  setOpenMenu4(false);
  document.getElementById("Mainbtn3").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
  document.getElementById("Mainbtn1").classList.remove("active");
  document.getElementById("Mainbtn2").classList.remove("active");
  document.getElementById("Mainbtn4").classList.remove("active");
};

const handleBtnClick4 = () => {
  setOpenMenu4(!openMenu4);
  setOpenMenu(false);
  setOpenMenu1(false);
  setOpenMenu3(false);
  setOpenMenu2(false);
  document.getElementById("Mainbtn4").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
  document.getElementById("Mainbtn1").classList.remove("active");
  document.getElementById("Mainbtn3").classList.remove("active");
  document.getElementById("Mainbtn2").classList.remove("active");
};

const dispatch = useDispatch();
const authorsState = useSelector(selectors.authorsState);
const author = authorsState.data ? authorsState.data : {};
console.log("collection author=>", author)

useEffect(() => {
  dispatch(fetchAuthorList(authorId));
}, [dispatch, authorId]);

return (
<div>
<GlobalStyles/>
  { author.banner && 
    <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${api.publicUrl + "/uploads/profiles/" + author.banner})`}}>
      <div className='mainbreadcumb'>
      </div>
    </section>
  }

  <section className='container no-bottom'>
    <div className='row'>
      <div className="col-md-12">
         <div className="d_profile de-flex">
              <div className="de-flex-col">
                  <div className="profile_avatar">
                    { author.avatar && 
                      <img src={api.publicUrl + "/uploads/profiles/" + author.avatar} alt="" style={{width: '150px', height: '150px'}}/>
                    }
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                          <h4>
                            {author.name}                                          
                              <span className="profile_username">{author.social}</span>
                              <span id="wallet" className="profile_wallet">{author.address}</span>
                              <button id="btn_copy" title="Copy Text">Copy</button>
                          </h4>
                      </div>
                  </div>
              </div>
              <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                  </div>
                  <div className="de-flex-col">
                      <span className="btn-main">Follow</span>
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
                <ul className="de_nav text-left">
                    <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
                    <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Created</span></li>
                    <li id='Mainbtn2' className=""><span onClick={handleBtnClick2}>Collectibles</span></li>
                    <li id='Mainbtn3' className=""><span onClick={handleBtnClick3}>Liked</span></li>
                    <li id='Mainbtn4' className=""><span onClick={handleBtnClick4}>Activity</span></li>
                </ul>
            </div>
          </div>
        </div>
      {openMenu && author.id && (  
        <div id='zero1' className='onStep fadeIn'>
         <ColumnNewRedux shuffle showLoadMore={false} authorId={author.id}/>
        </div>
      )}
      {openMenu1 && author.id && ( 
        <div id='zero2' className='onStep fadeIn'>
         <ColumnNewRedux shuffle showLoadMore={false} authorId={author.id}/>
        </div>
      )}
      {openMenu2 && ( 
        <div id='zero3' className='onStep fadeIn'>
         <ColumnNewRedux shuffle showLoadMore={false}/>
        </div>
      )}
      </section>


  <Footer />
</div>
);
}
export default memo(Colection);