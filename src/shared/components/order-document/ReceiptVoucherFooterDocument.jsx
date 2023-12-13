import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import formatAmount from 'utilities/formatAmount';
import { v4 as uuid } from 'uuid';

function ReceiptVoucherFooterDocument({ orderDetail, keyValue }) {
  return (
    orderDetail[keyValue]?.length > 0 &&
    orderDetail[keyValue].map(item => (
      <div key={uuid()} className="payment-details">
        <p>{moment(item?.invoice?.date).format('YYYY-MM-DD')}</p>
        <Link to={`/pages/accounting/sales/sale-invoice/${item.invoice.id}/detail`}>
          {item?.invoice?.invoice_formatted_number || item?.invoice?.id}
        </Link>
        <p>{`${orderDetail.currency_symbol} ${formatAmount(item?.invoice?.grand_total)}`}</p>
        <p>
          {orderDetail.currency_symbol}
          {formatAmount(item?.invoice?.amount_due)}
        </p>

        <p>
          {orderDetail.currency_symbol}
          {formatAmount(item?.amount_applied)}
        </p>
      </div>
    ))
  );
}

export default ReceiptVoucherFooterDocument;
