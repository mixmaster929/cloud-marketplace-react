import React from 'react';
// import ColumnNewThreeColRedux from '../components/ColumnNewThreeColRedux';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import CheckboxFilter from '../../components/CheckboxFilter';
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

const GlobalStyles = createGlobalStyle`

}
`;


const Auctions = () => {
    const thePath = useLocation();
    const currentPath = thePath.pathname;

    return(
      <div>
        <GlobalStyles/>
        <div>Hi, auctions</div>
        <Outlet />
      </div>
    )
};
export default Auctions;