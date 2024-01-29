import React from 'react';
// services
import { useGetPayableDetailQuery } from 'services/private/reports';
// constainers

import { payableDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPayableDetailData from 'containers/reports/custom-hooks/payables/useGetPayableDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import usegetSupplierInput from '../custom-hooks/common/useGetSupplierInput';
import { customEndDateInput, customStartDateInput } from '../utilities/filter-input-list';
import { payableDetailInitialValues } from '../utilities/initial-values';
import { payableDetailFilterCustomInputsValidationSchema } from '../utilities/validation-schema';

function PayableDetails() {
  const durationInput = useGetDurationInput();
  const supplierInput = usegetSupplierInput();
  return (
    <CustomReportDetailPage
      reportTitle="Payable Details"
      reportHeadCells={payableDetailReportHeadCells}
      useGetReportQuery={useGetPayableDetailQuery}
      useGetReportData={useGetPayableDetailData}
      customReportCustomFilter={[durationInput, customStartDateInput, customEndDateInput, supplierInput]}
      customReportCustomerInitialValues={payableDetailInitialValues}
      customReportInputListValidationSchema={payableDetailFilterCustomInputsValidationSchema}
    />
  );
}

export default PayableDetails;
