import { useMemo } from 'react';
import moment from 'moment';
import formatAmount from 'utilities/formatAmount';
import { DATE_FORMAT } from 'utilities/constants';

function useGetPayableSummaryData(payableSummaryResponse) {
  const getAmount = item => {
    let saleWithTax = item.bcy_sales_with_tax_amount || 0;
    let amountDue = item.amount_due || 0;
    if (item.type === 'Debit Note') {
      saleWithTax *= saleWithTax > 0 ? -1 : 1;
      amountDue *= amountDue > 0 ? -1 : 1;
    }
    return {
      saleWithTax,
      amountDue,
    };
  };
  const { tableBody, totalAmount, totalRemainingAmount } = useMemo(() => {
    let amount = 0;
    let remainingAmount = 0;
    const body = [];
    payableSummaryResponse?.data?.data.forEach(item => {
      const { saleWithTax, amountDue } = getAmount(item);
      amount += saleWithTax;
      remainingAmount += amountDue;
      body.push([
        {
          value: item.formatted_number,
          link: `/pages/accounting/purchase/${item.type === 'Bill' ? 'purchase-invoice' : 'debit-notes'}/${
            item.id
          }/detail`,
          style: { textAlign: 'start' },
        },
        { value: moment(item.date).format(DATE_FORMAT), style: { textAlign: 'start' } },
        {
          value: item.account_name,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
          style: { textAlign: 'start' },
        },
        {
          value: item.type,
          style: { textAlign: 'start' },
        },
        {
          value: formatAmount(saleWithTax),
        },
        {
          value: formatAmount(amountDue),
        },
        {
          value: item.status,
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
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalRemainingAmount), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalAmount, totalRemainingAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetPayableSummaryData;
