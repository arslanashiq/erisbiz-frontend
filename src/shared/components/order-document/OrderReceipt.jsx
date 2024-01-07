/* eslint-disable  */
import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  COMPANY_ADDRESS,
  COMPANY_COUNTRY,
  COMPANY_EMAIL,
  COMPANY_OFFICE_ADDRESS,
  COMPANY_PHONE,
  COMPANY_TRN,
} from 'utilities/constants';
import { useSelector } from 'react-redux';
import OrderItemsTable from './OrderItemsTable';
import OrderVoucher from './OrderVoucher';
import JournalVoucher from './JournalVoucher';
import palette from 'styles/mui/theme/palette';
import 'styles/purchase-order-template/purchase-order-template.scss';
import moment from 'moment';
import OrderHeader from './OrderHeader';

function OrderReceipt({
  orderDetail,
  orderInfo,
  keyValue,
  showStatus,
  showItemsTable,
  showOrderVoucher,
  showJournalVoucher,
}) {
  const { company, email } = useSelector(state => state.user);
  const { name: companyName, logo: companyLogo, trn: companyTRN } = company;

  const renderOrderInfo = (data, key, title, isDate, titleColumn = 4, valueColumn = 7) => {
    if (!data[key]) return;
    return (
      <>
        <Grid item xs={titleColumn}>
          <Typography color="primary" sx={{ fontWeight: 600, fontSize: 14 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={valueColumn}>
          <Typography sx={{ fontSize: 14, color: 'black' }}>
            {isDate ? moment(data[key]).format('DD MMMM YYYY') : data[key]}
          </Typography>
        </Grid>
      </>
    );
  };

  const customerInfo = useMemo(
    () => orderInfo.invoiceToDetail || orderInfo.supplier || orderInfo.customer_info || {},
    [orderDetail]
  );

  return (
    <Box className="invoice-receipt-main-container">
      {showStatus && (
        <Box className="check">
          <header className="paidArrow"> {orderDetail.status} </header>
        </Box>
      )}

      <Box style={{ padding: '0px 20px 20px 20px' }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="cener"
          className="invoice-receipt-container"
        >
          <OrderHeader
            companyLogo={companyLogo}
            companyName={companyName}
            companyTRN={companyTRN}
            email={email}
            company={company}
          />
          <Grid container>
            <Grid item xs={12}>
              <Typography color="primary" sx={{ fontWeight: 800, fontSize: 35 }}>
                {orderInfo.type}
              </Typography>
              <Divider sx={{ height: '2px', backgroundColor: palette.primary.main, marginBottom: 1 }} />
            </Grid>

            <Grid container item xs={7}>
              <Grid item xs={12}>
                <Typography color="primary" sx={{ fontWeight: 700, fontSize: 18 }}>
                  Invoice To
                </Typography>
              </Grid>

              <Grid container>
                {/* trn */}
                {renderOrderInfo(customerInfo, 'trn', 'TRN #')}
                {/* attention to */}
                {renderOrderInfo(customerInfo, 'attention_to', 'Attention To')}
                {/* person name */}
                {renderOrderInfo(customerInfo, 'supplier_name', 'Supplier')}
                {renderOrderInfo(customerInfo, 'customer_name', 'Customer')}
                {/* address */}
                {renderOrderInfo(customerInfo, 'address', 'Address')}
                {/* city */}
                {renderOrderInfo(customerInfo, 'city', 'City')}
                {/* country */}
                {renderOrderInfo(customerInfo, 'country', 'Country')}
                {/* others */}
                {renderOrderInfo(customerInfo, 'po_box', 'PO Box #')}
              </Grid>
            </Grid>
            <Grid container item xs={5}>
              <Grid item xs={12}>
                <Typography color="primary" sx={{ fontWeight: 700, fontSize: 18 }}>
                  Information
                </Typography>
              </Grid>

              {/* invoice # */}
              {renderOrderInfo(
                orderInfo,
                'formated_order_number',
                `${orderInfo.informationTo || orderInfo.type} #`,
                false,
                6,
                6
              )}
              {renderOrderInfo(orderInfo, 'date', 'Date', true, 6, 6)}
              {renderOrderInfo(orderInfo, 'sale_person', 'Sale Person', false, 6, 6)}
              {renderOrderInfo(orderInfo, 'currency_symbol', 'Currency', false, 6, 6)}
            </Grid>
          </Grid>
        </Grid>
        {/* Purchase Order and Purchase Invoice */}
        {showItemsTable && (
          <OrderItemsTable orderInfo={orderInfo} orderDetail={orderDetail} keyValue={keyValue} />
        )}

        {showOrderVoucher && (
          <OrderVoucher orderDetail={orderDetail} keyValue={keyValue} orderInfo={orderInfo} />
        )}
        {showJournalVoucher && (
          <JournalVoucher orderDetail={orderDetail} keyValue={keyValue} orderInfo={orderInfo} />
        )}

        <Box
          sx={{
            with: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          <Typography sx={{ color: palette.primary.main, fontSize: 12 }}>
            This document has been generated electronically and does not necessitate a physical stamp or
            signature
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

OrderReceipt.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
  showStatus: PropTypes.bool,
  showItemsTable: PropTypes.bool,
  showOrderVoucher: PropTypes.bool,
  showJournalVoucher: PropTypes.bool,
};
OrderReceipt.defaultProps = {
  showStatus: true,
  showItemsTable: true,
  showOrderVoucher: false,
  showJournalVoucher: false,
};

export default OrderReceipt;
