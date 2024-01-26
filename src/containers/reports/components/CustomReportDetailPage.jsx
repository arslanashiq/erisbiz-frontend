import React from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet';
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
import { DEFAULT_PARAMS } from 'utilities/constants';
import getSearchParamsList from 'utilities/getSearchParamsList';
import { getReportInterval } from 'utilities/get-report-interval';
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
  customReportCustomFilter,
  customReportCustomerInitialValues,
  customReportInputListValidationSchema,
}) {
  const location = useLocation();
  const { name: companyName } = useSelector(state => state?.user?.company);

  const { replaceTableBody } = options;

  const searchQueryParamsData = getSearchParamsList(location);
  const defaultParams = usePagination ? { ...DEFAULT_PARAMS } : {};
  const reportResponse = useGetReportQuery({ ...defaultParams, ...searchQueryParamsData }, queryOptions);
  const { isMultiReport, modifiedTableHead, tableBody, modifiedTableBody, tableFooter } = useGetReportData(
    reportResponse,
    companyName
  );
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();

  const { timeInterval, startDate, endDate } = getReportInterval(
    reportResponse?.data?.start_date,
    reportResponse?.data?.end_date
  );
  return (
    <SectionLoader options={[reportResponse.isLoading]}>
      <Helmet>
        <title>{reportTitle} Report - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <ReportsHeader
        reportTitle={reportTitle}
        timeInterval={timeInterval}
        tableHeader={replaceTableBody ? modifiedTableHead : reportHeadCells}
        tableBody={replaceTableBody ? modifiedTableBody : tableBody}
        tableFooter={tableFooter}
        initialFilterValue={getSelectedFilter(FilterReportsList)}
        filterList={FilterReportsList}
        handleSubmitCustomDateFilter={handleSubmitCustomDateFilter}
        handleChangeFilter={handleChangeFilter}
        customFilterInputsList={
          customReportCustomFilter?.length > 0 ? customReportCustomFilter : payableReportsFilterInputList
        }
        customFilterInitialValues={customReportCustomerInitialValues || PayableReportFilterInitialValues}
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
        customReportInputListValidationSchema={customReportInputListValidationSchema}
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
  customReportCustomFilter: PropTypes.array,
  customReportCustomerInitialValues: PropTypes.object,
  customReportInputListValidationSchema: PropTypes.object,
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
  customReportCustomFilter: [],
  customReportCustomerInitialValues: null,
  customReportInputListValidationSchema: null,
};
export default CustomReportDetailPage;
