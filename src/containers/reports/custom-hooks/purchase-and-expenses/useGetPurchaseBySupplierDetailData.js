import { useMemo } from 'react';
import moment from 'moment';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetPurchaseBySupplierDetailData(purchaseBySupplierDetailResponse) {
  const getLinkByType = item => {
    if (item.type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`;
    }
    if (item.type === 'Debit Note') {
      return `/pages/accounting/purchase/debit-notes/${item.id}/detail`;
    }
    if (item.type === 'Expense') {
      return `/pages/accounting/purchase/expenses/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalAmount, totalAmountDue } = useMemo(() => {
    let amountDue = 0;
    let total = 0;
    const body = [];
    purchaseBySupplierDetailResponse?.data?.data.forEach(item => {
      amountDue += item.amount_due_bcy;
      total += item.bcy_sales_with_tax_amount;
      //   currency = item.currency_symbol;
      body.push([
        {
          value: item.status,
        },
        {
          value: moment(item.date).format(DATE_FILTER_REPORT),
        },
        {
          value: item.formatted_number,
        },
        { value: formatAmount(item.bcy_sales_with_tax_amount), link: getLinkByType(item) },
        { value: formatAmount(item.amount_due_bcy), link: getLinkByType(item) },
      ]);
    });
    return { tableBody: body, totalAmount: total, totalAmountDue: amountDue };
  }, [purchaseBySupplierDetailResponse]);

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

export default useGetPurchaseBySupplierDetailData;
