/* eslint-disable implicit-arrow-linebreak */
import { useMemo } from 'react';
import moment from 'moment';
import formatAmount from 'utilities/formatAmount';
import { supplierOpeningBalanceName } from 'utilities/constants';
// import { useLocation } from 'react-router-dom';

function useSupplierStatement(supplierStatement, supplierTransactions, duration) {
  const getAmount = (item, amountTypes) => {
    if (item.invoice_num) {
      return formatAmount(item.without_change_grand_total);
    }
    if (amountTypes.includes(item.transaction_type)) {
      return formatAmount(item.total_amount);
    }
    return '';
  };
  const getBalance = (item, paymentTypes) => {
    if (item.invoice_num) {
      return '';
    }
    if (paymentTypes.includes(item.transaction_type)) {
      return formatAmount(item.total_amount);
    }
    return '';
  };

  const { amountTotal, balanceDue, paymentTotal, openingBalanceAmount, transactions } = useMemo(() => {
    let totalAmount = 0;
    let commulativeBalance = 0;
    let totalPayment = 0;
    let openingBalance = {};
    let transactionsData = [];
    const amountTypes = [
      // purchase
      'Bill',
      'Debit Note Refund',
      // sales
      'Invoice',
      'Credit Note Refund',
    ];
    const paymentTypes = [
      // purchae
      'Supplier Payment',
      'Bill Payment',
      'Debit Note',

      // sale
      'Customer Receipt',
      'Invoice Payments',
      'Credit Note',
    ];
    if (supplierStatement.is_credit) {
      amountTypes.push(supplierOpeningBalanceName);
      amountTypes.push('Customer Opening Balance');
    } else {
      paymentTypes.push(supplierOpeningBalanceName);
      paymentTypes.push('Customer Opening Balance');
    }

    if (supplierTransactions?.length >= 0) {
      openingBalance = supplierTransactions.find(
        item =>
          item.transaction_type === supplierOpeningBalanceName ||
          item.transaction_type === 'Customer Opening Balance'
      );
      if (openingBalance) {
        if (openingBalance.is_amount) {
          amountTypes.push('Opening Balance');
        } else {
          paymentTypes.push('Opening Balance');
        }
      }
      transactionsData = supplierTransactions.map(item => {
        if (item.invoice_num) {
          commulativeBalance += item.without_change_grand_total;
        } else if (amountTypes.includes(item.transaction_type)) {
          commulativeBalance += item.total_amount;
        } else {
          commulativeBalance -= item.total_amount;
        }

        return {
          id: item.id,
          date: moment(item.transaction_date).format('DD MMM YYYY'),
          transactions: item.transaction_type || 'Bill',
          details: item.formatted_transaction_number || item.invoice_num || '-',
          amount: getAmount(item, amountTypes),
          payment: getBalance(item, paymentTypes),
          balance: formatAmount(commulativeBalance),
        };
      });

      totalAmount = supplierTransactions
        .filter(item => amountTypes.includes(item.transaction_type || item.bill_num))
        .reduce((acc, val) => acc + val.total_amount || val.without_change_grand_total, 0);

      totalPayment = supplierTransactions
        .filter(item => paymentTypes.includes(item.transaction_type || item.bill_num))
        .reduce((acc, val) => acc + val.total_amount || val.without_change_grand_total, 0);
    }

    return {
      amountTotal: totalAmount,
      balanceDue: commulativeBalance,
      paymentTotal: totalPayment,
      openingBalanceAmount: openingBalance?.totalAmount || openingBalance?.total_amount || 0,
      transactions: transactionsData,
    };
  }, [supplierStatement, supplierTransactions, duration]);
  const basicInfo = {
    supplierId: supplierStatement.id,
    supplierName: supplierStatement.supplier_name || supplierStatement.customer_name,
    supplierAddress: supplierStatement.bill_addr_street_one,
    supplierCity: supplierStatement.bill_addr_city,
    supplierState: supplierStatement.bill_addr_state,
    supplierCountry: supplierStatement.bill_addr_country,
    trn: supplierStatement.trn,
    currency_symbol: supplierStatement.currency,
    openingBalance: formatAmount(openingBalanceAmount),
    totalBilledAmount: formatAmount(amountTotal),
    totalPaymentAmount: formatAmount(paymentTotal),
    totalBalanceDue: formatAmount(balanceDue),
    startDate: moment(supplierStatement.start_date).format('DD MMM YYYY'),
    endDate: moment(supplierStatement.end_date).format('DD MMM YYYY'),
  };
  // console.log(supplierTransactions, 'asdjlkasjlk');

  return {
    basicInfo,
    transactions,
  };
}

export default useSupplierStatement;
