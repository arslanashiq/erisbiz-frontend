import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, useMediaQuery } from '@mui/material';
import theme from 'styles/mui/theme';
// import { v4 as uuid } from 'uuid';

function ItemOverViewTab({ item, itemDetail, itemStock, itemImage, itemDescription, isService }) {
  const largeGridSpacing = useMemo(() => (itemImage ? 4 : 6), [itemImage]);
  const mediumGridSpacing = useMemo(() => (itemImage ? 6 : 6), [itemImage]);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const getItemDescription = () => {
    if (!itemDescription) return '';
    return (
      <Grid item xs={12} lg={12}>
        <Grid item container xs={12} lg={12}>
          <Grid item xs={itemImage ? 2 : 3} lg={itemImage ? 2 : 3}>
            <h5 className="item-overview-title ">Description</h5>
          </Grid>
          <Grid item xs={itemImage ? 10 : 9} lg={itemImage ? 10 : 9}>
            <p className={`${itemImage ? '' : ''} item-overview-value`}>{itemDescription}</p>
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
          <Grid key={key.label} item container alignItems="center" mb={1}>
            {handleRender(key.label) && key?.value?.length > 0 && (
              <>
                <Grid item xs={6} lg={6}>
                  <h5 className="item-overview-title">{key.label}</h5>
                </Grid>
                <Grid item xs={6} lg={6}>
                  <p className={`item-overview-value ps-2 mb-0 ${key.className}`}>{key.value}</p>
                </Grid>
              </>
            )}
          </Grid>
        ))}
      </Grid>
      <Grid item container xs={12} lg={mediumGridSpacing} xl={largeGridSpacing}>
        {!isService && (
          <>
            <h2 className="item-overview-heading ">Stocks Information</h2>
            {itemStock.map(key => (
              <Grid key={key.label} item container alignItems="center" mb={1}>
                <Grid item xs={6} lg={6}>
                  <h5 className="item-overview-title">{key.label}</h5>
                </Grid>
                <Grid item xs={6} lg={6}>
                  <p className={`item-overview-value mb-0 ${key.className}`}>{key.value}</p>
                </Grid>
              </Grid>
            ))}
          </>
        )}
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
          <Grid item xs={6} lg={6}>
            <h5 className="item-overview-title">Purchase Account</h5>
          </Grid>
          <Grid item xs={6} lg={6}>
            <p className="item-overview-value">{item.account_name}</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={mediumGridSpacing} xl={largeGridSpacing}>
        <h2 className="item-overview-heading ">Sales Information</h2>

        <Grid item container>
          <Grid item xs={6} lg={6}>
            <h5 className="item-overview-title">Sale Account</h5>
          </Grid>
          <Grid item xs={6} lg={6}>
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
  isService: PropTypes.bool,
};
ItemOverViewTab.defaultProps = {
  itemDetail: [],
  itemStock: [],
  itemImage: null,
  itemDescription: '',
  item: {},
  isService: false,
};
export default ItemOverViewTab;
