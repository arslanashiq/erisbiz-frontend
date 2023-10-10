import { useMemo } from 'react';
import moment from 'moment';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetSaleByCustomerDetailData(saleByCustomerDetailResponse) {
  const getLinkByType = item => {
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalSales, totalSalesWithTax, totalAmountDue, currencySymbol } = useMemo(() => {
    let sales = 0;
    let salesWithTax = 0;
    let amountDue = 0;
    let currency = 'AED';
    const body = [];
    saleByCustomerDetailResponse?.data?.data.forEach(item => {
      sales += item.amount_total;
      salesWithTax += item.bcy_sales_with_tax_amount;
      amountDue += item.amount_due;
      currency = item.currency_symbol;
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
          value: `${currency} ${item.amount_total}`,
          link: getLinkByType(item),
        },
        {
          value: `${currency} ${item.bcy_sales_with_tax_amount}`,
          link: getLinkByType(item),
        },
        {
          value: `${currency} ${item.amount_due}`,
          link: getLinkByType(item),
        },
      ]);
    });
    return {
      tableBody: body,
      totalSales: sales,
      totalSalesWithTax: salesWithTax,
      totalAmountDue: amountDue,
      currencySymbol: currency,
    };
  }, [saleByCustomerDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalSales.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalSalesWithTax.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalAmountDue.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalSales, totalSalesWithTax, totalAmountDue, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetSaleByCustomerDetailData;
