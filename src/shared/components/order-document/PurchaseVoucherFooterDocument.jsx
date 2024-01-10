import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import formatAmount from 'utilities/formatAmount';
import { v4 as uuid } from 'uuid';

function PurchaseVoucherFooterDocument({ orderDetail, keyValue }) {
  const getLink = item => {
    if (item?.bill) {
      return `/pages/accounting/sales/sale-invoice/${item?.bill?.id}/detail`;
    }
    return `/pages/accounting/sales/customers/${item?.bill_num}/detail`;
  };
  const getName = item => {
    if (item?.bill) {
      return item?.bill?.bill_num;
    }
    return 'Opening Balance';
  };
  return (
    orderDetail[keyValue]?.length > 0 &&
    orderDetail[keyValue].map(item => (
      <div key={uuid()} className="payment-details">
        <p>{moment(item?.bill?.bill_date || item.created_at).format('YYYY-MM-DD')}</p>
        {/* Bill Number */}
        <Link to={getLink(item)}>{getName(item)}</Link>
        {/* Purchase Order */}
        <p>{item?.bill?.pur_order_num || '-'}</p>
        {/* grandTotal */}
        <p>
          {orderDetail.currency_symbol}
          {formatAmount(item?.bill?.grand_total || item.supplier?.grand_total)}
        </p>
        {/* Item amount Due */}
        <p>
          {orderDetail.currency_symbol}
          {formatAmount(item?.bill?.amount_due || item.supplier?.amount_due)}
        </p>

        {/* payment applied */}
        <p>
          {orderDetail.currency_symbol}
          {formatAmount(item.amount_applied)}
        </p>
      </div>
    ))
  );
}

export default PurchaseVoucherFooterDocument;
