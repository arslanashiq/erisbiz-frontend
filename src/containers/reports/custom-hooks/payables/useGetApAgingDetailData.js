import { useMemo } from 'react';
import moment from 'moment';
import { tableCellBodyHeader } from 'styles/components/custom-hooks/use-excel-sheet';
import formatAmount from 'utilities/formatAmount';
import { DATE_FORMAT } from 'utilities/constants';
import getSearchParamsList from 'utilities/getSearchParamsList';

const availableDateList = [
  {
    title: 'Current',
    keyValue: 'current',
  },
  {
    title: '1 -15 Days',
    keyValue: 'date_1_15',
  },
  {
    title: '16 - 30 Days',
    keyValue: 'date_16_30',
  },
  {
    title: '31 - 45 Days',
    keyValue: 'date_31_45',
  },
  {
    title: 'Above 45',
    keyValue: 'date_gt_45',
  },
];
const headerStyle = { fontWeight: 'bold', backgroundColor: 'rgb(245 245 245)' };
function useGetApAgingDetailData(reportAPAgingDetailResponse) {
  const getLinkByType = item => {
    if (item.type === 'Bill') {
      return {
        link: `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`,
        grandTotal: item.grand_total,
        amountDue: item.amount_due,
      };
    }

    if (item.type === 'Excess Payment') {
      return {
        link: `/pages/accounting/purchase/payment-voucher/${item.id}/detail`,
        grandTotal: -item.grand_total,
        amountDue: -item.amount_due,
      };
    }
    if (item.type === 'Debit Note') {
      return {
        link: `/pages/accounting/purchase/debit-notes/${item.id}/detail`,
        grandTotal: -item.grand_total,
        amountDue: -item.amount_due,
      };
    }

    return { link: false, grandTotal: item.grand_total, amountDue: item.amount_due };
  };

  const getTableBodyValue = (data, keyValue) => {
    const body = [];
    let amount = 0;
    let dueAmount = 0;

    data[keyValue].forEach(item => {
      const { link, grandTotal, amountDue } = getLinkByType(item);
      amount += Number(grandTotal) || 0;
      dueAmount += Number(amountDue) || 0;

      body.push([
        { value: moment(item.date).format(DATE_FORMAT), style: { textAlign: 'start' } },
        { value: item.formatted_number, link, style: { textAlign: 'start' } },
        { value: item.type, style: { textAlign: 'start' } },
        {
          value: item.account_name || item.supplier__supplier_name,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
          style: { textAlign: 'start' },
        },
        {
          value: item.age,
        },
        {
          value: formatAmount(grandTotal),
        },
        {
          value: formatAmount(amountDue),
        },
      ]);
    });
    return { body, amount, dueAmount };
  };

  const getHeader = (title, totalAmount, amountDue) => [
    {
      value: title,
      style: { textAlign: 'start', ...headerStyle },
      excelSheetStyle: tableCellBodyHeader,
    },
    { value: '', style: headerStyle },
    { value: '', style: headerStyle },
    { value: '', style: headerStyle },
    { value: '', style: headerStyle },
    {
      value: formatAmount(totalAmount),
      style: headerStyle,
    },
    {
      value: formatAmount(amountDue),
      style: headerStyle,
    },
  ];

  const { tableBody, totalAmount, totalDueAmount } = useMemo(() => {
    let amount = 0;
    let dueAmount = 0;
    let body = [];

    if (!reportAPAgingDetailResponse?.data?.data) {
      return {
        tableBody: body,
        totalAmount: amount,
        totalDueAmount: dueAmount,
      };
    }

    availableDateList.forEach(date => {
      const {
        body: currentBody,
        amount: currentTotalAmount,
        dueAmount: currentDueAmount,
      } = getTableBodyValue(reportAPAgingDetailResponse?.data?.data, date.keyValue);
      if (currentBody.length > 0) {
        const currentHeader = getHeader(date.title, currentTotalAmount, currentDueAmount);
        body = [...body, currentHeader, ...currentBody];
        amount += currentTotalAmount;
        dueAmount += currentDueAmount;
      }
    });
    const { supplier_id: supplierID } = getSearchParamsList();
    if (supplierID) {
      body.splice(0, 0, [
        {
          value: reportAPAgingDetailResponse?.data?.customer,
          style: { textAlign: 'start', fontWeight: 'bold' },
        },
        { value: '' },
        { value: '' },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: formatAmount(amount),
          style: { fontWeight: 'bold' },
        },
        {
          value: formatAmount(dueAmount),
          style: { fontWeight: 'bold' },
        },
      ]);
    }
    return {
      tableBody: body,
      totalAmount: amount,
      totalDueAmount: dueAmount,
    };
  }, [reportAPAgingDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalDueAmount), style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalDueAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetApAgingDetailData;
