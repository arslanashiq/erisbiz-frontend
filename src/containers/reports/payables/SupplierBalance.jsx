import React, { useMemo } from 'react';
// services
import { useGetSuppliersListQuery } from 'services/private/suppliers';
import { useGetSupplierPayableBalanceQuery } from 'services/private/reports';
import { supplierPaybleBalanceReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSupplierBalanceData from 'containers/reports/custom-hooks/payables/useGetSupplierBalanceData';
// components
import useListOptions from 'custom-hooks/useListOptions';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { FilterReportsList } from '../utilities/constants';

function SupplierBalance() {
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
    return newinputList;
  }, [suppliersOptions, FilterReportsList]);

  return (
    <CustomReportDetailPage
      reportTitle="Supplier Balances"
      reportHeadCells={supplierPaybleBalanceReportHeadCells}
      useGetReportQuery={useGetSupplierPayableBalanceQuery}
      useGetReportData={useGetSupplierBalanceData}
      customReportCustomFilter={updatedPayablesSupplierBalanceCustomInputList}
      customReportCustomerInitialValues={{}}
    />
  );
}

export default SupplierBalance;
