import React from 'react';
import moment from 'moment/moment';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetPurchaseOrderBySupplierQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
// utilities
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
import useGetPurchaseOrderBySupplierData from 'containers/reports/custom-hooks/useGetPurchaseOrderBySupplierData';
// utilities
import { DATE_FILTER_REPORT } from 'utilities/constants';
import { payablePurchaseOrderBySupplierReportHeadCells } from '../../utilities/head-cells';
// components
import ReportsHeader from '../ReportsHeader';
import CustomReportsDetailHeader from '../CustomReportsDetailHeader';

const reportTitle = 'Purchase Orders By Suppliers';
function PurchaseOrderBySupplier() {
  const location = useLocation();

  const purchaseOrderBySupplierResponse = useGetPurchaseOrderBySupplierQuery(location.search);

  const { tableBody, tableFooter } = useGetPurchaseOrderBySupplierData(purchaseOrderBySupplierResponse);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();
  return (
    <SectionLoader options={[purchaseOrderBySupplierResponse.isLoading]}>
      <ReportsHeader
        tableHeader={payablePurchaseOrderBySupplierReportHeadCells}
        reportTitle={reportTitle}
        tableBody={tableBody}
        tableFooter={tableFooter}
        initialFilterValue={FilterReportsList[0]}
        filterList={FilterReportsList}
        handleSubmitCustomDateFilter={handleSubmitCustomDateFilter}
        handleChangeFilter={handleChangeFilter}
        customFilterInitialValues={PayableReportFilterInitialValues}
        customFilterInputsList={payableReportsFilterInputList}
      />
      <Card>
        <CardContent>
          <div className="reports mx-auto">
            <CustomReportsDetailHeader
              reportTitle={reportTitle}
              filterInfo={`From ${moment(purchaseOrderBySupplierResponse?.data?.start_date).format(
                DATE_FILTER_REPORT
              )} To  ${moment(purchaseOrderBySupplierResponse?.data?.end_date).format(DATE_FILTER_REPORT)}`}
            />
            <CustomReport
              tableHeader={payablePurchaseOrderBySupplierReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PurchaseOrderBySupplier;
