import React from 'react';
// services
import { useGetPayableDetailQuery } from 'services/private/reports';
// constainers

import { payableDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPayableDetailData from 'containers/reports/custom-hooks/payables/useGetPayableDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { payableDetailInitialValues } from '../utilities/initial-values';
import { payableDetailFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';

function PayableDetails() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Payable Details"
      reportHeadCells={payableDetailReportHeadCells}
      useGetReportQuery={useGetPayableDetailQuery}
      useGetReportData={useGetPayableDetailData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={payableDetailInitialValues}
      customReportInputListValidationSchema={payableDetailFilterCustomInputsValidationSchema}
    />
  );
}

export default PayableDetails;
