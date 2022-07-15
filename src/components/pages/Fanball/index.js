import React from 'react';
// import ColumnNewThreeColRedux from '../components/ColumnNewThreeColRedux';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import CheckboxFilter from '../../components/CheckboxFilter';
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import New from './new'
import Auctions from './auctions'
import Followings from './followings'
import MyFanballCategory from './sidebar'

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


const Fanball = () => (

	<div>
		<GlobalStyles />

		<section className='container'>
			<div className='row'>
				<div className="spacer-double"></div>
				<div className='col-md-3'>
					<MyFanballCategory />
				</div>
				<div className="col-md-9">
					<Routes>
						<Route path='/new' element={<New />} />
						<Route path='/auctions' element={<Auctions />} />
						<Route path='/purchases' element={<New />} />
						<Route path='/sales' element={<New />} />
						<Route path='/offers_received' element={<New />} />
						<Route path='/offers_sent' element={<New />} />
						<Route path='/follows' element={<Followings />} />
						<Route path='/players_notifications' element={<New />} />
						<Route path='/transactions' element={<New />} />
					</Routes>
				</div>
			</div>
			<Outlet />
		</section>


		<Footer />
	</div>

);
export default Fanball;