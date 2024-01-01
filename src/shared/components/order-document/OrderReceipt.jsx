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

function OrderReceipt({
  orderDetail,
  orderInfo,
  keyValue,
  showStatus,
  showItemsTable,
  showOrderVoucher,
  showJournalVoucher,
}) {
  const company = useSelector(state => state.user.company);
  const { name: companyName, logo: companyLogo } = company;
  const renderCompanyHeaderRow = headerRowData => (
    <Grid container spacing={5}>
      {headerRowData.map(column => (
        <Grid key={`${column.title} ${column.value}`} item xs={column.columns}>
          <Typography noWrap={column.noWrap} sx={{ fontSize: 14, color: 'black' }}>
            <strong style={{ color: palette.primary.main }}>{column.title}: </strong>
            {column.value}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
  const renderOrderInfo = (data, key, title, isDate) => {
    if (!data[key]) return;
    return (
      <>
        <Grid item xs={4}>
          <Typography color="primary" sx={{ fontWeight: 600, fontSize: 14 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={7}>
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
          <Grid item xs={4} lg={4}>
            <img
              // src="/logo.png"
              src={companyLogo}
              alt=""
              style={{ maxWidth: 250 }}
            />
          </Grid>
          <Grid item xs={7} justifyContent="space-around" mb={7}>
            <Typography color="primary" sx={{ fontWeight: 'bold', fontSize: 18 }}>
              {companyName}
            </Typography>
            <Divider sx={{ height: '2px', backgroundColor: palette.primary.main, marginBottom: 1 }} />
            {renderCompanyHeaderRow([
              { title: 'TRN', value: COMPANY_TRN, noWrap: true, columns: 5 },
              { title: 'Email', value: COMPANY_EMAIL, noWrap: true, columns: 7 },
            ])}
            {renderCompanyHeaderRow([
              { title: 'Phone', value: company.phone || COMPANY_PHONE, noWrap: true, columns: 5 },
              { title: 'Address', value: company.location || COMPANY_ADDRESS, columns: 7 },
            ])}
          </Grid>

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
              {renderOrderInfo(orderInfo, 'formated_order_number', 'Invoice #')}
              {renderOrderInfo(orderInfo, 'date', 'Invoice Date', true)}
              {renderOrderInfo(orderInfo, 'sale_person', 'Sale Person')}
              {renderOrderInfo(orderInfo, 'currency_symbol', 'Currency')}
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
