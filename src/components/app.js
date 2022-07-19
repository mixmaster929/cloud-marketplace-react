import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home from './pages/home';
import Explore2 from './pages/explore2';
import RankingRedux from './pages/RankingRedux';
import Auction from './pages/Auction';
import Helpcenter from './pages/helpcenter';
import Colection from './pages/colection';
import ColectionCreation from './pages/colectioncreation';
import ItemDetailRedux from './pages/ItemDetailRedux';
import Author from './pages/Author';
import Login from './pages/login';
import Register from './pages/register';
import Create from './pages/create';
import CreateOne from './pages/createone'
import Createoption from './pages/createOptions';
import Activity from './pages/activity';
import Minter from './pages/Minter';
import auth from '../core/auth';
import Profile from './pages/Profile';
import CreateNft from './pages/Create/index.js';
import { createGlobalStyle } from 'styled-components';
import Fanball from './pages/Fanball';
import Settings from './pages/Settings';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const isAuth = auth.getToken() !== null;

  return (
    isAuth ? children : <Navigate to="/login" state={{ from: location }} replace /> //it must be landing page for stating
  )
};

const App = () => {
  return (
    <div className="wraper">
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/myitems/:authorId"
          element={<ProtectedRoute><Author /></ProtectedRoute>}
        />
        <Route path="/users/:authorId/edit"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />

        <Route path="/create"
          element={<ProtectedRoute><Create /></ProtectedRoute>}
        />

        <Route path="/createone/:id"
          element={<ProtectedRoute><CreateOne /></ProtectedRoute>}
        />

        <Route path="/collections"
          element={<ProtectedRoute><Colection /></ProtectedRoute>}
        />
        <Route path="/collections/:create"
          element={<ProtectedRoute><ColectionCreation /></ProtectedRoute>}
        />

        <Route path="/home"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />

        <Route path="/my_fanball/*"
          element={<ProtectedRoute><Fanball /></ProtectedRoute>}
        />

        <Route path="/settings/*"
          element={<ProtectedRoute><Settings /></ProtectedRoute>}
        />
        <Route element={<ProtectedRoute><ItemDetailRedux /></ProtectedRoute>} path="/ItemDetail/:nftId" />
        <Route element={<ProtectedRoute><Explore2 /></ProtectedRoute>} path="/explore/:category/:id" />

        <Route element={<RankingRedux />} path="/rangking" />
        <Route element={<Auction />} path="/Auction" />
        <Route element={<Helpcenter />} path="/helpcenter" />

        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Createoption />} path="/createOptions" />
        <Route element={<Activity />} path="/activity" />
        <Route element={<Minter />} path="/mint" />
        <Route element={<CreateNft />} path="/createNft" />
      </Routes>
      <ScrollToTopBtn />
    </div>
  )
};
export default App;