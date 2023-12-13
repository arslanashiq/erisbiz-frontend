import React from 'react';
import { Box } from '@mui/material';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import formatAmount from 'utilities/formatAmount';
import PurchaseVoucherFooterDocument from './PurchaseVoucherFooterDocument';
import ReceiptVoucherFooterDocument from './ReceiptVoucherFooterDocument';

function OrderVoucher({ orderDetail, keyValue, orderInfo }) {
  return (
    <>
      {/* Payment Voucher */}
      <Box style={{ marginTop: 60 }}>
        <Box className="row">
          <Box className="col-sm-3 invoice-headings">
            <p>Payment Date</p>
          </Box>
          <Box className="col-sm-9 invoice-details">
            <p>{orderDetail.payment_date}</p>
            <hr />
          </Box>
        </Box>
        {orderDetail.reference_num && (
          <Box className="row">
            <Box className="col-sm-3 invoice-headings">
              <p>Reference Number</p>
            </Box>
            <Box className="col-sm-9 invoice-details">
              <p>{orderDetail.reference_num}</p>
              <hr />
            </Box>
          </Box>
        )}
        <Box className="row">
          <Box className="col-sm-3 invoice-headings">
            <p>Payment Method</p>
          </Box>
          <Box className="col-sm-9 invoice-details">
            <p>{orderDetail.payment_mode}</p>
            <hr />
          </Box>
        </Box>
        <Box className="row">
          <Box className="col-sm-3 invoice-headings">
            <p>Paid Through</p>
          </Box>
          <Box className="col-sm-9 invoice-details">
            <p>{orderDetail.chart_of_account_name}</p>
            <hr />
          </Box>
        </Box>
        <Box className="row">
          <Box className="col-sm-3 invoice-headings">
            <p>Amount Paid</p>
          </Box>
          <Box className="col-sm-9 invoice-details">
            <p>
              {orderDetail.currency_symbol}
              {formatAmount(orderDetail.total)}
            </p>
            <hr />
          </Box>
        </Box>
      </Box>
      {/* ******** Amount Recieved ************** */}
      <Box className="d-flex justify-content-end mt-5">
        <Box className="amount float-end">
          <p>Amount Paid</p>
          <p style={{ fontSize: 25 }}>
            {orderDetail.currency_symbol}
            {formatAmount(orderDetail.total)}
          </p>
        </Box>
      </Box>

      {orderDetail && orderDetail.over_payment > 0 && (
        <Box className="over-payment">
          <h5>Overpayment</h5>
          <h4>
            {orderDetail.currency_symbol}
            {formatAmount(orderDetail.over_paid || orderDetail.over_payment)}
          </h4>
        </Box>
      )}
      {orderDetail && orderDetail.refund_payment > 0 && (
        <Box className="over-payment">
          <h5>Refunded</h5>
          <h4>
            {orderDetail.currency_symbol}
            {formatAmount(orderDetail.refund_payment)}
          </h4>
        </Box>
      )}

      {/* ********* Payment For  ************* */}
      {orderDetail[keyValue] && orderDetail[keyValue].length > 0 && (
        <Box className="row mt-5">
          <Box className="col-md-12">
            <h3 className="payment-for-heading">Payment For</h3>
            <Box className="payment-headings">
              {orderInfo.headCells.map(cell => (
                <p key={uuid()}>{cell.label}</p>
              ))}
            </Box>
            {orderInfo.showSaleSectionFooter ? (
              <ReceiptVoucherFooterDocument orderDetail={orderDetail} keyValue={keyValue} />
            ) : (
              <PurchaseVoucherFooterDocument orderDetail={orderDetail} keyValue={keyValue} />
            )}
          </Box>
        </Box>
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
