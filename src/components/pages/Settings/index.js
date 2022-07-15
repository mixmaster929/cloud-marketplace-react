import React from 'react';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Profile from './profile';
import Account from './account';
import Notifications from './notification';
import Security from './security';
import PaymentMethod from './paymentmethod';
import SettingCategory from './sidebar';

const GlobalStyles = createGlobalStyle`
header#myHeader.navbar.sticky.white {
  background: #403f83;
  border-bottom: solid 1px #403f83;
}
header#myHeader.navbar .search #quick_search{
  color: #fff;
  background: rgba(255, 255, 255, .1);
}
header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
  color: #fff;
}
header#myHeader .dropdown-toggle::after{
  color: rgba(255, 255, 255, .5);;
}
header#myHeader .logo .d-block{
  display: none !important;
}
header#myHeader .logo .d-none{
  display: block !important;
}
.mainside{
  .connect-wal{
    display: flex;
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
    background: #fff;
  }
  .item-dropdown .dropdown a{
    color: #fff !important;
  }
}
`;


const Settings = () => (

	<div>
		<GlobalStyles />

		<section className='container'>
			<div className='row'>
				<div className="spacer-double"></div>
				<div className='col-md-3'>
					<SettingCategory />
				</div>
				<div className="col-md-9">
					<Routes>
						<Route path='/profile' element={<Profile />} />
						<Route path='/account' element={<Account />} />
						<Route path='/notifications' element={<Notifications />} />
						<Route path='/mfa' element={<Security />} />
						<Route path='/payment_methods' element={<PaymentMethod />} />
					</Routes>
				</div>
			</div>
		</section>

		<Footer />
	</div>

);
export default Settings;