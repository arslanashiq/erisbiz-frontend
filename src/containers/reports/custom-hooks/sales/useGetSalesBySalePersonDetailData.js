import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetSalesBySalePersonDetailData(saleBySalePersonDetailResponse) {
  const getLink = item => {
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalWithoutTax, totalWithTax, totalBalanceDue } = useMemo(() => {
    let saleWithoutTax = 0;
    let saleWithTax = 0;
    let balanceDue = 0;

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
          value: formatAmount(item.sales),
        },
        {
          value: formatAmount(item.sales_with_tax),
        },
        {
          value: formatAmount(item.sales_with_tax - item.amount_applied),
        },
      ]);
    });
    return {
      tableBody: body,
      totalWithoutTax: saleWithoutTax,
      totalWithTax: saleWithTax,
      totalBalanceDue: balanceDue,
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
        { value: formatAmount(totalWithoutTax), style: { fontWeight: 700 } },
        { value: formatAmount(totalWithTax), style: { fontWeight: 700 } },
        { value: formatAmount(totalBalanceDue), style: { fontWeight: 700 } },
      ],
    ],
    [totalWithoutTax, totalWithTax, totalBalanceDue]
  );
  return { tableBody, tableFooter };
}

export default useGetSalesBySalePersonDetailData;
