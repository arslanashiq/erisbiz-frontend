import React from 'react';
import PropTypes from 'prop-types';

function ItemOverViewTab({ itemDetail, itemImage }) {
  return (
    <>
      <div className="row item-overview-wrapper">
        <div className="col-7 row">
          {itemDetail.map(key => (
            <>
              <div className="col-8 col-md-3">
                <h5 className="item-overview-title">{key.label}</h5>
              </div>
              <div className=" col-4 col-md-9">
                <p className={`item-overview-value ${key.className}`}>{key.value}</p>
              </div>
            </>
          ))}
        </div>
        {itemImage && (
          <div className="col-5">
            <img src={itemImage} alt=" alternate text" style={{ maxWidth: 250, objectFit: 'cover' }} />
          </div>
        )}
      </div>

      <h2 className="item-overview-heading ">Purchase Information</h2>
      <div className="col-7 row item-overview-wrapper">
        <div className="col-5 col-md-3">
          <h5 className="item-overview-title">Purchase Account</h5>
        </div>
        <div className="col-7 col-md-9">
          <p className="item-overview-value">Account of Sale</p>
        </div>
      </div>

      <h2 className="item-overview-heading ">Sales Information</h2>
      <div className="col-7 row item-overview-wrapper">
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
  itemImage: PropTypes.string,
};
ItemOverViewTab.defaultProps = {
  itemDetail: [],
  itemImage: null,
};
export default ItemOverViewTab;
