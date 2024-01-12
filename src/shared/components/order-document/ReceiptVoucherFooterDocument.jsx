import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import formatAmount from 'utilities/formatAmount';
import { v4 as uuid } from 'uuid';

function ReceiptVoucherFooterDocument({ orderDetail, keyValue }) {
  const getLink = item => {
    if (item?.invoice) {
      return `/pages/accounting/sales/sale-invoice/${item?.invoice?.id}/detail`;
    }
    return `/pages/accounting/sales/customers/${item?.sales_company}/detail`;
  };
  const getName = item => {
    if (item?.invoice) {
      return item?.invoice?.invoice_formatted_number || item?.invoice?.id;
    }
    return 'Opening Balance';
  };
  const getAmount = (item, key) => {
    if (item.invoice) {
      return item?.invoice[key];
    }
    return item?.sales_company[key];
  };
  return (
    orderDetail[keyValue]?.length > 0 &&
    orderDetail[keyValue].map(item => (
      <div key={uuid()} className="payment-details">
        <p>{moment(item?.invoice?.date).format('YYYY-MM-DD')}</p>
        <Link to={getLink(item)}>{getName(item)}</Link>
        <p>{`${orderDetail.currency_symbol} ${formatAmount(getAmount(item, 'grand_total'))}`}</p>
        <p>
          {orderDetail.currency_symbol}
          {formatAmount(getAmount(item, 'amount_due'))}
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
