import { useMemo } from 'react';
import moment from 'moment';
import { DATE_FILTER_REPORT, supplierOpeningBalanceName } from 'utilities/constants';
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
  const getAmount = item => {
    let currentAmountDue = item.amount_due_bcy || 0;
    let currenttotal = item.bcy_sales_with_tax_amount || 0;
    if (item.type === supplierOpeningBalanceName && item.is_credit === false) {
      currentAmountDue *= item.amount_due_bcy > 0 ? -1 : 1;
      currenttotal *= item.bcy_sales_with_tax_amount > 0 ? -1 : 1;
    }
    if (item.type === 'Debit Note') {
      currentAmountDue *= item.amount_due_bcy > 0 ? -1 : 1;
      currenttotal *= item.bcy_sales_with_tax_amount > 0 ? -1 : 1;
    }
    return {
      currentAmountDue,
      currenttotal,
    };
  };
  const { tableBody, totalAmount, totalAmountDue } = useMemo(() => {
    let amountDue = 0;
    let total = 0;
    const body = [];
    purchaseBySupplierDetailResponse?.data?.data.forEach(item => {
      const { currentAmountDue, currenttotal } = getAmount(item);
      if (item.status !== 'void') {
        amountDue += currentAmountDue;
        total += currenttotal;
      }
      //   currency = item.currency_symbol;
      body.push([
        {
          value: moment(item.date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: item.formatted_number,
          style: { textAlign: 'start' },
        },
        { value: formatAmount(currenttotal), link: getLinkByType(item) },
        { value: formatAmount(currentAmountDue), link: getLinkByType(item) },
        {
          value: item.status,
        },
      ]);
    });
    return { tableBody: body, totalAmount: total, totalAmountDue: amountDue };
  }, [purchaseBySupplierDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountDue), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalAmount, totalAmountDue]
  );
  return { tableBody, tableFooter };
}

export default useGetPurchaseBySupplierDetailData;
