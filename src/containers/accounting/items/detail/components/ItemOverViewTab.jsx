import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { v4 as uuid } from 'uuid';

function ItemOverViewTab({ itemDetail, itemStock, itemImage }) {
  return (
    <>
      <Box className="row item-overview-wrapper">
        <h2 className="item-overview-heading ">Item Information</h2>
        <Box className="col-8 row">
          {itemDetail.map(key => (
            <Box key={key.label} className="row">
              <Box className="col-8 col-md-3">
                <h5 className="item-overview-title">{key.label}</h5>
              </Box>
              <Box className="col-4 col-md-9">
                <p className={`item-overview-value ${key.className}`}>{key.value}</p>
              </Box>
            </Box>
          ))}
        </Box>
        {itemImage && (
          <Box className="col-4">
            <img
              src={itemImage}
              alt=" alternate text"
              style={{ maxWidth: '100%', maxHeight: 250, objectFit: 'cover' }}
            />
          </Box>
        )}
      </Box>

      <h2 className="item-overview-heading ">Stocks Information</h2>
      <Box className="col-8 row item-overview-wrapper">
        {itemStock.map(key => (
          <Box className="row" key={uuid()}>
            <Box className="col-8 col-md-3">
              <h5 className="item-overview-title">{key.label}</h5>
            </Box>
            <Box className="col-4 col-md-9">
              <p className="item-overview-value">{key.value}</p>
            </Box>
          </Box>
        ))}
      </Box>

      <h2 className="item-overview-heading ">Purchase Information</h2>
      <Box className="col-8 row item-overview-wrapper">
        <Box className="col-8 col-md-3">
          <h5 className="item-overview-title">Purchase Account</h5>
        </Box>
        <Box className="col-4 col-md-9">
          <p className="item-overview-value">Account of Sale</p>
        </Box>
      </Box>

      <h2 className="item-overview-heading ">Sales Information</h2>
      <Box className="col-8 row item-overview-wrapper">
        <Box className="col-8 col-md-3">
          <h5 className="item-overview-title">Sale Account</h5>
        </Box>
        <Box className=" col-4 col-md-9">
          <p className="item-overview-value">Sale</p>
        </Box>
      </Box>
    </>
  );
}

ItemOverViewTab.propTypes = {
  itemDetail: PropTypes.array,
  itemStock: PropTypes.array,
  itemImage: PropTypes.string,
};
ItemOverViewTab.defaultProps = {
  itemDetail: [],
  itemStock: [],
  itemImage: null,
};
export default ItemOverViewTab;
