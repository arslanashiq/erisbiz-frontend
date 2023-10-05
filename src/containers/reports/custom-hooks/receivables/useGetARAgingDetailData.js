import { useMemo } from 'react';
import moment from 'moment';

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
  const getTableBodyValue = (data, keyValue) => {
    const body = [];
    let amount = 0;
    let dueAmount = 0;
    let currencySymbol = 'AED';
    data[keyValue].forEach(item => {
      currencySymbol = item.currency_symbol;
      amount += item.grand_total;
      dueAmount += item.amount_due;

      body.push([
        { value: moment(item.date).format('DD MMM YYYY'), style: { textAlign: 'start' } },
        { value: item.formatted_number },
        { value: item.type },
        {
          value: item.customer_name,
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },
        {
          value: item.age,
        },
        {
          value: `${currencySymbol} ${item.grand_total}`,
        },
        {
          value: `${currencySymbol} ${item.amount_due}`,
        },
      ]);
    });
    return { body, amount, dueAmount, currencySymbol };
  };

  const getHeader = (currencySymbol, title, totalAmount, amountDue) => [
    {
      value: title,
      style: { textAlign: 'start', ...headerStyle },
    },
    { value: '', style: headerStyle },
    { value: '', style: headerStyle },
    { value: '', style: headerStyle },
    { value: '', style: headerStyle },
    {
      value: `${currencySymbol} ${totalAmount}`,
      style: headerStyle,
    },
    {
      value: `${currencySymbol} ${amountDue}`,
      style: headerStyle,
    },
  ];

  const { tableBody, totalAmount, totalDueAmount, currencySymbol } = useMemo(() => {
    let amount = 0;
    let dueAmount = 0;
    let body = [];
    let currency = 'AED';
    if (!receivableARAgingDetailResponse?.data?.data) {
      return {
        tableBody: body,
        totalAmount: amount,
        totalDueAmount: dueAmount,
        currencySymbol: currency,
      };
    }

    availableDateList.forEach(date => {
      const {
        body: currentBody,
        amount: currentTotalAmount,
        dueAmount: currentDueAmount,
        currencySymbol: currentCurrencySymbol,
      } = getTableBodyValue(receivableARAgingDetailResponse?.data?.data, date.keyValue);
      if (currentBody.length > 0) {
        const currentHeader = getHeader(currency, date.title, currentTotalAmount, currentDueAmount);
        body = [...body, currentHeader, ...currentBody];
        amount += currentTotalAmount;
        dueAmount += currentDueAmount;
        currency = currentCurrencySymbol;
      }
    });

    return {
      tableBody: body,
      totalAmount: amount,
      totalDueAmount: dueAmount,
      currencySymbol: currency,
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
        { value: `${currencySymbol} ${totalAmount.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalDueAmount.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalDueAmount, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetARAgingDetailData;
