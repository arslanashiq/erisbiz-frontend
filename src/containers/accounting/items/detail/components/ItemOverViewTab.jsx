import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, useMediaQuery } from '@mui/material';
import theme from 'styles/mui/theme';
// import { v4 as uuid } from 'uuid';

function ItemOverViewTab({ item, itemDetail, itemStock, itemImage, itemDescription }) {
  const largeGridSpacing = useMemo(() => (itemImage ? 4 : 6), [itemImage]);
  const mediumGridSpacing = useMemo(() => (itemImage ? 6 : 6), [itemImage]);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const getItemDescription = () => {
    if (!itemDescription) return '';
    return (
      <Grid item xs={12} lg={12}>
        <Grid item container>
          <Grid item xs={itemImage ? 1 : 2} lg={itemImage ? 1 : 2}>
            <h5 className="item-overview-title ">Description</h5>
          </Grid>
          <Grid item xs={itemImage ? 11 : 10} lg={itemImage ? 11 : 10}>
            <p className={`${itemImage ? 'ps-4' : ''} item-overview-value`}>{itemDescription}</p>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  const handleRender = key => {
    if (!isLargeScreen) {
      return true;
    }
    if (key === 'Description') {
      return false;
    }
    return true;
  };
  return (
    <Grid container spacing={2} alignItems="self-start">
      <Grid item xs={12} lg={mediumGridSpacing} xl={largeGridSpacing}>
        <h2 className="item-overview-heading ">Item Information</h2>
        {itemDetail.map(key => (
          <Grid key={key.label} item container>
            {handleRender(key.label) && (
              <>
                <Grid item xs={4} lg={4}>
                  <h5 className="item-overview-title">{key.label}</h5>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <p className={`item-overview-value ${key.className}`}>{key.value}</p>
                </Grid>
              </>
            )}
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
      {isLargeScreen && getItemDescription()}

      <Grid item xs={12} lg={mediumGridSpacing} xl={largeGridSpacing}>
        <h2 className="item-overview-heading ">Purchase Information</h2>
        <Grid item container>
          <Grid item xs={4} lg={4}>
            <h5 className="item-overview-title">Purchase Account</h5>
          </Grid>
          <Grid item xs={8} lg={8}>
            <p className="item-overview-value">{item.account_name}</p>
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
            <p className="item-overview-value">{item.account_name}</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ItemOverViewTab.propTypes = {
  item: PropTypes.object,
  itemDetail: PropTypes.array,
  itemStock: PropTypes.array,
  itemImage: PropTypes.string,
  itemDescription: PropTypes.string,
};
ItemOverViewTab.defaultProps = {
  itemDetail: [],
  itemStock: [],
  itemImage: null,
  itemDescription: '',
  item: {},
};
export default ItemOverViewTab;
