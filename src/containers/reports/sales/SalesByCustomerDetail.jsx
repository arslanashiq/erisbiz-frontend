import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useGetSaleByCustomerDetailQuery } from 'services/private/reports';
import { saleByCustomerDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import getSearchParamsList from 'utilities/getSearchParamsList';
import useGetSaleByCustomerDetailData from 'containers/reports/custom-hooks/sales/useGetSaleByCustomerDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetCustomerInput from '../custom-hooks/common/useGetCustomerInput';

function SalesByCustomerDetail() {
  const location = useLocation();
  const { customer_id: customerID } = getSearchParamsList(location);
  const customerInput = useGetCustomerInput();
  const selectedCustomer = useMemo(
    () => customerInput?.options?.find(option => option.value === Number(customerID)),
    [customerInput, customerID]
  );
  return (
    <CustomReportDetailPage
      reportTitle={`Sales By ${selectedCustomer?.label || 'Customer'}`}
      reportHeadCells={saleByCustomerDetailReportHeadCells}
      useGetReportQuery={useGetSaleByCustomerDetailQuery}
      useGetReportData={useGetSaleByCustomerDetailData}
      options={{ showFilter: false }}
    />
  );
}

export default SalesByCustomerDetail;
