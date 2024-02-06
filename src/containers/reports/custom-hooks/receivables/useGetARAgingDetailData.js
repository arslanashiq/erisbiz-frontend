import { useMemo } from 'react';
import moment from 'moment';
import formatAmount from 'utilities/formatAmount';
import { DATE_FORMAT, customerOpeningBalanceName } from 'utilities/constants';
import getSearchParamsList from 'utilities/getSearchParamsList';
import { getLinkByTransactionType, salesTransactionTypeLink } from 'utilities/get-link-by-type';

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
function useGetARAgingDetailData(receivableARAgingDetailResponse) {
  const getAmountByType = item => {
    let currentGrandTotal = item.grand_total || 0;
    let currentAmountDue = item.amount_due || 0;

    if (
      (item.type === 'Account Opening Balance' && item.is_credit === true) ||
      item.type === 'Excess Payment' ||
      item.type === 'Credit Note'
    ) {
      currentAmountDue *= currentAmountDue > 0 ? -1 : 1;
      currentGrandTotal *= currentGrandTotal > 0 ? -1 : 1;
    }
    return {
      currentAmountDue,
      currentGrandTotal,
    };
  };
  const getTableBodyValue = (data, keyValue) => {
    const body = [];
    let amount = 0;
    let dueAmount = 0;
    data[keyValue].forEach(item => {
      const { currentAmountDue, currentGrandTotal } = getAmountByType(item);
      amount += currentGrandTotal;
      dueAmount += currentAmountDue;

      body.push([
        { value: moment(item.date).format(DATE_FORMAT), style: { textAlign: 'start' } },
        {
          value: item.formatted_number,
          link: salesTransactionTypeLink(item.type, item.id),

          style: { textAlign: 'start' },
        },
        { value: item.type, style: { textAlign: 'start' } },
        {
          value: item.customer_name,
          link: getLinkByTransactionType(customerOpeningBalanceName, item.customer_id || item.id),
          style: { textAlign: 'start' },
        },
        {
          value: item.age,
        },
        {
          value: formatAmount(currentGrandTotal),
        },
        {
          value: formatAmount(currentAmountDue),
        },
      ]);
    });
    return { body, amount, dueAmount };
  };

  const getHeader = (title, totalAmount, amountDue) => [
    {
      value: title,
      style: { textAlign: 'start', ...headerStyle },
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
    if (!receivableARAgingDetailResponse?.data?.data) {
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
      } = getTableBodyValue(receivableARAgingDetailResponse?.data?.data, date.keyValue);
      if (currentBody.length > 0) {
        const currentHeader = getHeader(date.title, currentTotalAmount, currentDueAmount);
        body = [...body, currentHeader, ...currentBody];
        amount += currentTotalAmount;
        dueAmount += currentDueAmount;
      }
    });

    const { customer_id: customerId } = getSearchParamsList();
    if (customerId) {
      body.splice(0, 0, [
        {
          value: receivableARAgingDetailResponse?.data?.customer,
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
  }, [receivableARAgingDetailResponse]);

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

export default useGetARAgingDetailData;
