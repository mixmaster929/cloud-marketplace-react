import React from 'react';
// import ColumnNewThreeColRedux from '../components/ColumnNewThreeColRedux';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import CheckboxFilter from '../../components/CheckboxFilter';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const GlobalStyles = createGlobalStyle`

}
`;


const New = () => {
    const thePath = useLocation();
    const currentPath = thePath.pathname;

    return(
      <div>
        <GlobalStyles/>
        <div>Hi, there</div>
      </div>
    )
};
export default New;