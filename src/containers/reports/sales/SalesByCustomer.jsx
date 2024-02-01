import React from 'react';
import { useGetSaleByCustomerQuery } from 'services/private/reports';
import useGetSaleByCustomerData from 'containers/reports/custom-hooks/sales/useGetSaleByCustomerData';
import { saleByCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';
import { customerBalanceInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';

function SalesByCustomer() {
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Sales By Customer"
      reportHeadCells={saleByCustomerReportHeadCells}
      useGetReportQuery={useGetSaleByCustomerQuery}
      useGetReportData={useGetSaleByCustomerData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={customerBalanceInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
    />
  );
}

export default SalesByCustomer;
