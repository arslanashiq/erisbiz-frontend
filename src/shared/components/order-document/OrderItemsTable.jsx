import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import formatAmount from 'utilities/formatAmount';

function OrderItemsTable({ orderDetail, keyValue }) {
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
                <td>{item.num_nights}</td>
                <td>{item.unit_price_ex_vat}</td>
                <td>{item.gross_amount}</td>
                <td>{item.discount}</td>
                <td>{item.vat_amount}</td>
                <td> {item.net_amount}</td>
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
            <td>{orderDetail.without_change_amount_total}</td>
            <td>{orderDetail.without_change_discount_total}</td>
            <td>{orderDetail.without_change_vat_total}</td>
            <td>{orderDetail.without_change_grand_total}</td>
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
      <div>
        <div className="entries">
          <div className="entries-child">
            <div className="names">
              <p>Grand Total</p>
            </div>
            <div className="amounts">
              <p>
                {formatAmount(orderDetail.without_change_grand_total - orderDetail.without_change_vat_total)}{' '}
                {orderDetail.currency_symbol}
              </p>
            </div>
          </div>
        </div>
        <div className="entries">
          <div className="entries-child">
            <div className="names">
              <p>VAT Total</p>
            </div>
            <div className="amounts">
              <p>
                {orderDetail.without_change_vat_total} {orderDetail.currency_symbol}
              </p>
            </div>
          </div>
        </div>
        <div className="pointer">
          <p style={{ marginLeft: 5 }}>Total ({orderDetail.currency_symbol})</p>
          <p>
            {formatAmount(orderDetail.without_change_grand_total)} {orderDetail.currency_symbol}
          </p>
        </div>
      </div>
    </>
  );
}
OrderItemsTable.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
};

export default OrderItemsTable;
