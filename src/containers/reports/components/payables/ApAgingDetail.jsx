import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetApAgingDetailQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import { apAgingDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetApAgingDetailData from 'containers/reports/custom-hooks/useGetApAgingDetailData';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
// utilities
import { DATE_FILTER_REPORT } from 'utilities/constants';
// components
import ReportsHeader from '../ReportsHeader';
import CustomReportsDetailHeader from '../CustomReportsDetailHeader';
// styles
import 'styles/reports/reports.scss';

function ApAgingDetail() {
  const location = useLocation();

  const ReportApAgingDetailResponse = useGetApAgingDetailQuery(location.search);

  const { tableBody, tableFooter } = useGetApAgingDetailData(ReportApAgingDetailResponse);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();

  const reportTitle = 'Ap Aging Detail';
  return (
    <SectionLoader options={[ReportApAgingDetailResponse.isLoading]}>
      <ReportsHeader
        tableHeader={apAgingDetailReportHeadCells}
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
              filterInfo={`From ${moment(ReportApAgingDetailResponse?.data?.start_date).format(
                DATE_FILTER_REPORT
              )} To ${moment(ReportApAgingDetailResponse?.data?.end_date).format(DATE_FILTER_REPORT)}`}
            />

            <CustomReport
              tableHeader={apAgingDetailReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ApAgingDetail;
