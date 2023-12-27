import React from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@mui/material';
// shared
import { excelSheet } from 'shared/custom-hooks/ExcelSheet';
import CustomReport from 'shared/components/custom-report/CustomReport';
// constainers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
// utilities
import getSearchParamsList from 'utilities/getSearchParamsList';
import { DATE_FILTER_REPORT, DEFAULT_PARAMS } from 'utilities/constants';
// components
import ReportsHeader from './ReportsHeader';
import CustomReportsDetailHeader from './CustomReportsDetailHeader';
import { getSelectedFilter } from '../utilities/get-selected-filter';

function CustomReportDetailPage({
  reportTitle,
  reportHeadCells,
  useGetReportQuery,
  useGetReportData,
  CustomComponent,
  options,
  parentWrapperClassName,
  queryOptions,
  usePagination,
}) {
  const { name: companyName } = useSelector(state => state?.user?.company);

  const { replaceTableBody } = options;

  const searchQueryParamsData = getSearchParamsList();
  const defaultParams = usePagination ? { ...DEFAULT_PARAMS } : {};
  const reportResponse = useGetReportQuery({ ...defaultParams, ...searchQueryParamsData }, queryOptions);
  const { isMultiReport, modifiedTableHead, tableBody, modifiedTableBody, tableFooter } = useGetReportData(
    reportResponse,
    companyName
  );
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();

  const startDate = moment(reportResponse?.data?.start_date).format(DATE_FILTER_REPORT);
  const endDate = moment(reportResponse?.data?.end_date).format(DATE_FILTER_REPORT);
  const timeInterval = `From ${startDate} To ${endDate}`;
  return (
    <SectionLoader options={[reportResponse.isLoading]}>
      <ReportsHeader
        reportTitle={reportTitle}
        tableHeader={replaceTableBody ? modifiedTableHead : reportHeadCells}
        tableBody={replaceTableBody ? modifiedTableBody : tableBody}
        tableFooter={tableFooter}
        initialFilterValue={getSelectedFilter(FilterReportsList)}
        filterList={FilterReportsList}
        handleSubmitCustomDateFilter={handleSubmitCustomDateFilter}
        handleChangeFilter={handleChangeFilter}
        customFilterInitialValues={PayableReportFilterInitialValues}
        customFilterInputsList={payableReportsFilterInputList}
        handleDownloadExcelSheet={async () => {
          const handleDownload = await excelSheet(
            reportTitle,
            startDate,
            endDate,
            timeInterval,
            options,
            replaceTableBody ? modifiedTableHead : reportHeadCells,
            replaceTableBody ? modifiedTableBody : tableBody,
            tableFooter,
            companyName
          );
          handleDownload();
        }}
        isMultiReport={isMultiReport}
        modifiedTableHead={modifiedTableHead}
        options={options}
      />
      <Card>
        <CardContent>
          {CustomComponent && CustomComponent}
          <CustomReportsDetailHeader reportTitle={reportTitle} filterInfo={timeInterval} />
          <div className="reports overflow-auto">
            {isMultiReport ? (
              tableBody.map((item, index) => (
                <CustomReport
                  key={uuid()}
                  tableHeader={modifiedTableHead[index]}
                  tableBody={item}
                  tableFooter={tableFooter[index]}
                  parentWrapperClassName={parentWrapperClassName}
                  usePagination={usePagination}
                  rowCount={reportResponse?.data?.count || 100}
                />
              ))
            ) : (
              <CustomReport
                tableHeader={reportHeadCells}
                tableBody={tableBody}
                tableFooter={tableFooter}
                parentWrapperClassName={parentWrapperClassName}
                usePagination={usePagination}
                rowCount={reportResponse?.data?.count || 100}
              />
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
  CustomComponent: PropTypes.element,
  options: PropTypes.shape({
    showFilter: PropTypes.bool,
    replaceTableBody: PropTypes.bool,
    showCompanyInfoHeader: PropTypes.bool,
  }),
  parentWrapperClassName: PropTypes.string,
  queryOptions: PropTypes.object,
  usePagination: PropTypes.bool,
};
CustomReportDetailPage.defaultProps = {
  reportTitle: '',
  options: {
    showFilter: true,
    showCompanyInfoHeader: true,
    replaceTableBody: false,
    showPrint: true,
  },
  CustomComponent: null,
  parentWrapperClassName: 'custom-receipt-main-container',
  queryOptions: {},
  usePagination: false,
};
export default CustomReportDetailPage;
