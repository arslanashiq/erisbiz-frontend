import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetSupplierBillDetailBalanceData(supplierBillDetailBalanceResponse) {
  const getLinkByType = item => {
    if (item.type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalAmount, totalAmountDue, currencySymbol } = useMemo(() => {
    let amountDue = 0;
    let total = 0;
    let currency = 'AED';
    const body = [];
    supplierBillDetailBalanceResponse?.data?.data.forEach(item => {
      amountDue += item.amount_due;
      total += item.bcy_sales_with_tax_amount;
      currency = item.currency_symbol;
      body.push([
        {
          value: moment(item.date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: item.formatted_number,
          link: getLinkByType(item),
        },
        {
          value: item.type,
        },
        { value: `${item.currency_symbol} ${item.bcy_sales_with_tax_amount}` },
        { value: `${item.currency_symbol} ${item.amount_due}` },
      ]);
    });
    return { tableBody: body, totalAmount: total, totalAmountDue: amountDue, currencySymbol: currency };
  }, [supplierBillDetailBalanceResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalAmount.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalAmountDue.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalAmountDue, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetSupplierBillDetailBalanceData;
