import { useMemo } from 'react';
import moment from 'moment';
import { DATE_FILTER_REPORT, supplierOpeningBalanceName } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';
import { getLinkByTransactionType } from 'utilities/get-link-by-type';

function useGetPurchaseBySupplierDetailData(purchaseBySupplierDetailResponse) {
  const getAmount = item => {
    let currentAmountDue = item.amount_due_bcy || 0;
    let currenttotal = item.bcy_sales_amount || 0;
    let currentTotalWithTax = item.bcy_sales_with_tax_amount || 0;
    if (item.type === supplierOpeningBalanceName && item.is_credit === false) {
      currentAmountDue *= currentAmountDue > 0 ? -1 : 1;
      currenttotal *= currenttotal > 0 ? -1 : 1;
      currentTotalWithTax *= currentTotalWithTax > 0 ? -1 : 1;
    }
    if (item.type === 'Debit Note') {
      currentAmountDue *= currentAmountDue > 0 ? -1 : 1;
      currenttotal *= currenttotal > 0 ? -1 : 1;
      currentTotalWithTax *= currentTotalWithTax > 0 ? -1 : 1;
    }
    return {
      currentAmountDue,
      currenttotal,
      currentTotalWithTax,
    };
  };
  const { tableBody, totalAmount, totalAmountDue, totalAmountWithTax } = useMemo(() => {
    let amountDue = 0;
    let total = 0;
    let amountWithTax = 0 || 0;
    const body = [];
    purchaseBySupplierDetailResponse?.data?.data.forEach(item => {
      const { currentAmountDue, currenttotal, currentTotalWithTax } = getAmount(item);
      if (item.status !== 'void') {
        amountDue += currentAmountDue;
        total += currenttotal;
        amountWithTax += currentTotalWithTax;
      }
      //   currency = item.currency_symbol;
      body.push([
        {
          value: moment(item.date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: item.formatted_number || item.type,
          link: getLinkByTransactionType(item.type, item.id),
          style: { textAlign: 'start' },
        },
        { value: formatAmount(currenttotal) },
        { value: formatAmount(currentTotalWithTax) },
        { value: formatAmount(currentAmountDue) },
        {
          value: item.status,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: total,
      totalAmountDue: amountDue,
      totalAmountWithTax: amountWithTax,
    };
  }, [purchaseBySupplierDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountWithTax), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountDue), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalAmount, totalAmountDue, totalAmountWithTax]
  );
  return { tableBody, tableFooter };
}

export default useGetPurchaseBySupplierDetailData;
