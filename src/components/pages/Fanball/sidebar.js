import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";


const GlobalStyles = createGlobalStyle`
    .sidebar-titles{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px;
        font-weight: bold;
    }
    .sidebar-active{
        color: #0066FF;
    }
    // .sidebar-inactive{
    //     color: #0D0C11;
    // }
    .sidebar-titles i{
        width: 20px;
    }
    .sidebar-list{
        padding-left: 10px;
    }
`;


const MyFanballCategory = () => {
    const thePath = useLocation();
    const currentPath = thePath.pathname;

    return(
    <div>
        <GlobalStyles />

        <div className="item_filter_group">
            <Link to="/my_fanball/new"><div className={currentPath.includes("/new")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-newspaper-o"></i><span className='sidebar-list'>What's new</span></div></Link>
            <Link to="/my_fanball/auctions"><div className={currentPath.includes("/auctions")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-street-view"></i><span className='sidebar-list'>New card auctions</span></div></Link>
            <Link to="/my_fanball/purchases"><div className={currentPath.includes("/purchases")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-street-view"></i><span className='sidebar-list'>Manager sales</span></div></Link>
            <Link to="/my_fanball/sales"><div className={currentPath.includes("/sales")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-street-view"></i><span className='sidebar-list'>My listings</span></div></Link>
            <Link to="/my_fanball/offers_received"><div className={currentPath.includes("/offers_received")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-street-view"></i><span className='sidebar-list'>Offers received</span></div></Link>
            <Link to="/my_fanball/offers_sent"><div className={currentPath.includes("/offers_sent")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-newspaper-o"></i><span className='sidebar-list'>Offers sent</span></div></Link>
            <Link to="/my_fanball/follows"><div className={currentPath.includes("/follows")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-newspaper-o"></i><span className='sidebar-list'>Follows</span></div></Link>
            <Link to="/my_fanball/players_notifications"><div className={currentPath.includes("/players_notifications")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-newspaper-o"></i><span className='sidebar-list'>Players notifications</span></div></Link>
            <Link to="/my_fanball/transactions"><div className={currentPath.includes("/transactions")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-newspaper-o"></i><span className='sidebar-list'>Transactions</span></div></Link>
        </div>
    </div>
    )
};
export default MyFanballCategory;