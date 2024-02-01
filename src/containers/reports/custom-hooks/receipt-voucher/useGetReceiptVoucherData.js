import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetReceiptVoucherData(receiptVouceherResponse) {
  const getFormatedNumber = item => {
    if (
      typeof item.invoices__invoice_formatted_number === 'object' &&
      item.invoices__invoice_formatted_number.length > 0
    ) {
      return item.invoices__invoice_formatted_number.map(formatedNumber => `${formatedNumber}`);
    }
    return item.invoices__invoice_formatted_number;
  };
  const getLinkByType = item => {
    if (item.id) {
      return `/pages/accounting/sales/receipt-voucher/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalAmount, totalUnUsedAmount } = useMemo(() => {
    let total = 0;
    let unUsedAmount = 0;

    const body = [];
    receiptVouceherResponse?.data?.data.forEach(item => {
      total += item.total;
      unUsedAmount += item.unused_amount;
      body.push([
        {
          value: item?.payment_num || getFormatedNumber(item),
          link: getLinkByType(item),
          style: { textAlign: 'start' },
        },
        {
          value: moment(item.payment_date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: item.sales_account__sales_account_name,
          link: `/pages/accounting/sales/customers/${item.sales_account__id}/detail`,
          style: { textAlign: 'start' },
        },
        {
          value: item.reference_num,
          style: { textAlign: 'start' },
        },
        {
          value: item.payment_mode__payment_mode_name,
          style: { textAlign: 'start' },
        },

        {
          value: item.chart_of_account__account_name,
          style: { textAlign: 'start' },
        },

        {
          value: formatAmount(item.total),
        },
        {
          value: formatAmount(item.unused_amount),
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: total,
      totalUnUsedAmount: unUsedAmount,
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
        { value: formatAmount(totalAmount), style: { textAlign: 'end', fontWeight: 700 } },
        { value: formatAmount(totalUnUsedAmount), style: { textAlign: 'end', fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalUnUsedAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetReceiptVoucherData;
