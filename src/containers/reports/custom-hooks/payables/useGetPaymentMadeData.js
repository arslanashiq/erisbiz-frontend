import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FORMAT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetPaymentMadeData(paymentMadeResponse) {
  const { tableBody, totalAmount, totalUnUsedAmount } = useMemo(() => {
    let amount = 0;
    let unUsedAmount = 0;
    const body = [];
    paymentMadeResponse?.data?.data.forEach(item => {
      amount += item.total;
      unUsedAmount += item.unused_amount;
      body.push([
        { value: moment(item.payment_date).format(DATE_FORMAT), style: { textAlign: 'start' } },
        { value: item.reference_num },
        {
          value: item.bills__bill_num[0],
          link: `/pages/accounting/purchase/payment-voucher/${item.id}/detail`,
        },
        {
          value: item.supplier__supplier_name,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
        },
        { value: item.payment_mode__payment_mode_name },
        { value: item.chart_of_account__account_name },
        {
          value: formatAmount(item.total),
        },
        {
          value: formatAmount(item.unused_amount),
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: amount,
      totalUnUsedAmount: unUsedAmount,
    };
  }, [paymentMadeResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        {
          value: formatAmount(totalUnUsedAmount),
          style: { fontWeight: 700 },
        },
      ],
    ],
    [totalAmount, totalUnUsedAmount]
  );
  return {
    tableBody,
    tableFooter,
  };
}

export default useGetPaymentMadeData;
