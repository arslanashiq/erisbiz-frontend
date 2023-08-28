/* eslint-disable dot-notation */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'styles/purchase-order-template.scss';
import formatAmount from 'utilities/formatAmount';

function OrderReceipt({ orderDetail, orderInfo, keyValue }) {
  return (
    <div className="invoice-receipt-main-container">
      <div className="check">
        <header className="paidArrow"> {orderDetail.status} </header>
      </div>
      <div style={{ padding: 20 }}>
        <div className="invoice-receipt-container">
          <div className="box-1">
            <img src="/logo.png" alt="" id="logo" />
            <p>Luxury Events and VIP Travel DMCC</p>
            <p>Office # 1206, JBC 4, Cluster N,</p>
            <p>Jumeirah Lake Towers, Dubai,</p>
            <p>United Arab Emirates</p>
            <p>Phone: +971 4 379 9960</p>
            <p>TRN: 100204615700003</p>
            <p>info@luxuryexplorersme.com</p>
          </div>
          <div className="box-2">
            <h1
              style={{
                fontSize: '27px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              {orderInfo.type}
            </h1>
            <p
              style={{
                fontSize: '16px',
                textAlign: 'left',
                fontWeight: 'bold',
              }}
            >
              {orderInfo.order_number}
            </p>
            <div className="boxSecond" style={{ fontSize: '16px' }}>
              {orderInfo.formated_order_number && (
                <div className="entry-info">
                  <p className="head">OrderNumber:</p>
                  <p>{orderInfo.formated_order_number}</p>
                </div>
              )}

              {orderInfo.date && (
                <div className="entry-info">
                  <p className="head">Date:</p>
                  <p>{orderInfo.date}</p>
                </div>
              )}
              {orderInfo.location && (
                <div className="entry-info">
                  <p className="head">Location:</p>
                  <p>{orderInfo.location}</p>
                </div>
              )}
            </div>
            <div id="bill_to">
              <div className="boxSecond" style={{ fontSize: '15px' }}>
                <div className="entry-info">
                  <p className="head">Supplier:</p>
                  <p>
                    <Link to={`/pages/accounting/purchases/suppliers/${orderDetail.supplier_id}/detail`}>
                      {orderInfo.supplier.supplier_name}
                    </Link>
                  </p>
                </div>
                <div className="entry-info">
                  <p className="head">Country:</p>
                  <p>{orderInfo.supplier.country}</p>
                </div>
                <div className="entry-info">
                  <p className="head">City:</p>
                  <p>{orderInfo.supplier.city}</p>
                </div>
                {orderInfo.supplier_trn && (
                  <div className="entry-info">
                    <p className="head">TRN:</p>
                    <p>{orderInfo.supplier_trn}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
}

OrderReceipt.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
};

export default OrderReceipt;
