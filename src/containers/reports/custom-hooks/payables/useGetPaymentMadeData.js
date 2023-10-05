import moment from 'moment';
import { useMemo } from 'react';

function useGetPaymentMadeData(paymentMadeResponse) {
  const { tableBody, totalAmount, totalUnUsedAmount, currencySymbol } = useMemo(() => {
    let amount = 0;
    let unUsedAmount = 0;
    let symbol = 'AED';
    const body = [];
    paymentMadeResponse?.data?.data.forEach(item => {
      amount += item.total;
      unUsedAmount += item.unused_amount;
      symbol = item.currency__currency_code;
      body.push([
        { value: moment(item.payment_date).format('DD MMM YYYY'), style: { textAlign: 'start' } },
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
          value: `${item.currency__currency_code} ${item.total}`,
        },
        {
          value: `${item.currency__currency_code} ${item.unused_amount}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: amount,
      totalUnUsedAmount: unUsedAmount,
      currencySymbol: symbol,
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
        { value: `${currencySymbol} ${totalAmount.toFixed(2)}`, style: { fontWeight: 700 } },
        {
          value: `${currencySymbol} ${totalUnUsedAmount.toFixed(2)}`,
          style: { fontWeight: 700 },
        },
      ],
    ],
    [totalAmount, totalUnUsedAmount, currencySymbol]
  );
  return {
    tableBody,
    tableFooter,
  };
}

export default useGetPaymentMadeData;
