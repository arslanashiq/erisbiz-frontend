import React, { useMemo } from 'react';
// services
import { useGetApAgingSummaryQuery } from 'services/private/reports';
import { useGetSuppliersListQuery } from 'services/private/suppliers';
// containers
import useListOptions from 'custom-hooks/useListOptions';
import { apAgingSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetAPAgingSummaryData from 'containers/reports/custom-hooks/payables/useGetAPAgingSummaryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { AgingByList, FilterReportsList } from '../utilities/constants';

function ApAgingSummary() {
  const supplierApiResponse = useGetSuppliersListQuery();

  const { optionsList: suppliersOptions } = useListOptions(supplierApiResponse?.data?.results, {
    value: 'id',
    label: 'supplier_name',
  });
  const updatedPayablesSupplierBalanceCustomInputList = useMemo(() => {
    const newinputList = [];

    newinputList.push({
      label: 'Duration',
      name: 'duration',
      labelClassName: '',
      className: 'w-100',
      options: FilterReportsList,
      fullWidth: true,
    });

    newinputList.push({
      label: 'Supplier',
      options: suppliersOptions || [],
      name: 'supplier_id',
      labelClassName: '',
      className: 'w-100',
      fullWidth: true,
    });
    newinputList.push({
      label: 'Aging By',
      name: 'date_type',
      labelClassName: '',
      className: 'w-100',
      options: AgingByList,
      fullWidth: true,
    });
    return newinputList;
  }, [suppliersOptions, FilterReportsList]);
  return (
    <CustomReportDetailPage
      reportTitle="AP Aging Summary By Bill Date"
      reportHeadCells={apAgingSummaryReportHeadCells}
      useGetReportQuery={useGetApAgingSummaryQuery}
      useGetReportData={useGetAPAgingSummaryData}
      customReportCustomFilter={updatedPayablesSupplierBalanceCustomInputList}
      customReportCustomerInitialValues={{}}
    />
  );
}

export default ApAgingSummary;
