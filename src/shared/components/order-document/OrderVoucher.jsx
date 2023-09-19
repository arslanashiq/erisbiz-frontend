import React from 'react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// utilities
import formatAmount from 'utilities/formatAmount';

function OrderVoucher({ orderDetail, keyValue }) {
  return (
    <>
      {/* Payment Voucher */}
      <div style={{ marginTop: 60 }}>
        <div className="row">
          <div className="col-sm-3 invoice-headings">
            <p>Payment Date</p>
          </div>
          <div className="col-sm-9 invoice-details">
            <p>{orderDetail.payment_date}</p>
            <hr />
          </div>
        </div>
        {orderDetail.reference_num && (
          <div className="row">
            <div className="col-sm-3 invoice-headings">
              <p>Reference Number</p>
            </div>
            <div className="col-sm-9 invoice-details">
              <p>{orderDetail.reference_num}</p>
              <hr />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-sm-3 invoice-headings">
            <p>Payment Method</p>
          </div>
          <div className="col-sm-9 invoice-details">
            <p>{orderDetail.payment_mode}</p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 invoice-headings">
            <p>Paid Through</p>
          </div>
          <div className="col-sm-9 invoice-details">
            <p>{orderDetail.chart_of_account_name}</p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 invoice-headings">
            <p>Amount Paid (AED)</p>
          </div>
          <div className="col-sm-9 invoice-details">
            <p>
              {orderDetail.currency_symbol}
              {orderDetail.total}
            </p>
            <hr />
          </div>
        </div>
      </div>
      {/* ******** Amount Recieved ************** */}
      <div className="d-flex justify-content-end mt-5">
        <div className="amount float-end">
          <p>Amount Paid</p>
          <p style={{ fontSize: 25 }}>
            {orderDetail.currency_symbol}
            {orderDetail.total}
          </p>
        </div>
      </div>

      {orderDetail && orderDetail.over_payment !== '0.00' && (
        <div className="over-payment">
          <h5>Overpayment</h5>
          <h4>
            {orderDetail.currency_symbol}
            {orderDetail.over_payment}
          </h4>
        </div>
      )}

      {/* ********* Payment For  ************* */}
      {orderDetail[keyValue] && orderDetail[keyValue].length > 0 && (
        <div className="row mt-5">
          <div className="col-md-12">
            <h3 className="payment-for-heading">Payment For</h3>
            <div className="payment-headings">
              <p>Bill Number</p>
              <p>Bill Date</p>
              <p>Bill Amount</p>
              <p>Payment Date</p>
              <p>Payment Amount</p>
            </div>
            {orderDetail[keyValue]?.length > 0 &&
              orderDetail[keyValue].map(item => (
                <div key={uuid()} className="payment-details">
                  {item.bill ? (
                    <Link to={`/pages/accounting/purchases/bills/${item.bill.id}/detail`}>
                      {item.bill.bill_num}
                    </Link>
                  ) : (
                    <p>Supplier Opening Balance</p>
                  )}
                  {item.bill && <p>{moment(item.bill.bill_date).format('YYYY-MM-DD')}</p>}
                  {item.supplier && <p>{moment(item.supplier.bill_date).format('YYYY-MM-DD')}</p>}
                  {item.bill && (
                    <p>
                      {orderDetail.currency_symbol}
                      {formatAmount(item.bill.grand_total)}
                    </p>
                  )}
                  {item.supplier && (
                    <p>
                      {orderDetail.currency_symbol}
                      {formatAmount(item.supplier.grand_total)}
                    </p>
                  )}
                  <p>{moment(item.created_at).format('YYYY-MM-DD')}</p>
                  {!item.bill && !item.supplier && (
                    <>
                      <p />
                      <p />
                    </>
                  )}
                  <p>
                    {orderDetail.currency_symbol}
                    {formatAmount(item.amount_applied)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
OrderVoucher.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
};

export default OrderVoucher;
