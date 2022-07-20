import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import {
  Link,
  useNavigate,
  useMatch,
  useResolvedPath
} from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";
import auth from '../../core/auth';
import { createGlobalStyle } from 'styled-components';
import api from "../../core/api";
import { fetchAuthorList, fetchNotificationList } from "../../../src/store/actions/thunks";
import * as selectors from '../../../src/store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { useTranslation } from "react-i18next";
import request from '../../core/auth/request';
import { claimNFT, refund } from '../../core/contracts/bid/interact'

const GlobalStyles = createGlobalStyle`
.mainside a {
  background: none;
 }
  .mainside a:focus {
  background: #8364E2;
 }
 .multi-language{
  margin-left: 10px;
 }
}
`;

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      {...props}
      className={match ? 'active' : 'non-active'}
    />
  )
};

const Header = function ({ className }) {

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);

  const closePop = () => {
    btn_icon_pop(false);
  };
  const closeNot = () => {
    btn_icon_not(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });

  const disconnect = async () => {
    auth.clearAppStorage();
    navigate('/')
  }

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");

      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      } if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  const userInfo = auth.getUserInfo();
  const authorId = userInfo ? userInfo.id : 0;
  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data ? authorsState.data : [];

  const notificationsState = useSelector(selectors.notificationsState);
  const notifications = notificationsState.data ? notificationsState.data : [];

  const defaultLanguage = localStorage.getItem("language");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthorList(authorId));
    if(userInfo){
      const interval = setInterval(() => {
        dispatch(fetchNotificationList(authorId));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dispatch, authorId]);


  const setLanguages = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
  ]

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState();

  const changeLanguage = (event) => {
    setLanguage(event.value)
    localStorage.setItem("language", event.value);
    i18n.changeLanguage(event.value);
  };

  const getWhenTime = (_datetime) => {
    return "10 mins"
  }

  const goTransaction = (item) => {
    const fetchDate = async () => {
      let result = false
      if (item.item_type === 'REFUND') {
        result = await refund(item.nft_id - 1);
      }
      if (item.item_type === 'NFT') {
        result = await claimNFT(item.nft_id - 1);
      }
      const requestURL = api.localbaseUrl + '/notification/' + item.id;
      if (result['success']) {
        await request(requestURL, { method: 'PUT' })
          .then((response) => {
          }).catch((err) => {
            console.log(err);
          })
          .finally(() => {
            // setLoading(false);
          });
      }
    }
    fetchDate()
  }

  return (
    <div>
      <GlobalStyles />
      <header className={`navbar white ${className}`} id="myHeader">
        {/* <GlobalPayment /> */}
        <div className='container'>
          <div className='row w-100-nav'>
            <div className='logo px-0'>
              <div className='navbar-title navbar-item'>
                <NavLink to="/">
                  <img
                    src="/img/logo.png"
                    className="img-fluid d-block"
                    alt="#"
                  />
                  <img
                    src="/img/logo-2.png"
                    className="img-fluid d-3"
                    alt="#"
                  />
                  <img
                    src="/img/logo-3.png"
                    className="img-fluid d-4"
                    alt="#"
                  />
                  <img
                    src="/img/logo-light.png"
                    className="img-fluid d-none"
                    alt="#"
                  />
                </NavLink>
              </div>
            </div>

            <div className='search'>
              <input id="quick_search" className="xs-hide" name="quick_search" placeholder="search items, collections, and accounts" type="text" />
            </div>
            <BreakpointProvider>
              {/* mobile version */}
              <Breakpoint l down>
                {showmenu &&
                  <div className='menu'>
                    <div className='navbar-item'>
                    </div>
                    <div className='navbar-item'>
                    </div>
                  </div>
                }
              </Breakpoint>
              {/* desktop version */}
              <Breakpoint xl>
                <div className='menu'>
                  <div className='navbar-item'>
                  </div>
                </div>
              </Breakpoint>
            </BreakpointProvider>

            <div className='mainside'>
              {!userInfo ?
                (
                  <div className='connect-wal'>
                    <a href='#' className="btn-signup" onClick={() => navigate('/register')}>SignUp</a>
                    <a href='#' className="btn-signin" onClick={() => navigate('/login')}>SignIn</a>
                  </div>
                )
                :
                (<div className="logout">
                  <div id="de-click-menu-notification" className="de-menu-notification" onClick={() => btn_icon_not(!shownot)} ref={refpopnot}>
                  {notifications && notifications.length > 0 && <div className="d-count">{notifications.length}</div>}
                    <i className="fa fa-bell"></i>
                    {shownot &&
                      <div className="popshow">
                        <div className="de-flex">
                          <h4>Notifications</h4>
                          <span className="viewaall">Show all</span>
                        </div>
                        <ul>
                          {notifications && notifications.length > 0 && notifications.map((item) => (
                            <li key={item.id}>
                              <div className="mainnot">
                                <img className="lazy" src="../../img/author/author-2.jpg" alt="" />
                                <div className="d-desc">
                                  <span className="d-name">You have a <span onClick={(e) => goTransaction(item)}><b>{item.item_type}</b></span> transaction</span>
                                  <span className="d-time">{getWhenTime(item.created_at)} ago</span>
                                </div>
                              </div>
                            </li>))}
                        </ul>
                      </div>
                    }
                  </div>
                  <div id="de-click-menu-profile" className="de-menu-profile" onClick={() => btn_icon_pop(!showpop)} ref={refpop}>
                    <img
                      src={author && (author.avatar) ? (api.publicUrl + "/uploads/profiles/" + author.avatar) : '../../img/author_single/author_thumbnail.jpg'}
                      alt=""
                      className="d-profile-img-edit img-fluid"
                      style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                    />
                    {showpop &&
                      <div className="popshow">
                        <div className="d-name">
                          <img
                            src={author && (author.avatar) ? (api.publicUrl + "/uploads/profiles/" + author.avatar) : '../../img/author_single/author_thumbnail.jpg'}
                            alt=""
                            className="d-profile-img-edit img-fluid"
                            style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                          />
                          <h4>{author && author.username ? author.username : null}</h4> {/* user name */}
                        </div>
                        <div className="d-line"></div>
                        <ul className="de-submenu-profile">
                          <li>
                            <span onClick={() => navigate('/my_fanball/new')}>
                              <i className="fa fa-futbol-o"></i>{t('my_fanball')}
                            </span>
                          </li>
                          <li>
                            <span onClick={() => navigate('/settings/profile')}>
                              <i className="fa fa-pencil"></i>{t('settings')}
                            </span>
                          </li>
                          <li>
                            <span onClick={() => navigate('/collections')}>
                              <i className="fa fa-medkit"></i>{t('collections')}
                            </span>
                          </li>
                          {
                            userInfo.email === "smart.topdev929@gmail.com" && <li>
                              <span onClick={() => navigate('/create')}>
                                <i className="fa fa-medkit"></i>{t('create_item')}
                              </span>
                            </li>
                          }
                          <li>
                            <span onClick={() => navigate('/helpcenter')}>
                              <i className="fa fa-medkit"></i>{t('helpcenter')}
                            </span>
                          </li>
                          <li onClick={disconnect}>
                            <span>
                              <i className="fa fa-sign-out"></i>{t('sign_out')}
                            </span>
                          </li>
                        </ul>
                      </div>
                    }
                  </div>
                  <div className="multi-language">
                    <Select id="multi-language" onChange={changeLanguage} options={setLanguages} defaultValue={defaultLanguage ? setLanguages.find(item => item.value === defaultLanguage) : setLanguages[0]} />
                  </div>
                </div>)
              }
            </div>

          </div>

          <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
            <div className="menu-line white"></div>
            <div className="menu-line1 white"></div>
            <div className="menu-line2 white"></div>
          </button>

        </div>
      </header>
    </div>
  );
}
export default Header;