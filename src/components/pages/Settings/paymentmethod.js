import React from 'react';
// import ColumnNewThreeColRedux from '../components/ColumnNewThreeColRedux';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import CheckboxFilter from '../../components/CheckboxFilter';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const GlobalStyles = createGlobalStyle`

}
`;


const PaymentMethod = () => {
  const thePath = useLocation();
  const currentPath = thePath.pathname;

  return (
    <div>
      <GlobalStyles />
      <div>
        <div>
          <h4>Payment methods</h4>
        </div>
        <div>
          No credit card saved.
        </div>
      </div>
    </div>
  )
};
export default PaymentMethod;