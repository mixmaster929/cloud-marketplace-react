import React, { memo, useState, useEffect } from "react";
import CustomSlideExplore from "./CustomSlideExplore";
// import CustomSlideExplore from "./CustomSlide";

const CarouselCollectionRedux = ({nfts}) => {
  return (
    <div className="row">
      {nfts && nfts.length > 0 && nfts.map((item, index) => (
        <div className="col-md-3" key={index} >
          <CustomSlideExplore card={item} />
        </div>
      ))}
    </div>
  );
}

export default memo(CarouselCollectionRedux);
