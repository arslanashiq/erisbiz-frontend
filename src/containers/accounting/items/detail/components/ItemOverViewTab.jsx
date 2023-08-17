import React from 'react';
import PropTypes from 'prop-types';

function ItemOverViewTab({ itemDetail }) {
  return (
    <>
      <div className="row item-overview-wrapper">
        {itemDetail.map(key => (
          <>
            <div className="col-5 col-md-3">
              <h5 className="item-overview-title">{key.label}</h5>
            </div>
            <div className=" col-7 col-md-9">
              <p className={`item-overview-value ${key.className}`}>{key.value}</p>
            </div>
          </>
        ))}
      </div>

      <h2 className="item-overview-heading ">Purchase Information</h2>
      <div className="row item-overview-wrapper">
        <div className="col-5 col-md-3">
          <h5 className="item-overview-title">Purchase Account</h5>
        </div>
        <div className=" col-7 col-md-9">
          <p className="item-overview-value">Account of Sale</p>
        </div>
      </div>

      <h2 className="item-overview-heading ">Sales Information</h2>
      <div className="row item-overview-wrapper">
        <div className="col-5 col-md-3">
          <h5 className="item-overview-title">Sale Account</h5>
        </div>
        <div className=" col-7 col-md-9">
          <p className="item-overview-value">Sale</p>
        </div>
      </div>
    </>
  );
}

ItemOverViewTab.propTypes = {
  itemDetail: PropTypes.array,
};
ItemOverViewTab.defaultProps = {
  itemDetail: [],
};
export default ItemOverViewTab;
