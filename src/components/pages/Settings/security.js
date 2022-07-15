import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import auth from '../../../core/auth';
import { fetchAuthorList } from "../../../store/actions/thunks";
import * as selectors from '../../../store/selectors';
import QRCode from "qrcode.react";


const GlobalStyles = createGlobalStyle`
  .btn-enabledevice{
    background-color: rgb(0, 154, 213);
    display: block;
    width: max-content;
    text-align: center;
    color: #fff !important;
    margin-top: 20px;
    border-radius: 6px;
    letter-spacing: normal;
    outline: 0;
    font-weight: 800;
    text-decoration: none;
    padding: 8px 40px;
    font-size: 14px;
    border: none 
  }
}
`;


const Security = () => {
  const thePath = useLocation();
  const userInfo = auth.getUserInfo();
  const authorId = userInfo.id;
  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data ? authorsState.data : null;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthorList(authorId));
  }, [dispatch, authorId]);
  const enableDevice = () => {

  }
  return (
    <div>
      <GlobalStyles />
      <div>
        <div>
          <h4>Security</h4>
        </div>
        <div>
          <div>
            <h3>Scan this barcode with your app</h3>
            <div>Scan the image below with the two-factor authentication app on your phone.</div>
            <div>
              <QRCode value={author ? author.remember_token : thePath} style={{ marginRight: 50 }} /></div>
            <div>After scanning the barcode image, the app will display a six-digit code that you can enter below.</div>
            <div>Six-digit code *</div>
            <div>
              <input type="text"></input>
            </div>
            <div>
              <input type="button" onClick={enableDevice} id="enabledevice" className="btn-enabledevice" value="Enable Device" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Security;