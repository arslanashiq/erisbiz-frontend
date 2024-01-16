import React, { useMemo } from 'react';
// services
import { useGetApAgingDetailQuery } from 'services/private/reports';
import { useGetSuppliersListQuery } from 'services/private/suppliers';

import useListOptions from 'custom-hooks/useListOptions';
import { apAgingDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetApAgingDetailData from 'containers/reports/custom-hooks/payables/useGetApAgingDetailData';
// components
// styles
import { AgingByList, FilterCustomReportsList } from '../utilities/constants';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import 'styles/reports/reports.scss';

function ApAgingDetail() {
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
      options: FilterCustomReportsList,
      fullWidth: true,
    });
    newinputList.push({
      label: 'Select Date',
      name: 'start_date',
      labelClassName: '',
      className: 'w-100',
      isDate: true,
      fullWidth: true,
      hidden: true,
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
  }, [suppliersOptions, FilterCustomReportsList]);
  return (
    <CustomReportDetailPage
      reportTitle="Ap Aging Detail"
      reportHeadCells={apAgingDetailReportHeadCells}
      useGetReportQuery={useGetApAgingDetailQuery}
      useGetReportData={useGetApAgingDetailData}
      customReportCustomFilter={updatedPayablesSupplierBalanceCustomInputList}
      customReportCustomerInitialValues={{}}
    />
  );
}

export default ApAgingDetail;
