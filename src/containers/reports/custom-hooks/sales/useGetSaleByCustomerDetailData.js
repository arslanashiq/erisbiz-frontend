import { useMemo } from 'react';
import moment from 'moment';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetSaleByCustomerDetailData(saleByCustomerDetailResponse) {
  const getLinkByType = item => {
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalSales, totalSalesWithTax, totalAmountDue } = useMemo(() => {
    let sales = 0;
    let salesWithTax = 0;
    let amountDue = 0;
    const body = [];
    saleByCustomerDetailResponse?.data?.data.forEach(item => {
      sales += item.amount_total;
      salesWithTax += item.bcy_sales_with_tax_amount;
      amountDue += item.amount_due;
      body.push([
        {
          value: moment(item.date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: item.type,
        },
        {
          value: item.status,
        },
        {
          value: item.formatted_number,
          link: getLinkByType(item),
        },

        {
          value: formatAmount(item.amount_total),
          link: getLinkByType(item),
        },
        {
          value: formatAmount(item.bcy_sales_with_tax_amount),
          link: getLinkByType(item),
        },
        {
          value: formatAmount(item.amount_due),
          link: getLinkByType(item),
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
        { value: '' },
        { value: formatAmount(totalSales), style: { fontWeight: 700 } },
        { value: formatAmount(totalSalesWithTax), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmountDue), style: { fontWeight: 700 } },
      ],
    ],
    [totalSales, totalSalesWithTax, totalAmountDue]
  );
  return { tableBody, tableFooter };
}

export default useGetSaleByCustomerDetailData;
