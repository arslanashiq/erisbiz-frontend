import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';
import { getLinkByTransactionType } from 'utilities/get-link-by-type';

const headerStyle = { fontWeight: 'bold', textAlign: 'start', backgroundColor: '#EDEDED' };

function useGetDetailGeneralLedgerData(detailGeneralLedgerResponse) {
  const getAccountHeader = title => [
    { value: title, style: { ...headerStyle }, colSpan: 5 },
    { value: '', style: { ...headerStyle } },
    { value: '', style: { ...headerStyle } },
    { value: '', style: { ...headerStyle } },
    { value: '', style: { ...headerStyle } },
  ];
  const getAccountDetailHeaders = (date, title, currencySymbol, balance) => [
    { value: `As On ${moment(date).format(DATE_FILTER_REPORT)}`, style: { textAlign: 'start' } },
    {
      value: title,
      colSpan: 3,
      style: { textAlign: 'start' },
    },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: formatAmount(balance) },
    { value: '' },
  ];
  const getTableBodyValue = (data, startDate, endDate) => {
    const body = [];
    const key = Object.keys(data)[2];
    if (key.length === 0) {
      return { body };
    }
    body.push(getAccountHeader(key));
    body.push(getAccountDetailHeaders(startDate, 'Opening Balance', 'AED', data.opening_balance));
    data[key].forEach(item => {
      body.push([
        {
          value: moment(item.transaction_date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: item.chart_of_account__account_name,
          style: { textAlign: 'start' },
        },
        { value: item.transaction_detail },
        { value: item.transaction_type },
        { value: item.transaction_number },
        { value: item.reference_number },
        {
          value: formatAmount(item.debit),
          link: getLinkByTransactionType(item?.transaction_type, item.object_id),
        },
        {
          value: formatAmount(item.credit),
          link: getLinkByTransactionType(item?.transaction_type, item.object_id),
        },
        {
          value: formatAmount(item.credit || item.debit),
          link: getLinkByTransactionType(item?.transaction_type, item.object_id),
        },
      ]);
    });
    body.push(getAccountDetailHeaders(endDate, 'Closing Balance', '', data.closing_balance));

    return { body };
  };

  //   const getHeader = title => [
  //     {
  //       value: title,
  //       style: { textAlign: 'start', ...headerStyle },
  //     },
  //     {
  //       value: '',
  //       style: { textAlign: 'start', ...headerStyle },
  //     },
  //     {
  //       value: '',
  //       style: { textAlign: 'start', ...headerStyle },
  //     },
  //   ];

  const { tableBody, currencySymbol } = useMemo(() => {
    let body = [];
    if (!detailGeneralLedgerResponse?.data?.data) {
      return {
        tableBody: body,
      };
    }
    const { start_datestart: startDate, end_date: endDate } = detailGeneralLedgerResponse.data;
    detailGeneralLedgerResponse?.data?.data.forEach(item => {
      const { body: currentBody } = getTableBodyValue(item, startDate, endDate);
      body = [...body, ...currentBody];
    });

    return {
      tableBody: body,
    };
  }, [detailGeneralLedgerResponse]);

  const tableFooter = useMemo(() => [[]], [currencySymbol]);
  return { tableBody, tableFooter };
}

export default useGetDetailGeneralLedgerData;
