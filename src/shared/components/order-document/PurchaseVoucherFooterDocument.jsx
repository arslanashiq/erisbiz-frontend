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
        {item.bill ? (
          <Link to={`/pages/accounting/purchases/bills/${item.bill.id}/detail`}>{item.bill.bill_num}</Link>
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
    ))
  );
}

export default PurchaseVoucherFooterDocument;
