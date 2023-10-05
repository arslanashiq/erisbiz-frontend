import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetApAgingSummaryQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import { apAgingSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import useGetAPAgingSummaryData from 'containers/reports/custom-hooks/payables/useGetAPAgingSummaryData';
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
// utilities
import { DATE_FILTER_REPORT } from 'utilities/constants';
// styles
import 'styles/reports/reports.scss';
import ReportsHeader from '../ReportsHeader';
import CustomReportsDetailHeader from '../CustomReportsDetailHeader';

const reportTitle = 'AP Aging Summary By Bill Date';
function ApAgingSummary() {
  const location = useLocation();

  const reportAPAgingSummaryResponse = useGetApAgingSummaryQuery(location.search);

  const { tableBody, tableFooter } = useGetAPAgingSummaryData(reportAPAgingSummaryResponse);
  const { handleChangeFilter, handleSubmitCustomDateFilter } = useReportHeaderFilters();

  return (
    <SectionLoader options={[reportAPAgingSummaryResponse.isLoading]}>
      <ReportsHeader
        tableHeader={apAgingSummaryReportHeadCells}
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
              filterInfo={`As of ${moment(reportAPAgingSummaryResponse?.data?.end_date).format(
                DATE_FILTER_REPORT
              )}`}
            />
            <CustomReport
              tableHeader={apAgingSummaryReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ApAgingSummary;
