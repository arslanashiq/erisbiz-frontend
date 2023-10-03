import { useMemo } from 'react';
import moment from 'moment';

function useGetPayableSummaryData(payableSummaryResponse) {
  const { tableBody, totalAmount, totalRemainingAmount } = useMemo(() => {
    let amount = 0;
    let remainingAmount = 0;
    const body = [];
    payableSummaryResponse?.data?.data.forEach(item => {
      amount += item.bcy_sales_with_tax_amount;
      remainingAmount += item.amount_due;
      body.push([
        {
          value: item.status,
          style: { textAlign: 'start' },
        },
        { value: moment(item.date).format('DD MMM YYYY') },
        {
          value: item.number,
          link: `/pages/accounting/purchase/${item.type === 'Bill' ? 'purchase-invoice' : 'debit-notes'}/${
            item.id
          }/detail`,
        },
        {
          value: item.account_name,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
        },
        {
          value: item.type,
        },
        {
          value: `${item.currency_symbol} ${item.bcy_sales_with_tax_amount}`,
          link: `/pages/accounting/purchase/${
            item.type === 'Bill' ? 'purchase-invoice' : 'payment-voucher'
          }/${item.id}/detail`,
        },
        {
          value: `${item.currency_symbol} ${item.amount_due}`,
          link: `/pages/accounting/purchase/${item.type === 'Bill' ? 'purchase-invoice' : 'debit-notes'}/${
            item.id
          }/detail`,
        },
      ]);
    });
    return { tableBody: body, totalAmount: amount, totalRemainingAmount: remainingAmount };
  }, [payableSummaryResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `AED ${totalAmount.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `AED ${totalRemainingAmount.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalRemainingAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetPayableSummaryData;
