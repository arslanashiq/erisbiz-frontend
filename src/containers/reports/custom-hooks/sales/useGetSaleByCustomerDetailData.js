import { useMemo } from 'react';
import moment from 'moment';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetSaleByCustomerDetailData(saleByCustomerDetailResponse) {
  const getLinkByType = item => {
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }
    if (item.type === 'Credit Note') {
      return `/pages/accounting/sales/credit-notes/${item.id}/detail`;
    }
    return false;
  };
  const getAmount = item => {
    let currentGrandTotal = item.grand_total || 0;
    let currentAmountTotal = item.amount_total || 0;
    let currentAmountDue = item.amount_due || 0;
    if (item.type === 'Credit Note') {
      currentGrandTotal *= currentGrandTotal > 0 ? -1 : 1;
      currentAmountTotal *= currentAmountTotal > 0 ? -1 : 1;
      currentAmountDue *= currentAmountDue > 0 ? -1 : 1;
    }
    return {
      currentGrandTotal,
      currentAmountTotal,
      currentAmountDue,
    };
  };
  const { tableBody, totalSales, totalSalesWithTax, totalAmountDue } = useMemo(() => {
    let sales = 0;
    let salesWithTax = 0;
    let amountDue = 0;
    const body = [];
    saleByCustomerDetailResponse?.data?.data.forEach(item => {
      const { currentAmountTotal, currentGrandTotal, currentAmountDue } = getAmount(item);
      sales += currentAmountTotal;
      salesWithTax += currentGrandTotal;
      amountDue += currentAmountDue;
      body.push([
        {
          value: item.formatted_number,
          link: getLinkByType(item),
          style: { textAlign: 'start' },
        },
        {
          value: moment(item.date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: item.type,
          style: { textAlign: 'start' },
        },

        {
          value: formatAmount(currentAmountTotal),
        },
        {
          value: formatAmount(currentGrandTotal),
        },
        {
          value: formatAmount(currentAmountDue),
        },
        {
          value: item.status,
        },
      ]);
    });
    return {
      tableBody: body,
      totalSales: sales,
      totalSalesWithTax: salesWithTax,
      totalAmountDue: amountDue,
    };
  }, [saleByCustomerDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalSales), style: { fontWeight: 700 } },
        { value: formatAmount(totalSalesWithTax), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountDue), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalSales, totalSalesWithTax, totalAmountDue]
  );
  return { tableBody, tableFooter };
}

export default useGetSaleByCustomerDetailData;
