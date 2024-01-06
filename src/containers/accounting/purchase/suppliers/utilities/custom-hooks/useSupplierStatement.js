/* eslint-disable implicit-arrow-linebreak */
import { useState, useEffect } from 'react';
import moment from 'moment';
import formatAmount from 'utilities/formatAmount';
// import { useLocation } from 'react-router-dom';

function useSupplierStatement(supplierStatement, supplierTransactions, duration) {
  // const location = useLocation();
  // const query = new URLSearchParams(location.search);
  // const startDate = query.get('startDate') || moment.now();
  // const endDate = query.get('endDate') || moment.now();
  const [transactions, setTransactions] = useState([]);
  const [amountTotal, setAmountTotal] = useState(0);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [openingBalanceAmount, setOpeningBalanceAmount] = useState(0);
  const [balanceDue, setBalanceDue] = useState(0);

  // const sortStatementData = (a, b) => {
  //   if (a.transaction_date === b.transaction_date) {
  //     if (a.transaction_type === 'Opening Balance') return -1;
  //     if (b.transaction_type === 'Opening Balance') return 1;
  //     return a.created_at < b.created_at ? -1 : 1;
  //   }
  //   return a.transaction_date > b.transaction_date ? 1 : -1;
  // };

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
  useEffect(() => {
    const amountTypes = ['Bill', 'Debit Note Refund'];
    const paymentTypes = [
      'Supplier Payment',
      'Supplier Opening Balance Payment',
      'Bill Payment',
      'Debit Note',
    ];

    if (supplierStatement.is_credit) {
      amountTypes.push('Supplier Opening Balance');
    } else {
      paymentTypes.push('Supplier Opening Balance');
    }

    if (supplierTransactions?.length >= 0) {
      let commulativeBalance = 0;

      const openingBalance = supplierTransactions.find(
        item =>
          item.transaction_type === 'Opening Balance' || item.transaction_type === 'Supplier Opening Balance'
      );
      if (openingBalance) {
        setOpeningBalanceAmount(openingBalance.total_amount);
        if (openingBalance.is_amount) {
          amountTypes.push('Opening Balance');
        } else {
          paymentTypes.push('Opening Balance');
        }
      } else {
        setOpeningBalanceAmount(0);
      }

      const transactionsData = supplierTransactions.map(item => {
        if (item.invoice_num) {
          commulativeBalance += item.without_change_grand_total;
        } else if (amountTypes.includes(item.transaction_type)) {
          commulativeBalance += item.total_amount;
        } else {
          commulativeBalance -= item.total_amount;
        }
        setBalanceDue(commulativeBalance);

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

      const totalAmount = supplierTransactions
        .filter(item => amountTypes.includes(item.transaction_type || item.bill_num))
        .reduce((acc, val) => acc + val.total_amount || val.without_change_grand_total, 0);

      setAmountTotal(totalAmount);

      const totalPayment = supplierTransactions
        .filter(item => paymentTypes.includes(item.transaction_type || item.bill_num))
        .reduce((acc, val) => acc + val.total_amount || val.without_change_grand_total, 0);

      setPaymentTotal(totalPayment);

      setTransactions([...transactionsData]);
    }
  }, [supplierStatement, supplierTransactions, duration]);

  const basicInfo = {
    supplierId: supplierStatement.id,
    supplierName: supplierStatement.supplier_name,
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
