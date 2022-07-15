import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from '../../store/selectors';
import { fetchCategoryList } from "../../store/actions/thunks";
import Select from 'react-select';
import LoadingSpinner from '../pages/LoadingSpinner';
import request from '../../core/auth/request';
import auth from '../../core/auth';
import api from '../../../src/core/api';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
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
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .requirefields{
    color: red;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  .collection-description{
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    margin: 18px auto 10px;
  }
  .btn-collection{
    background-color: rgb(0, 154, 213);
    display: block;
    width: max-content;
    text-align: center;
    color: #fff !important;
    // background: #FC4118;
    border-radius: 6px;
    letter-spacing: normal;
    outline: 0;
    font-weight: 800;
    text-decoration: none;
    padding: 8px 40px;
    font-size: 14px;
    border: none
    // background-color: #FC4118;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const ColectionCreation = () => {

  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();
  const categoriesState = useSelector(selectors.categoriesState);
	const categories = categoriesState.data ? categoriesState.data : {};
  const categoryOptions = [];
  
  useEffect(() => {
		setLoading(true)
		dispatch(fetchCategoryList());
    
		setLoading(false)
	}, [dispatch]);

  useEffect(() => {
    categories.length>0 && categories.map((category) => {
      categoryOptions.push({label: category.name, value: category.id})
    }) 
  }, [categories, category, name]);

  const onChangeTitle = (e) => {
    setName(e.target.value)
  }

  const handleCategory = (e) => {
    setCategory(e.value)
  }

  const createCollection = async () => {
    setLoading(true)
    const userInfo = auth.getUserInfo();
    const requestURL = api.localbaseUrl +'/collection';
    await request(requestURL, { method: 'POST', body: {'user_id': userInfo.id, 'name': name, 'category_id': category}})
    .then((response) => {
        const { data } = response;
        dispatch(fetchCategoryList());
    }).catch((err) => {
        console.log(err);
    });
    setLoading(false)
  }

  return (
    <div>
      <GlobalStyles />
      <section className='jumbotron breadcumb no-bg' >
        <div className='mainbreadcumb' style={{ paddingTop: '10px' }}>
        </div>
      </section>

      { isLoading? <LoadingSpinner /> :
      <section className='container d_coll no-top no-bottom'>
        <div className='row'>
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                <div className="profile_name">
                  <h1 className="collection-title">Create a Collection</h1>
                </div>
                <div className="collection-description">
                  <div className="spacer-10"></div>
                  <h5>Name</h5>{name ? null : <span className="requirefields">*Required fields</span>}
                  <input type="text" name="item_title" id="item_title" className="form-control" onChange={onChangeTitle} placeholder="e.g. 'Crypto Funk" />
                  <h5>Category</h5>
                  <Select name="item_category" id="item_category" onChange={handleCategory} options={categoryOptions} defaultValue={categoryOptions.length>0 && categoryOptions[0]} />
                  <div className="spacer-10"></div>
                  <input type="button" onClick={createCollection} id="create_collection" className="btn-collection" value="Create" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
      <Footer />
    </div>
  );
}
export default memo(ColectionCreation);