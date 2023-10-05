import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// constainers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
// utilities
import { DATE_FILTER_REPORT } from 'utilities/constants';
// components
import ReportsHeader from './ReportsHeader';
import CustomReportsDetailHeader from './CustomReportsDetailHeader';

function CustomReportDetailPage({ reportTitle, reportHeadCells, useGetReportQuery, useGetReportData }) {
  const location = useLocation();
  const reportResponse = useGetReportQuery(location.search);
  const { tableBody, tableFooter } = useGetReportData(reportResponse);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();
  return (
    <SectionLoader options={[reportResponse.isLoading]}>
      <ReportsHeader
        tableHeader={reportHeadCells}
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
              filterInfo={`From ${moment(reportResponse?.data?.start_date).format(
                DATE_FILTER_REPORT
              )} To ${moment(reportResponse?.data?.end_date).format(DATE_FILTER_REPORT)}`}
            />
            <CustomReport tableHeader={reportHeadCells} tableBody={tableBody} tableFooter={tableFooter} />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}
CustomReportDetailPage.propTypes = {
  reportTitle: PropTypes.string,
  reportHeadCells: PropTypes.array.isRequired,
  useGetReportQuery: PropTypes.func.isRequired,
  useGetReportData: PropTypes.func.isRequired,
};
CustomReportDetailPage.defaultProps = {
  reportTitle: '',
};
export default CustomReportDetailPage;
