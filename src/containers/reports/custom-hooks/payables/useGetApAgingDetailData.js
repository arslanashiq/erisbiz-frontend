import { useMemo } from 'react';
import moment from 'moment';
import { tableCellBodyHeader } from 'styles/components/custom-hooks/use-excel-sheet';
import formatAmount from 'utilities/formatAmount';
import { DATE_FORMAT } from 'utilities/constants';

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
const headerStyle = { fontWeight: 'bold', backgroundColor: '#e2e2e2' };
function useGetApAgingDetailData(reportAPAgingDetailResponse) {
  const getLinkByType = item => {
    if (item.type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`;
    }

    if (item.type === 'Excess Payment') {
      return `/pages/accounting/purchase/payment-voucher/${item.id}/detail`;
    }
    if (item.type === 'Debit Note') {
      return `/pages/accounting/purchase/debit-notes/${item.id}/detail`;
    }

    return false;
  };
  const getTableBodyValue = (data, keyValue) => {
    const body = [];
    let amount = 0;
    let dueAmount = 0;
    data[keyValue].forEach(item => {
      amount += item.grand_total;
      dueAmount += item.amount_due;

      body.push([
        { value: moment(item.date).format(DATE_FORMAT), style: { textAlign: 'start' } },
        { value: item.formatted_number, link: getLinkByType(item) },
        { value: item.type },
        {
          value: item.account_name,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
        },
        {
          value: item.age,
        },
        {
          value: formatAmount(item.grand_total),
        },
        {
          value: formatAmount(item.amount_due),
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
