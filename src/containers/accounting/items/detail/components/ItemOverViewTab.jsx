import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

function ItemOverViewTab({ itemDetail, itemImage }) {
  return (
    <>
      <Box className="row item-overview-wrapper">
        <Box className="col-7 row">
          {itemDetail.map(key => (
            <Box key={key.label} className="row">
              <Box className="col-8 col-md-3">
                <h5 className="item-overview-title">{key.label}</h5>
              </Box>
              <Box className=" col-4 col-md-9">
                <p className={`item-overview-value ${key.className}`}>{key.value}</p>
              </Box>
            </Box>
          ))}
        </Box>
        {itemImage && (
          <Box className="col-5">
            <img src={itemImage} alt=" alternate text" style={{ maxWidth: 250, objectFit: 'cover' }} />
          </Box>
        )}
      </Box>

      <h2 className="item-overview-heading ">Purchase Information</h2>
      <Box className="col-7 row item-overview-wrapper">
        <Box className="col-5 col-md-3">
          <h5 className="item-overview-title">Purchase Account</h5>
        </Box>
        <Box className="col-7 col-md-9">
          <p className="item-overview-value">Account of Sale</p>
        </Box>
      </Box>

      <h2 className="item-overview-heading ">Sales Information</h2>
      <Box className="col-7 row item-overview-wrapper">
        <Box className="col-5 col-md-3">
          <h5 className="item-overview-title">Sale Account</h5>
        </Box>
        <Box className=" col-7 col-md-9">
          <p className="item-overview-value">Sale</p>
        </Box>
      </Box>
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
