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


const SettingCategory = () => {
    const thePath = useLocation();
    const currentPath = thePath.pathname;

    return(
    <div>
        <GlobalStyles />

        <div className="item_filter_group">
            <Link to="/settings/profile"><div className={currentPath.includes("/profile")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-newspaper-o"></i><span className='sidebar-list'>Public profile</span></div></Link>
            <Link to="/settings/account"><div className={currentPath.includes("/account")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-street-view"></i><span className='sidebar-list'>Account settings</span></div></Link>
            <Link to="/settings/notifications"><div className={currentPath.includes("/notifications")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-street-view"></i><span className='sidebar-list'>Notifications</span></div></Link>
            <Link to="/settings/mfa"><div className={currentPath.includes("/mfa")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-street-view"></i><span className='sidebar-list'>Security</span></div></Link>
            <Link to="/settings/payment_methods"><div className={currentPath.includes("/payment_methods")? "sidebar-titles sidebar-active" : "sidebar-titles"}><i className="fa fa-street-view"></i><span className='sidebar-list'>Payment methods</span></div></Link>
        </div>
    </div>
    )
};
export default SettingCategory;