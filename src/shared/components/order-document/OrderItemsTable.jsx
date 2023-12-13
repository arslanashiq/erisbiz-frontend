import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import formatAmount from 'utilities/formatAmount';
import { Box } from '@mui/material';

function OrderItemsTable({ orderDetail, keyValue }) {
  const formatStyle = { maximumFractionDigits: 2, minimumFractionDigits: 0 };
  const getTotalAmount = () => {
    let amount = orderDetail.without_change_grand_total;
    if (orderDetail?.refunded_amount) amount -= orderDetail.refunded_amount;
    if (orderDetail?.payment_amount) amount -= orderDetail.payment_amount;
    if (orderDetail?.credits_used) amount -= orderDetail.credits_used;
    if (orderDetail?.credit_applied) amount -= orderDetail.credit_applied;

    return amount;
  };
  return (
    <>
      <table className="table1 w-100">
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '3px 20px', width: '20%' }}>Item</th>
            <th style={{ width: '10%', padding: 'auto 20px' }}>Currency</th>
            <th style={{ width: '10%' }}>Quantity</th>
            <th style={{ width: '10%' }}>Unit Price</th>
            <th style={{ width: '10%' }}>Amount</th>
            <th style={{ width: '10%' }}>Discount</th>
            <th style={{ width: '10%' }}>VAT</th>
            <th style={{ width: '15%' }}>Gross Amount</th>
          </tr>
        </thead>
        {/* Detail */}
        <tbody>
          {orderDetail[keyValue]?.length > 0 &&
            orderDetail[keyValue].map(item => (
              <tr key={uuid()}>
                <td style={{ textAlign: 'left', padding: '3px 20px' }}>{item.service_type}</td>
                <td>{item.currency_symbol}</td>
                <td>{formatAmount(item.num_nights, formatStyle)}</td>
                <td>{formatAmount(item.unit_price_ex_vat)}</td>
                <td>{formatAmount(item.gross_amount)}</td>
                <td>{formatAmount(item.discount)}</td>
                <td>{formatAmount(item.vat_amount)}</td>
                <td> {formatAmount(item.net_amount)}</td>
              </tr>
            ))}
          <tr>
            <td
              style={{
                minWidth: '300px',
                textAlign: 'left',
                padding: '3px 20px',
                borderRight: 'none',
              }}
              colSpan="4"
            >
              Grand Total ({orderDetail.currency_symbol})
            </td>
            <td>{formatAmount(orderDetail.without_change_amount_total)}</td>
            <td>{formatAmount(orderDetail.without_change_discount_total)}</td>
            <td>{formatAmount(orderDetail.without_change_vat_total)}</td>
            <td>{formatAmount(orderDetail.without_change_grand_total)}</td>
          </tr>
          {/* {orderDetail.currency !== 'AED' && (
            <tr style={{ backgroundColor: 'rgb(226 226 228 / 26%)' }}>
              <td
                style={{
                  textAlign: 'left',
                  padding: '3px 20px',
                  borderRight: 'none',
                }}
              >
                Grand Total
              </td>
              <td>{orderDetail.currency}</td>
              <td colSpan="2">{orderDetail.exchange_rate}</td>
              <td>{orderDetail.bcy_amount_total}</td>
              <td> </td>
              <td>{orderDetail.bcy_grand_total}</td>
            </tr>
          )} */}
        </tbody>
      </table>
      <Box>
        <Box className="entries">
          <Box className="entries-child">
            <Box className="names">
              <p>Grand Total:</p>
            </Box>
            <Box className="amounts">
              <p>
                {formatAmount(orderDetail.without_change_grand_total - orderDetail.without_change_vat_total)}{' '}
                {orderDetail.currency_symbol}
              </p>
            </Box>
          </Box>
        </Box>
        <Box className="entries">
          <Box className="entries-child">
            <Box className="names">
              <p>VAT Total:</p>
            </Box>
            <Box className="amounts">
              <p>
                {formatAmount(orderDetail.without_change_vat_total)} {orderDetail.currency_symbol}
              </p>
            </Box>
          </Box>
        </Box>
        <Box className="entries">
          <Box className="entries-child">
            <Box className="names">
              <p>Total:</p>
            </Box>
            <Box className="amounts">
              <p>
                {formatAmount(orderDetail.without_change_grand_total)} {orderDetail.currency_symbol}
              </p>
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
                <p>
                  (-){formatAmount(orderDetail.refunded_amount)} {orderDetail.currency_symbol}
                </p>
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
                <p>
                  (-){formatAmount(orderDetail.credits_used)} {orderDetail.currency_symbol}
                </p>
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
                <p>
                  (-){formatAmount(orderDetail.credit_applied)} {orderDetail.currency_symbol}
                </p>
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
                <p>
                  (-){formatAmount(orderDetail.payment_amount)} {orderDetail.currency_symbol}
                </p>
              </Box>
            </Box>
          </Box>
        )}
        <Box className="pointer">
          <p style={{ marginLeft: 5 }}>Total ({orderDetail.currency_symbol}):</p>
          <p>
            {formatAmount(getTotalAmount())} {orderDetail.currency_symbol}
          </p>
        </Box>
      </Box>
    </>
  );
}
OrderItemsTable.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
};

export default OrderItemsTable;
