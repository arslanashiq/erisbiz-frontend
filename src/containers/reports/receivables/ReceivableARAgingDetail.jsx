import React from 'react';
// services
import { useGetReceivableARAgingDetailQuery } from 'services/private/reports';
// constainers
import { receivablesARAgingDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetARAgingDetailData from 'containers/reports/custom-hooks/receivables/useGetARAgingDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { customerBalanceInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';

function ReceivableARAgingDetail() {
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="AR Aging Detail"
      reportHeadCells={receivablesARAgingDetailReportHeadCells}
      useGetReportQuery={useGetReceivableARAgingDetailQuery}
      useGetReportData={useGetARAgingDetailData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={customerBalanceInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
    />
  );
}

export default ReceivableARAgingDetail;
