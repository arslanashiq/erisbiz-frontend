import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import formatAmount from 'utilities/formatAmount';
import { v4 as uuid } from 'uuid';

function PurchaseVoucherFooterDocument({ orderDetail, keyValue }) {
  return (
    orderDetail[keyValue]?.length > 0 &&
    orderDetail[keyValue].map(item => (
      <div key={uuid()} className="payment-details">
        {/* Date */}
        {item.bill && <p>{moment(item.bill.bill_date).format('YYYY-MM-DD')}</p>}
        {/* Bill Number */}
        {item.bill ? (
          <Link to={`/pages/accounting/purchase/purchase-invoice/${item.bill.id}/detail`}>
            {item.bill.bill_num}
          </Link>
        ) : (
          <p>Supplier Opening Balance</p>
        )}
        {/* Purchase Order */}
        {item?.bill?.pur_order_num ? <p>{item.bill.pur_order_num}</p> : <p />}
        {/* grandTotal */}
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
        {/* Item amount Due */}
        {item.bill && (
          <p>
            {orderDetail.currency_symbol}
            {formatAmount(item.bill.amount_due)}
          </p>
        )}
        {/* payment applied */}
        <p>
          {orderDetail.currency_symbol}
          {formatAmount(item.amount_applied)}
        </p>
        {!item.bill && !item.supplier && (
          <>
            <p />
            <p />
          </>
        )}
      </div>
    ))
  );
}

export default PurchaseVoucherFooterDocument;
