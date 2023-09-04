import React from 'react';
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
          {orderDetail &&
            orderDetail[keyValue] &&
            orderDetail[keyValue].length > 0 &&
            orderDetail[keyValue].map(item => (
              <tr key={item.id}>
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
              Grand Total ({orderDetail.currency})
            </td>
            <td>{orderDetail.amount_total}</td>
            <td> </td>
            <td>{orderDetail.vat_total}</td>
            <td>{orderDetail.grand_total}</td>
          </tr>
          {orderDetail.currency !== 'AED' && (
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
              <td>AED</td>
              <td colSpan="2">{orderDetail.exchange_rate}</td>
              <td>{orderDetail.bcy_amount_total}</td>
              <td> </td>
              <td>{orderDetail.bcy_grand_total}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <div className="entries">
          <div className="entries-child">
            <div className="names">
              <p>Grand Total</p>
            </div>
            <div className="amounts">
              {console.log(orderDetail, 'ksajdldlkjsadddlkj')}
              <p>
                {orderDetail.currency_symbol}
                {formatAmount(
                  orderDetail.without_change_amount_total - orderDetail.without_change_discount_total
                )}
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
                {orderDetail.currency_symbol}
                {orderDetail.without_change_vat_total}
              </p>
            </div>
          </div>
        </div>
        <div className="pointer">
          <p style={{ marginLeft: 5 }}>Total ({orderDetail.currency})</p>
          <p>
            {orderDetail.currency_symbol}
            {formatAmount(orderDetail.without_change_grand_total)}
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
