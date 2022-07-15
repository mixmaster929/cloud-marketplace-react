import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Slidermain = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="spacer-single"></div>
          <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
            <h6 className=""><span className="text-uppercase color">{t('title1')}</span></h6>
          </Reveal>
          <div className="spacer-10"></div>
          <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
            <h1 className="">{t('title2')}</h1>
          </Reveal>
          <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
            <p className=" lead">
            {t('title3')}
            </p>
          </Reveal>
          <div className="spacer-10"></div>
          <Reveal className='onStep' keyframes={fadeInUp} delay={800} duration={900} triggerOnce>
            <span onClick={() => navigate('/explore/new_signings/0')} className="btn-main lead">{t('explore')}</span>
            <div className="mb-sm-30"></div>
          </Reveal>
        </div>
        <div className="col-md-6 xs-hide">
          <Reveal className='onStep' keyframes={fadeIn} delay={900} duration={1500} triggerOnce>
            <img src="./img/misc/nft.png" className="lazy img-fluid" alt="" />
          </Reveal>
        </div>
      </div>
    </div>
  )
};
export default Slidermain;