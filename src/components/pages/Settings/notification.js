import React from 'react';
// import ColumnNewThreeColRedux from '../components/ColumnNewThreeColRedux';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import CheckboxFilter from '../../components/CheckboxFilter';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  .text-notificaitons{
    font-size: 15px;
    font-style: normal;
    font-family: apercu-pro, system-ui, sans-serif;
    font-weight: 700;
  }
  .text-sub1{
    margin-bottom: 20px;
  }
  .text-sub1-flex{
    display: flex;
  }
  .text-sub2{
    opacity: 0.8;
    font-size: 12px;
    text-transform: none;
  }
  .text-sub2-context{
    margin-left:auto;
    margin-right:0;
  }
}
`;


const Notifications = () => {
  const thePath = useLocation();
  const currentPath = thePath.pathname;

  return (
    <div>
      <GlobalStyles />
      <div>
        <div>
          <h4>Notifications</h4>
        </div>
        <div className='text-notificaitons'>
          <div className='text-sub1'>Notifications you will receive:</div>
          <div className='text-sub1 text-sub1-flex'>
            <div>
              <div>Card Subscription</div>
              <div className='text-sub2'>Received when a Card you're subscribed to is put on Auction.</div>
            </div>
            <div className='text-sub2-context'>
              <input type="checkbox" />
            </div>
          </div>
          <div className='text-sub1 text-sub1-flex'>
            <div>Player Subscription</div>
            <div className='text-sub2-context'>
              <input type="checkbox" />
            </div>
          </div>
          <div className='text-sub1 text-sub1-flex'>
            <div>
              <div>Higher Bid</div>
              <div className='text-sub2'>Received when a Manager sets a higher bid than your own.</div>
            </div>
            <div className='text-sub2-context'>
              <select>
                <option value="">Email</option>
                <option value="">In-App</option>
                <option value="">Both</option>
                <option value="">False</option>
              </select>
            </div>
          </div>
          <div className='text-sub1 text-sub1-flex'>
            <div>
              <div>Card Sold</div>
              <div className='text-sub2'>Received when you have successfully sold a Card.</div>
            </div>
            <div className='text-sub2-context'>
              <select>
                <option value="">Email</option>
                <option value="">In-App</option>
                <option value="">Both</option>
                <option value="">False</option>
              </select>
            </div>
          </div>
          <div className='text-sub1 text-sub1-flex'>
            <div>
              <div>Card Not Sold</div>
              <div className='text-sub2'>Received when one of your sales expires without a buyer.</div>
            </div>
            <div className='text-sub2-context'>
              <select>
                <option value="">Email</option>
                <option value="">In-App</option>
                <option value="">Both</option>
                <option value="">False</option>
              </select>
            </div>
          </div>
          <div className='text-sub1 text-sub1-flex'>
            <div>
              <div>Card Bought</div>
              <div className='text-sub2'>Received when you have successfully bought a Card.</div>
            </div>
            <div className='text-sub2-context'>
              <select>
                <option value="">Email</option>
                <option value="">In-App</option>
                <option value="">Both</option>
                <option value="">False</option>
              </select>
            </div>
          </div>
          <div className='text-sub1 text-sub1-flex'>
            <div>Card Withdrawal Started</div>
          </div>
          <div className='text-sub1 text-sub1-flex'>
            <div>Card Withdrawn</div>
          </div>
          <div className='text-sub1 text-sub1-flex'>
            <div>
              <div>Offer Received</div>
              <div className='text-sub2'>Received when a Manager has sent an offer to you.</div>
            </div>
            <div className='text-sub2-context'>
              <select>
                <option value="">Email</option>
                <option value="">In-App</option>
                <option value="">Both</option>
                <option value="">False</option>
              </select>
            </div>
          </div>
          <div className='text-sub1 text-sub1-flex'>
            <div>
              <div>Offer Rejected</div>
              <div className='text-sub2'>Received when a Manager you made an offer to rejects your offer.</div>
            </div>
            <div className='text-sub2-context'>
              <select>
                <option value="">Email</option>
                <option value="">In-App</option>
                <option value="">Both</option>
                <option value="">False</option>
              </select>
            </div>
          </div>
          <div className='text-sub1 text-sub1-flex'>
            <div>
              <div>No Team</div>
              <div className='text-sub2'>Received when you have forgotten to compose your teams for a Tournament. Don't miss out on amazing rewards!</div>
            </div>
            <div className='text-sub2-context'>
              <select>
                <option value="">Email</option>
                <option value="">In-App</option>
                <option value="">Both</option>
                <option value="">False</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Notifications;