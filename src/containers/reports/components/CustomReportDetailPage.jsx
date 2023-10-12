import React from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// shared
import useExcelSheet from 'shared/custom-hooks/useExcelSheet';
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

function CustomReportDetailPage({
  reportTitle,
  reportHeadCells,
  useGetReportQuery,
  useGetReportData,
  options,
}) {
  const location = useLocation();

  const reportResponse = useGetReportQuery(location.search);
  const { isMultiReport, modifiedTableHead, tableBody, tableFooter } = useGetReportData(reportResponse);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();

  const getSelectedFilter = () => {
    const searchQuery = location.search;
    let selectedFilter = '';
    let filterDuration = 'this+month';
    if (searchQuery) {
      searchQuery.split('&').forEach(singleQuery => {
        if (singleQuery.includes('duration')) {
          let temp = singleQuery.replace('?', '');
          temp = temp.replace('%20', ' ');
          temp = temp.replace('+', ' ');
          temp = temp.replace('duration=', '');
          filterDuration = temp;
        }
      });
    }
    if (filterDuration) {
      selectedFilter = FilterReportsList.filter(filter => filter.value === filterDuration);
      if (selectedFilter.length > 0) {
        [selectedFilter] = selectedFilter;
      } else {
        [, , selectedFilter] = FilterReportsList;
      }
    }
    return selectedFilter;
  };
  const startDate = moment(reportResponse?.data?.start_date).format(DATE_FILTER_REPORT);
  const endDate = moment(reportResponse?.data?.end_date).format(DATE_FILTER_REPORT);
  const timeInterval = `From ${startDate} To ${endDate}`;
  const { handleDownload: handleDownloadExcelSheet } = useExcelSheet(
    reportTitle,
    startDate,
    endDate,
    timeInterval,
    reportHeadCells,
    tableBody,
    tableFooter
  );
  return (
    <SectionLoader options={[reportResponse.isLoading]}>
      <ReportsHeader
        tableHeader={reportHeadCells}
        reportTitle={reportTitle}
        tableBody={tableBody}
        tableFooter={tableFooter}
        initialFilterValue={getSelectedFilter()}
        filterList={FilterReportsList}
        handleSubmitCustomDateFilter={handleSubmitCustomDateFilter}
        handleChangeFilter={handleChangeFilter}
        customFilterInitialValues={PayableReportFilterInitialValues}
        customFilterInputsList={payableReportsFilterInputList}
        handleDownloadExcelSheet={handleDownloadExcelSheet}
        isMultiReport={isMultiReport}
        modifiedTableHead={modifiedTableHead}
        options={options}
      />
      <Card>
        <CardContent>
          <div className="reports mx-auto">
            <CustomReportsDetailHeader reportTitle={reportTitle} filterInfo={timeInterval} />
            {isMultiReport ? (
              tableBody.map((item, index) => (
                <CustomReport
                  key={uuid()}
                  tableHeader={modifiedTableHead[index]}
                  tableBody={item}
                  tableFooter={tableFooter[index]}
                />
              ))
            ) : (
              <CustomReport tableHeader={reportHeadCells} tableBody={tableBody} tableFooter={tableFooter} />
            )}
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
  options: PropTypes.objectOf({
    showFilter: PropTypes.bool,
  }),
};
CustomReportDetailPage.defaultProps = {
  reportTitle: '',
  options: {
    showFilter: true,
  },
};
export default CustomReportDetailPage;
