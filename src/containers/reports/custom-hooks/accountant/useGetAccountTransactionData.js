import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetAccountTransactionData(accountTransactionResponse) {
  const getLinkByType = item => {
    if (item.transaction_type === 'Expense' || item.transaction_type === 'Expense Paid') {
      return `/pages/accounting/purchase/expenses/${item.object_id}/detail`;
    }
    if (item.transaction_type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.object_id}/detail`;
    }
    if (item.transaction_type === 'Debit Note') {
      return `/pages/accounting/purchase/debit-notes/${item.object_id}/detail`;
    }
    if (item.transaction_type === 'Supplier Payment') {
      return `/pages/accounting/purchase/payment-voucher/${item.object_id}/detail`;
    }
    if (item.transaction_type === 'Customer Receipt') {
      return `/pages/accounting/sales/receipt-voucher/${item.object_id}/detail`;
    }
    return false;
  };
  const { tableBody, totalAmount, totalDueAmount } = useMemo(() => {
    let total = 0;
    let dueAmount = 0;

    const body = [];
    accountTransactionResponse?.data?.data.forEach(item => {
      total += item.amount_total;
      dueAmount += item.amount_due;
      body.push([
        {
          value: moment(item.transaction_date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: item.account_name,
        },
        {
          value: item.transaction_detail,
        },
        {
          value: item.transaction_type,
        },
        {
          value: item.transaction_number,
        },
        {
          value: item.reference_number,
        },

        {
          value: formatAmount(item.bcy_debit),
          link: getLinkByType(item),
        },
        {
          value: formatAmount(item.bcy_credit),
          link: getLinkByType(item),
        },
        {
          value: formatAmount(item.bcy_credit - item.bcy_debit),
          link: getLinkByType(item),
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: total,
      totalDueAmount: dueAmount,
    };
  }, [accountTransactionResponse]);

  const tableFooter = useMemo(() => [[]], [totalAmount, totalDueAmount]);
  return { tableBody, tableFooter };
}

export default useGetAccountTransactionData;
