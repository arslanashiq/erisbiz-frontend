import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FORMAT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetPaymentMadeData(paymentMadeResponse) {
  const getBillNumber = item => {
    let billNumer = item.bills__bill_num;
    try {
      if (typeof item.bills__bill_num === 'object' && item.bills__bill_num?.length > 0) {
        let number = null;

        billNumer.forEach(billNum => {
          if (number) {
            number = `${number},${billNum?.split('-')[1]}`;
          } else {
            number = billNum?.split('-')[1];
          }
        });
        billNumer = `PIN-(${number})`;
      }
    } catch (error) {
      return item.bills__bill_num[0];
    }

    return billNumer;
  };
  const { tableBody, totalAmount, totalUnUsedAmount } = useMemo(() => {
    let amount = 0;
    let unUsedAmount = 0;
    const body = [];
    paymentMadeResponse?.data?.data.forEach(item => {
      amount += item.total;
      unUsedAmount += item.unused_amount;
      body.push([
        {
          value: getBillNumber(item),
          link: `/pages/accounting/purchase/payment-voucher/${item.id}/detail`,
          style: { textAlign: 'start' },
        },
        { value: moment(item.payment_date).format(DATE_FORMAT), style: { textAlign: 'start' } },
        {
          value: item.supplier__supplier_name,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
          style: { textAlign: 'start' },
        },
        { value: item.reference_num, style: { textAlign: 'start' } },
        { value: item.payment_mode__payment_mode_name, style: { textAlign: 'start' } },
        { value: item.chart_of_account__account_name, style: { textAlign: 'start' } },
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
