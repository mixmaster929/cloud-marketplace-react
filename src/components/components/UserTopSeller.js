import React, { memo } from 'react';
import api from '../../core/api';

//react functional component
const UserTopSeller = ({ user }) => {
    return user ? (
        <>
            <div className="author_list_pp">
              <span onClick={()=> window.open("", "_self")}>
                  <img className="lazy" src={user.avatar? (api.publicUrl + "/uploads/profiles/" +  user.avatar) : ""} alt=""/>
                  <i className="fa fa-check"></i>
              </span>
            </div>                                    
            <div className="author_list_info">
                <span onClick={()=> window.open("", "_self")}>{user.name}</span>
                <span className="bot"> 100 ETH</span>
            </div>   
        </>     
    ) : <></>;
};

export default memo(UserTopSeller);