import moment from 'moment';
import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetReceiptVoucherData(receiptVouceherResponse) {
  const location = useLocation();
  const getLink = item => {
    if (item) {
      return `detail${location.search}&sales_person_id=${item.customer_id}`;
    }
    return false;
  };
  const getFormatedNumber = item => {
    if (
      typeof item.invoices__invoice_formatted_number === 'object' &&
      item.invoices__invoice_formatted_number.length > 0
    ) {
      return item.invoices__invoice_formatted_number.map(formatedNumber => `${formatedNumber},`);
    }
    return item.invoices__invoice_formatted_number;
  };
  const { tableBody, totalAmount, totalUnUsedAmount, currencySymbol } = useMemo(() => {
    let total = 0;
    let unUsedAmount = 0;

    let currency = 'AED';
    const body = [];
    receiptVouceherResponse?.data?.data.forEach(item => {
      total += item.total;
      unUsedAmount += item.unused_amount;
      currency = item.currency__symbol;
      body.push([
        {
          value: item.payment_num,
          style: { textAlign: 'start' },
        },
        {
          value: moment(item.payment_date).format(DATE_FILTER_REPORT),
        },
        {
          value: item.reference_num,
        },
        {
          value: item.sales_account__sales_account_name,
          link: `/pages/accounting/sales/customers/${12}/detail`,
        },
        {
          value: item.payment_mode__payment_mode_name,
        },
        {
          value: getFormatedNumber(item),
        },
        {
          value: item.chart_of_account__account_name,
        },

        {
          value: `${currency} ${item.total}`,
          link: getLink(item),
        },
        {
          value: `${currency} ${item.unused_amount}`,
          link: getLink(item),
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: total,
      totalUnUsedAmount: unUsedAmount,
      currencySymbol: currency,
    };
  }, [receiptVouceherResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalAmount}`, style: { textAlign: 'end', fontWeight: 700 } },
        { value: `${currencySymbol} ${totalUnUsedAmount}`, style: { textAlign: 'end', fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalUnUsedAmount, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetReceiptVoucherData;
