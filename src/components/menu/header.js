import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import {
  Link,
  useNavigate,
  useMatch,
  useResolvedPath
} from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";
import { toHex, truncateAddress } from "./utils";
import Web3 from "web3";
import Web3Modal, { providers } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import request from '../../core/auth/request';
import auth, { registerUrl } from '../../core/auth';
import { networkParams } from "./networks";
import { providerOptions } from "./providerOptions";
import { ethers } from 'ethers';


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

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
  theme: 'dark'
});

const Header = function ({ className }) {

  const [user, setUser] = useState([]);
  const [balances, setBalances] = useState();
  const [chainID, setChainID] = useState();
  const navigate = useNavigate();
  
  const [openMenu, setOpenMenu] = React.useState(false);
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
    await web3Modal.clearCachedProvider();
    setAccount("");
    auth.clearAppStorage();
    navigate('/')
    refreshState();
  }

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      handleConnectWallet();
    }

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

  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();

  useEffect(async () => {

    const requestURL = registerUrl;
    const data = { "address": account }
    await request(requestURL, { method: 'POST', body: data })
      .then((response) => {
        setUser(response.data);
        auth.setToken(response.data.token, true);
        auth.setUserInfo(response.data, true);
      }).catch((err) => {
        // console.log(err);
      });
  }, [account])

  const handleConnectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const web3 = new Web3(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      const balances = await web3.eth.getBalance(accounts[0]);
      const amount = web3.utils.fromWei(balances);
      console.log("ddd=>", network)
      setBalances(amount);
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };
  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts);
      };

      const handleChainChanged = (chainId) => {
        setChainId(chainId);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  const convertToAddress = (address) => {
    const string = String(address);
    const len = string.length
    const firstAdr = string.slice(0, 8)
    const lastAdr = string.slice(len - 4, len)
    const _address = firstAdr + "..." + lastAdr

    return _address
  }

  return (
    <header className={`navbar white ${className}`} id="myHeader">
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
            <input id="quick_search" className="xs-hide" name="quick_search" placeholder="search item here..." type="text" />
          </div>

          <BreakpointProvider>
            {/* mobile version */}
            <Breakpoint l down>
              {showmenu &&
                <div className='menu'>
                  <div className='navbar-item'>
                    <NavLink to="/explore" onClick={() => btn_icon(!showmenu)}>Explore</NavLink>
                  </div>
                  {account && <div className='navbar-item'>
                    <NavLink to="/activity" onClick={() => btn_icon(!showmenu)}>
                      Activity
                    </NavLink>
                  </div>}
                </div>
              }
            </Breakpoint>
            {/* desktop version */}
            <Breakpoint xl>
              <div className='menu'>
                <div className='navbar-item'>
                  <NavLink to="/explore">Explore
                    <span className='lines'></span>
                  </NavLink>
                </div>
                {account && <div className='navbar-item'>
                  <NavLink to="/activity">
                    Activity
                    <span className='lines'></span>
                  </NavLink>
                </div>}
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className='mainside'>
            {!account ?
              (<div className='connect-wal'>
                <a href='#' onClick={handleConnectWallet}>Connect Wallet</a>
              </div>)
              :
              (<div className="logout">
                {(account === "0xEf4FdA2BF665685689c17Aef16c5D8cfCc7aDfaF") && <NavLink to="/createOptions">Create</NavLink>}
                <div id="de-click-menu-notification" className="de-menu-notification" onClick={() => btn_icon_not(!shownot)} ref={refpopnot}>
                  <div className="d-count">8</div>
                  <i className="fa fa-bell"></i>
                  {shownot &&
                    <div className="popshow">
                      <div className="de-flex">
                        <h4>Notifications</h4>
                        <span className="viewaall">Show all</span>
                      </div>
                      <ul>
                        <li>
                          <div className="mainnot">
                            <img className="lazy" src="../../img/author/author-2.jpg" alt="" />
                            <div className="d-desc">
                              <span className="d-name"><b>Mamie Barnett</b> started following you</span>
                              <span className="d-time">1 hour ago</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="mainnot">
                            <img className="lazy" src="../../img/author/author-3.jpg" alt="" />
                            <div className="d-desc">
                              <span className="d-name"><b>Nicholas Daniels</b> liked your item</span>
                              <span className="d-time">2 hours ago</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="mainnot">
                            <img className="lazy" src="../../img/author/author-4.jpg" alt="" />
                            <div className="d-desc">
                              <span className="d-name"><b>Lori Hart</b> started following you</span>
                              <span className="d-time">18 hours ago</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="mainnot">
                            <img className="lazy" src="../../img/author/author-5.jpg" alt="" />
                            <div className="d-desc">
                              <span className="d-name"><b>Jimmy Wright</b> liked your item</span>
                              <span className="d-time">1 day ago</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="mainnot">
                            <img className="lazy" src="../../img/author/author-6.jpg" alt="" />
                            <div className="d-desc">
                              <span className="d-name"><b>Karla Sharp</b> started following you</span>
                              <span className="d-time">3 days ago</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
                <div id="de-click-menu-profile" className="de-menu-profile" onClick={() => btn_icon_pop(!showpop)} ref={refpop}>
                  <img src="../../img/author_single/author_thumbnail.jpg" alt="" />
                  {showpop &&
                    <div className="popshow">
                      <div className="d-name">
                        <h4>Monica Lucas</h4>
                        <span className="name" onClick={() => window.open("", "_self")}>Set display name</span>
                      </div>
                      <div className="d-balance">
                        <h4>Balance</h4>
                        {Number(balances).toFixed(4)}{Number(chainId) === 1 ? "ETH" : ""}
                      </div>
                      <div className="d-wallet">
                        <h4>My Wallet</h4>
                        <span id="wallet" className="d-wallet-address">{convertToAddress(account)}</span>
                        <button id="btn_copy" title="Copy Text">Copy</button>
                      </div>
                      <div className="d-line"></div>
                      <ul className="de-submenu-profile">
                        <li>
                          <span onClick={() => navigate('/myitems/' + account)}>
                            <i className="fa fa-user"></i> Pprofile
                          </span>
                        </li>
                        <li>
                          <span onClick={() => navigate('/users/' + user.id + '/edit')}>
                            <i className="fa fa-pencil"></i> Settings
                          </span>
                        </li>
                        <li>
                          <span onClick={() => navigate('/helpcenter')}>
                            <i className="fa fa-medkit"></i> Help Center
                          </span>
                        </li>
                        <li onClick={disconnect}>
                          <span>
                            <i className="fa fa-sign-out"></i> Sign out
                          </span>
                        </li>
                      </ul>
                    </div>
                  }
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
  );
}
export default Header;