import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
// import { v4 as uuid } from 'uuid';

function ItemOverViewTab({ itemDetail, itemStock, itemImage }) {
  const largeGridSpacing = useMemo(() => (itemImage ? 4 : 6), [itemImage]);
  const mediumGridSpacing = useMemo(() => (itemImage ? 6 : 6), [itemImage]);
  return (
    <Grid container spacing={2} alignItems="self-start">
      <Grid item xs={12} lg={mediumGridSpacing} xl={largeGridSpacing}>
        <h2 className="item-overview-heading ">Item Information</h2>
        {itemDetail.map(key => (
          <Grid key={key.label} item container>
            <Grid item xs={4} lg={4}>
              <h5 className="item-overview-title">{key.label}</h5>
            </Grid>
            <Grid item xs={8} lg={8}>
              <p className={`item-overview-value ${key.className}`}>{key.value}</p>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item container xs={12} lg={mediumGridSpacing} xl={largeGridSpacing}>
        <h2 className="item-overview-heading ">Stocks Information</h2>
        {itemStock.map(key => (
          <Grid key={key.label} item container>
            <Grid item xs={4} lg={4}>
              <h5 className="item-overview-title">{key.label}</h5>
            </Grid>
            <Grid item xs={8} lg={8}>
              <p className={`item-overview-value ${key.className}`}>{key.value}</p>
            </Grid>
          </Grid>
        ))}
      </Grid>
      {itemImage && (
        <Grid item xs={12} xl={4}>
          {itemImage && (
            <>
              <h2 className="item-overview-heading ">Item Image</h2>

              <img
                src={itemImage}
                alt=" alternate text"
                style={{ maxWidth: '100%', maxHeight: 250, objectFit: 'cover' }}
              />
            </>
          )}
        </Grid>
      )}

      <Grid item xs={12} lg={mediumGridSpacing} xl={largeGridSpacing}>
        <h2 className="item-overview-heading ">Purchase Information</h2>
        <Grid item container>
          <Grid item xs={4} lg={4}>
            <h5 className="item-overview-title">Purchase Account</h5>
          </Grid>
          <Grid item xs={8} lg={8}>
            <p className="item-overview-value">Account of Sale</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={mediumGridSpacing} xl={largeGridSpacing}>
        <h2 className="item-overview-heading ">Sales Information</h2>

        <Grid item container>
          <Grid item xs={4} lg={4}>
            <h5 className="item-overview-title">Sale Account</h5>
          </Grid>
          <Grid item xs={8} lg={8}>
            <p className="item-overview-value">Sale</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
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
