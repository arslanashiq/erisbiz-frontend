import { useMemo } from 'react';
import { journalReportHeadCells } from 'containers/reports/utilities/head-cells';
import moment from 'moment';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';
import { getLinkByTransactionType } from 'utilities/get-link-by-type';

function useGetJournalReportData(journalReportResponse) {
  const getEntries = data => {
    const body = [];
    let currentDebit = 0;
    let currentCredit = 0;
    if (data?.entries?.length === 0) {
      return {
        body,
        currentDebit: formatAmount(currentDebit),
        currentCredit: formatAmount(currentCredit),
      };
    }
    data?.entries?.forEach(item => {
      currentDebit += item.bcy_debit;
      currentCredit += item.bcy_credit;
      body.push([
        {
          value: item.chart_of_account__account_name,
          style: { textAlign: 'start' },
        },

        {
          value: formatAmount(item.bcy_debit),
        },
        {
          value: formatAmount(item.bcy_credit),
        },
      ]);
    });

    return {
      body,
      currentDebit: formatAmount(currentDebit),
      currentCredit: formatAmount(currentCredit),
    };
  };
  const { modifiedTableHead, tableBody, tableFooter } = useMemo(() => {
    const body = [];
    const tableHead = [];
    const footer = [];
    journalReportResponse?.data?.data?.forEach((item, index) => {
      const { body: currentBody, currentDebit, currentCredit } = getEntries(item, index);
      body.splice(index, 0, currentBody);
      tableHead.splice(index, 0, [...journalReportHeadCells]);
      tableHead[index].splice(0, 1, {
        title: `${moment(item.date).format(DATE_FILTER_REPORT)} - ${item.type} ${item.number || ''}  (${
          item.name
        })`,
        style: { textAlign: 'start' },
      });
      footer.push([
        [
          { value: '' },
          { value: currentDebit, link: getLinkByTransactionType(item.type, item.id) },
          { value: currentCredit, link: getLinkByTransactionType(item.type, item.id) },
        ],
      ]);
    });
    return {
      modifiedTableHead: tableHead,
      tableBody: body,
      tableFooter: footer,
      totalAmount: 0,
    };
  }, [journalReportResponse]);

  return { isMultiReport: true, modifiedTableHead, tableBody, tableFooter };
}

export default useGetJournalReportData;
