import React from 'react';
// services
import { useGetApAgingDetailQuery } from 'services/private/reports';
// components
import { apAgingDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetApAgingDetailData from 'containers/reports/custom-hooks/payables/useGetApAgingDetailData';
import getSearchParamsList from 'utilities/getSearchParamsList';
import { agingByInput } from '../utilities/filter-input-list';
import { apAgingInitialValues } from '../utilities/initial-values';
import { apAgingFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';
import 'styles/reports/reports.scss';

function ApAgingDetail() {
  const { supplier_id: supplierID } = getSearchParamsList();
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();
  return (
    <CustomReportDetailPage
      reportTitle={supplierID ? 'Ap Aging Summary Details' : 'Ap Aging Details'}
      reportHeadCells={apAgingDetailReportHeadCells}
      useGetReportQuery={useGetApAgingDetailQuery}
      useGetReportData={useGetApAgingDetailData}
      customReportCustomerInitialValues={apAgingInitialValues}
      customReportCustomFilter={[...updatedCustomInputList, agingByInput]}
      customReportInputListValidationSchema={apAgingFilterCustomInputsValidationSchema}
    />
  );
}

export default ApAgingDetail;
