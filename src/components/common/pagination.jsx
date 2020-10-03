import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  //destructures itemsCount and pageSize from the props
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  // console.log(itemsCount);
  // console.log(pageSize);
  //this rounds up the float that is created by type coercion
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  //implementing lo-dash for page range. 1 is the start number and the +1 is so our pagesCount will be in the range. THe last page is not included in this method, so that is the work around.

  const pages = _.range(1, pagesCount + 1);
  //we have an onClick handler that raises the page number and helps to make the page active.
  return (
    <nav>
      <ul className="ul pagination">
        {pages.map((page) => (
          <li
            style={{ cursor: "pointer" }}
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}{" "}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
