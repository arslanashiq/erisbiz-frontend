import { getLinkByType } from 'containers/reports/utilities/get-link';
import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetSupplierBillDetailBalanceData(supplierBillDetailBalanceResponse) {
  const getAmount = item => {
    let grandTotal = item.grand_total || 0;
    let amountDue = item.amount_due || 0;
    if (item.type === 'Excess Payment' || item.type === 'Debit Note') {
      grandTotal *= -1;
      amountDue *= -1;
    }
    return {
      grandTotal,
      amountDue,
    };
  };
  const { tableBody, totalAmount, totalAmountDue } = useMemo(() => {
    let amountDue = 0;
    let total = 0;
    const body = [];
    supplierBillDetailBalanceResponse?.data?.data.forEach(item => {
      const { grandTotal: currentGrandTotal, amountDue: currentAmountDue } = getAmount(item);
      amountDue += currentAmountDue;
      total += currentGrandTotal;
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
        { value: formatAmount(currentGrandTotal), link: getLinkByType(item) },
        { value: formatAmount(currentAmountDue) },
      ]);
    });
    return { tableBody: body, totalAmount: total, totalAmountDue: amountDue };
  }, [supplierBillDetailBalanceResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountDue), style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalAmountDue]
  );
  return { tableBody, tableFooter };
}

export default useGetSupplierBillDetailBalanceData;
