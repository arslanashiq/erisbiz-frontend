import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import formatAmount, { handleGetAmountInWords } from 'utilities/formatAmount';
import { Box, Grid, Typography } from '@mui/material';
import { getPaidAmount } from '../purchase-item/utilities/helpers';

function OrderItemsTable({ orderInfo, orderDetail, keyValue }) {
  const formatStyle = { maximumFractionDigits: 2, minimumFractionDigits: 0 };

  const renderBankDetails = (title, value) => (
    <Grid key={`${value} ${title}`} container item xs={12} lg={12}>
      <Grid item xs={6}>
        <Typography color="primary" sx={{ fontSize: 15, fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography color="primary" sx={{ fontSize: 15, fontWeight: 500 }}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
  return (
    <>
      <table className="table1 w-100">
        <thead>
          <tr>
            <th style={{ width: '5%' }}>Sr.#</th>
            <th style={{ textAlign: 'left', padding: '8px 10px', width: '20%' }}>Item</th>
            {/* <th style={{ width: '10%', padding: 'auto 20px' }}>Currency</th> */}
            <th style={{ width: '10%' }}>Quantity</th>
            <th style={{ width: '10%' }}>Unit Price</th>
            <th style={{ width: '10%' }}>Amount</th>
            <th style={{ width: '10%' }}>Discount</th>
            <th style={{ width: '10%' }}>VAT</th>
            <th style={{ width: '15%' }}>Net Amount</th>
          </tr>
        </thead>
        {/* Detail */}
        <tbody>
          {orderDetail[keyValue]?.length > 0 &&
            orderDetail[keyValue].map((item, index) => (
              <tr key={uuid()}>
                <td>{index + 1}</td>
                <td style={{ textAlign: 'left', padding: '8px 10px' }}>{item.service_type}</td>
                {/* <td>{item.currency_symbol}</td> */}
                <td>{formatAmount(item.num_nights, formatStyle)}</td>
                <td>{formatAmount(item.unit_price_ex_vat)}</td>
                <td>{formatAmount(item.gross_amount)}</td>
                <td>{formatAmount(item.discount)}</td>
                <td>{formatAmount(item.vat_amount)}</td>
                <td> {formatAmount(item.net_amount)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Grid container pl={3} pt={3}>
        <Grid container item xs={6} lg={6}>
          <Grid item xs={12}>
            <Typography color="primary" sx={{ fontWeight: 'bold', fontSize: 16, paddingBottom: 1 }}>
              Total Amount in Words
            </Typography>

            <Typography color="primary" sx={{ fontSize: 15, fontWeight: 500 }}>
              {orderDetail.currency_symbol} -{' '}
              {handleGetAmountInWords(orderDetail?.without_change_grand_total)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} lg={6}>
          <Box className="entries">
            <Box className="entries-child">
              <Box className="names">
                <p>Sub Total:</p>
              </Box>
              <Box className="amounts">
                <p>{formatAmount(orderDetail.without_change_amount_total || 0)}</p>
              </Box>
            </Box>
          </Box>
          <Box className="entries">
            <Box className="entries-child">
              <Box className="names">
                <p>Total Discount:</p>
              </Box>
              <Box className="amounts">
                <p>{formatAmount(orderDetail.without_change_discount_total)}</p>
              </Box>
            </Box>
          </Box>
          <Box className="entries">
            <Box className="entries-child">
              <Box className="names">
                <p>VAT Amount:</p>
              </Box>
              <Box className="amounts">
                <p>{formatAmount(orderDetail.without_change_vat_total)}</p>
              </Box>
            </Box>
          </Box>

          {orderDetail?.refunded_amount > 0 && (
            <Box className="entries">
              <Box className="entries-child">
                <Box className="names">
                  <p>Refunded:</p>
                </Box>
                <Box className="amounts color-danger">
                  <p>(-){formatAmount(orderDetail.refunded_amount)}</p>
                </Box>
              </Box>
            </Box>
          )}
          {orderDetail?.credits_used > 0 && (
            <Box className="entries">
              <Box className="entries-child">
                <Box className="names">
                  <p>Credits Used:</p>
                </Box>
                <Box className="amounts color-danger">
                  <p>(-){formatAmount(orderDetail.credits_used)}</p>
                </Box>
              </Box>
            </Box>
          )}
          {orderDetail?.credit_applied > 0 && (
            <Box className="entries">
              <Box className="entries-child">
                <Box className="names">
                  <p>Credit Applied:</p>
                </Box>
                <Box className="amounts color-danger">
                  <p>(-){formatAmount(orderDetail.credit_applied)}</p>
                </Box>
              </Box>
            </Box>
          )}
          {orderDetail?.payment_amount > 0 && (
            <Box className="entries">
              <Box className="entries-child">
                <Box className="names">
                  <p>Payment Made:</p>
                </Box>
                <Box className="amounts color-danger">
                  <p>(-){formatAmount(orderDetail.payment_amount)}</p>
                </Box>
              </Box>
            </Box>
          )}
          <Box className="pointer">
            <p style={{ marginLeft: 5 }}>Net Total :</p>
            <p>{formatAmount(getPaidAmount(orderDetail))}</p>
          </Box>
        </Grid>
        <Grid container item xs={7} lg={7} mt={5}>
          {orderInfo?.bankDetail?.bank_name && (
            <>
              <Grid item xs={12}>
                <Typography color="primary" sx={{ fontWeight: 700, fontSize: 18, paddingBottom: 1 }}>
                  Bank Details:
                </Typography>
              </Grid>
              {renderBankDetails('Bank Name', orderInfo?.bankDetail?.bank_name)}
              {renderBankDetails('Account Holder Name', orderInfo?.bankDetail?.account_holder_name)}
              {renderBankDetails('Account Number / IBAN', orderInfo?.bankDetail?.IBAN)}
              {renderBankDetails('Swift Code', orderInfo?.bankDetail?.swift_code)}
            </>
          )}
        </Grid>
        <Grid container item xs={5} lg={5} mt={5} pr={2} justifyContent="end">
          <img
            src={
              orderInfo?.QRCode ||
              'https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png'
            }
            style={{ width: 140, objectFit: 'fill' }}
            alt="qr code"
          />
        </Grid>
      </Grid>
    </>
  );
}
OrderItemsTable.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
};

export default OrderItemsTable;
