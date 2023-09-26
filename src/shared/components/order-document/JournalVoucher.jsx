import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

import formatAmount from 'utilities/formatAmount';

function JournalVoucher({ orderDetail, keyValue, orderInfo }) {
  return (
    <table className="table1 w-100">
      <thead>
        <tr>
          {orderInfo.headCells.map(cell => (
            <th style={{ padding: '6px 20px', textAlign: cell.align }} key={uuid()}>
              {cell.label}
            </th>
          ))}
        </tr>
      </thead>
      {/* Detail */}
      <tbody>
        {orderDetail[keyValue]?.length > 0 &&
          orderDetail[keyValue].map(item => (
            <tr key={uuid()}>
              <td style={{ width: '50%', textAlign: 'left' }}>{formatAmount(item?.account_name)}</td>
              <td>
                {orderDetail.currency_symbol}
                {formatAmount(item?.debit)}
              </td>
              <td>
                {orderDetail.currency_symbol}
                {formatAmount(item?.credit)}
              </td>
            </tr>
          ))}
        <tr style={{ backgroundColor: '#F7F7F8' }}>
          <td style={{ textAlign: 'end' }}>Total</td>
          <td>
            {orderDetail.currency_symbol}
            {formatAmount(orderDetail?.total)}
          </td>
          <td>
            {orderDetail.currency_symbol}
            {formatAmount(orderDetail?.total)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
JournalVoucher.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
};

export default JournalVoucher;
