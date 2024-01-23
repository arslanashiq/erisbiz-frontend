import React from 'react';
// services
import { useGetPayableBillDetailsQuery } from 'services/private/reports';
import useGetBillDetailData from 'containers/reports/custom-hooks/payables/useGetBillDetailData';
import { payableBillDetailsReportHeadCells } from 'containers/reports/utilities/head-cells';
// components
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { supplierBalanceInitialValues } from '../utilities/initial-values';
import { supplierBalanceFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';

function BillDetails() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();
  return (
    <CustomReportDetailPage
      reportTitle="Purchase Invoice Register"
      reportHeadCells={payableBillDetailsReportHeadCells}
      useGetReportQuery={useGetPayableBillDetailsQuery}
      useGetReportData={useGetBillDetailData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={supplierBalanceInitialValues}
      customReportInputListValidationSchema={supplierBalanceFilterCustomInputsValidationSchema}
    />
  );
}

export default BillDetails;
