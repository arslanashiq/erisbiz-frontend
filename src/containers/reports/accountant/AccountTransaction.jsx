import React from 'react';
import {
  useGetAccountTransactionsQuery,
  useGetTrialBalanceAccountDetailReportQuery,
} from 'services/private/reports';
import { accountTransactionReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetAccountTransactionData from 'containers/reports/custom-hooks/accountant/useGetAccountTransactionData';
import getSearchParamsList from 'utilities/getSearchParamsList';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { accountTransactionInitialValues } from '../utilities/initial-values';
import { supplierBalanceFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import {
  customEndDateInput,
  customStartDateInput,
  transactionTypeInput,
} from '../utilities/filter-input-list';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import usegetSupplierInput from '../custom-hooks/common/useGetSupplierInput';
import useGetCustomerInput from '../custom-hooks/common/useGetCustomerInput';
import useGetPurchaseInvoiceInput from '../custom-hooks/common/useGetPurchaseInvoiceInput';
import useGetPaymentVoucherInput from '../custom-hooks/common/useGetPaymentVoucherInput';
import useGetPurchaseDebitNoteInput from '../custom-hooks/common/useGetPurchaseDebitNoteInput';
import useGetExpenseInput from '../custom-hooks/common/useGetExpenseInput 2';
import useGetSalesInvoiceInput from '../custom-hooks/common/useGetSalesInvoiceInput';
import useGetReceiptVoucherInput from '../custom-hooks/common/useGetReceiptVoucherInput';
import useGetSalesCreditNoteInput from '../custom-hooks/common/useGetSalesCreditNoteInput';
import useGetChartOfAccountInput from '../custom-hooks/common/useGetChartOfAccountInput';

function AccountTransaction() {
  const { chart_of_account_id: COAId } = getSearchParamsList();
  const durationInput = useGetDurationInput();
  // purchase
  const supplierInput = usegetSupplierInput();
  const purchaseInvoiceInput = useGetPurchaseInvoiceInput();
  const paymentVoucherInput = useGetPaymentVoucherInput();
  const purchaseDebitNoteInput = useGetPurchaseDebitNoteInput();
  const expenseInput = useGetExpenseInput();
  // sales
  const customerInput = useGetCustomerInput();
  const salesInvoiceInput = useGetSalesInvoiceInput();
  const receiptVoucherInput = useGetReceiptVoucherInput();
  const creditNoteInput = useGetSalesCreditNoteInput();

  // chart of account
  const chartOfAccountInput = useGetChartOfAccountInput();

  return (
    <CustomReportDetailPage
      reportTitle="Account Transaction"
      reportHeadCells={accountTransactionReportHeadCells}
      useGetReportQuery={COAId ? useGetTrialBalanceAccountDetailReportQuery : useGetAccountTransactionsQuery}
      useGetReportData={useGetAccountTransactionData}
      customReportCustomFilter={[
        durationInput,
        customStartDateInput,
        customEndDateInput,
        transactionTypeInput,
        {
          ...supplierInput,
          hidden: true,
          displayKey: 'transaction_type',
          displayKeyValue: ['Bill', 'Supplier Payment', 'Debit Note', 'Expense'],
        },
        purchaseInvoiceInput,
        paymentVoucherInput,
        purchaseDebitNoteInput,
        expenseInput,
        {
          ...customerInput,
          hidden: true,
          displayKey: 'transaction_type',
          displayKeyValue: ['Invoice', 'Customer Receipt', 'Credit Note'],
        },
        salesInvoiceInput,
        receiptVoucherInput,
        creditNoteInput,
        chartOfAccountInput,
      ]}
      customReportCustomerInitialValues={accountTransactionInitialValues}
      customReportInputListValidationSchema={supplierBalanceFilterCustomInputsValidationSchema}
    />
  );
}

export default AccountTransaction;
