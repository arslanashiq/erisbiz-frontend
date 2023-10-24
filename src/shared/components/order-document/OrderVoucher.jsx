import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import PurchaseVoucherFooterDocument from './PurchaseVoucherFooterDocument';
import ReceiptVoucherFooterDocument from './ReceiptVoucherFooterDocument';

function OrderVoucher({ orderDetail, keyValue, orderInfo }) {
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

      {orderDetail && (orderDetail.over_payment > 0 || orderDetail.over_paid > 0) && (
        <div className="over-payment">
          <h5>Overpayment</h5>
          <h4>
            {orderDetail.currency_symbol}
            {orderDetail.over_payment || orderDetail.over_paid}
          </h4>
        </div>
      )}
      {orderDetail && orderDetail.refund_payment > 0 && (
        <div className="over-payment">
          <h5>Refunded</h5>
          <h4>
            {orderDetail.currency_symbol}
            {orderDetail.refund_payment}
          </h4>
        </div>
      )}

      {/* ********* Payment For  ************* */}
      {orderDetail[keyValue] && orderDetail[keyValue].length > 0 && (
        <div className="row mt-5">
          <div className="col-md-12">
            <h3 className="payment-for-heading">Payment For</h3>
            <div className="payment-headings">
              {orderInfo.headCells.map(cell => (
                <p key={uuid()}>{cell.label}</p>
              ))}
            </div>
            {orderInfo.showSaleSectionFooter ? (
              <ReceiptVoucherFooterDocument orderDetail={orderDetail} keyValue={keyValue} />
            ) : (
              <PurchaseVoucherFooterDocument orderDetail={orderDetail} keyValue={keyValue} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
OrderVoucher.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
};

export default OrderVoucher;
