import { useMemo } from 'react';
import moment from 'moment';
import { DATE_FILTER_REPORT, supplierOpeningBalanceName } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';
import { getLinkByTransactionType } from 'utilities/get-link-by-type';

function useGetSupplierBillDetailBalanceData(supplierBillDetailBalanceResponse, _, options) {
  const { getAmountByType = true } = options;
  const getAmount = item => {
    let grandTotal = item.grand_total || 0;
    let amountDue = item.amount_due || 0;
    if (
      getAmountByType &&
      (item.type === 'Excess Payment' ||
        item.type === 'Debit Note' ||
        (item.type === supplierOpeningBalanceName && item?.is_credit === false))
    ) {
      grandTotal *= grandTotal > 0 ? -1 : 1;
      amountDue *= amountDue > 0 ? -1 : 1;
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
          link: getLinkByTransactionType(item.type, item.id),
        },
        {
          value: item.type,
        },
        { value: formatAmount(currentGrandTotal), link: getLinkByTransactionType(item.type, item.id) },
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
