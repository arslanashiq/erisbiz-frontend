/* eslint-disable no-unused-vars */
import { useMemo } from 'react';
import { journalReportHeadCells } from 'containers/reports/utilities/head-cells';
import moment from 'moment';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetJournalReportData(journalReportResponse) {
  const getLinkByType = item => {
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }
    if (item.type === 'Supplier Payment') {
      return `/pages/accounting/purchase/payment-voucher/${item.id}/detail`;
    }
    if (item.type === 'Debit Note') {
      return `/pages/accounting/purchase/debit-notes/${item.id}/detail`;
    }
    return false;
  };
  const getEntries = data => {
    const body = [];
    let currentDebit = 0;
    let currentCredit = 0;
    const currency = 'AED';
    if (data?.entries?.length === 0) {
      return {
        body,
        currentDebit: `${currency} ${currentDebit}`,
        currentCredit: `${currency} ${currentCredit}`,
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
          value: `${currency} ${item.bcy_debit}`,
        },
        {
          value: `${currency} ${item.bcy_credit}`,
        },
      ]);
    });

    return {
      body,
      currentDebit: `${currency} ${currentDebit}`,
      currentCredit: `${currency} ${currentCredit}`,
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
          { value: currentDebit, link: getLinkByType(item) },
          { value: currentCredit, link: getLinkByType(item) },
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
