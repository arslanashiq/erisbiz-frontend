import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetPurchaseOrderDetailQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
import { payablePurchaseOrderDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPurchaseOrderDetailData from 'containers/reports/custom-hooks/useGetPurchaseOrderDetailData';
// utilities
import { DATE_FILTER_REPORT } from 'utilities/constants';
// components
import ReportsHeader from '../ReportsHeader';
import CustomReportsDetailHeader from '../CustomReportsDetailHeader';
// styles
import 'styles/reports/reports.scss';

const reportTitle = 'Purchase Order Detail';
function PurchaseOrderDetail() {
  const location = useLocation();

  const purchaseOrderDetailResponse = useGetPurchaseOrderDetailQuery(location.search);

  const { tableBody, tableFooter } = useGetPurchaseOrderDetailData(purchaseOrderDetailResponse);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();

  return (
    <SectionLoader options={[purchaseOrderDetailResponse.isLoading]}>
      <ReportsHeader
        tableHeader={payablePurchaseOrderDetailReportHeadCells}
        reportTitle={reportTitle}
        tableBody={tableBody}
        tableFooter={tableFooter}
        initialFilterValue={FilterReportsList[2]}
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
              filterInfo={`From ${moment(purchaseOrderDetailResponse?.data?.start_date).format(
                DATE_FILTER_REPORT
              )} To  ${moment(purchaseOrderDetailResponse?.data?.end_date).format(DATE_FILTER_REPORT)}`}
            />
            <CustomReport
              tableHeader={payablePurchaseOrderDetailReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PurchaseOrderDetail;
