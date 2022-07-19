import React, { memo, useState, useEffect } from "react";
import CustomSlideExplore from "./CustomSlideExplore";
import ReactPaginate from 'react-paginate';
import LoadingSpinner from '../../components/pages/LoadingSpinner'

function Items({ currentItems }) {
  return (
    <div className="row">
      {currentItems && currentItems.length>0 &&  currentItems.map((item, index) => (
          <div className="col-md-3" key={item.id} >
            <CustomSlideExplore card={item} />
          </div>
        ))}
    </div>
  );
}

const CarouselCollectionRedux = ({ nfts }) => {
  const itemsPerPage = 4;
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(nfts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(nfts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, nfts]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % nfts.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  return (
    <div className='container'>
      <Items currentItems={currentItems} />
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        // forcePage={pageOffset}
      />
    </div>
  );
}

export default memo(CarouselCollectionRedux);
