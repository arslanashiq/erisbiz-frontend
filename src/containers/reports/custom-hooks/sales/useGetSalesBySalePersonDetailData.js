import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetSalesBySalePersonDetailData(saleBySalePersonDetailResponse) {
  const getLink = item => {
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalWithoutTax, totalWithTax, totalBalanceDue, currencySymbol } = useMemo(() => {
    let saleWithoutTax = 0;
    let saleWithTax = 0;
    let balanceDue = 0;

    const currency = 'AED';
    const body = [];
    saleBySalePersonDetailResponse?.data?.data.forEach(item => {
      saleWithoutTax += item.sales;
      saleWithTax += item.sales_with_tax;
      balanceDue += item.sales_with_tax - item.amount_applied;

      //   currency = item.currency__symbol;
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
          value: item.number,
          link: getLink(item),
        },
        {
          value: item.customer_name,
          link: `/pages/accounting/sales/customers/${item.customer__id}`,
        },
        {
          value: `${currency} ${item.sales}`,
        },
        {
          value: `${currency} ${item.sales_with_tax}`,
        },
        {
          value: `${currency} ${item.sales_with_tax - item.amount_applied}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalWithoutTax: saleWithoutTax,
      totalWithTax: saleWithTax,
      totalBalanceDue: balanceDue,

      currencySymbol: currency,
    };
  }, [saleBySalePersonDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalWithoutTax.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalWithTax.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalBalanceDue.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalWithoutTax, totalWithTax, totalBalanceDue, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetSalesBySalePersonDetailData;
