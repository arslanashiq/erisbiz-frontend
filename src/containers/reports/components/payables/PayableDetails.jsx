import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetPayableDetailQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// constainers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { payableDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
import useGetPayableDetailData from 'containers/reports/custom-hooks/payables/useGetPayableDetailData';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
// utilities
import { DATE_FILTER_REPORT } from 'utilities/constants';
// components
import ReportsHeader from '../ReportsHeader';
import CustomReportsDetailHeader from '../CustomReportsDetailHeader';

const reportTitle = 'Payable Detail';
function PayableDetails() {
  const location = useLocation();

  const payableDetailResponse = useGetPayableDetailQuery(location.search);

  const { tableBody, tableFooter } = useGetPayableDetailData(payableDetailResponse);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();

  return (
    <SectionLoader options={[payableDetailResponse.isLoading]}>
      <ReportsHeader
        tableHeader={payableDetailReportHeadCells}
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
              filterInfo={`From ${moment(payableDetailResponse?.data?.start_date).format(
                DATE_FILTER_REPORT
              )} To ${moment(payableDetailResponse?.data?.end_date).format(DATE_FILTER_REPORT)}`}
            />
            <CustomReport
              tableHeader={payableDetailReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PayableDetails;
