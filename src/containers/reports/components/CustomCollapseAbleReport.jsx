import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@mui/material';
// shared
import { excelSheet } from 'shared/custom-hooks/ExcelSheet';
import CustomeReportTableHead from 'shared/components/custom-report/CustomeReportTableHead';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import { getSelectedFilter } from 'containers/reports/utilities/get-selected-filter';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
// utilities
import { getReportInterval } from 'utilities/get-report-interval';
import ReportsHeader from './ReportsHeader';
import CustomReportsDetailHeader from './CustomReportsDetailHeader';
import 'styles/reports/custom-report.scss';

function CustomCollapseAbleReport({
  reportResponse,
  reportTitle,
  reportHeadCells,
  tableBody,
  customReportCustomFilter,
  customReportCustomerInitialValues,
  customReportInputListValidationSchema,
  children,
}) {
  const { name: companyName } = useSelector(state => state?.user?.company);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();
  const { timeInterval, startDate, endDate } = getReportInterval(
    reportResponse?.data?.start_date,
    reportResponse?.data?.end_date
  );

  return (
    <SectionLoader options={[reportResponse.isLoading]}>
      <ReportsHeader
        reportTitle={reportTitle}
        tableHeader={reportHeadCells}
        tableBody={tableBody}
        tableFooter={[]}
        handleDownloadExcelSheet={async () => {
          const handleDownload = await excelSheet(
            reportTitle,
            startDate,
            endDate,
            timeInterval,
            { showCompanyInfoHeader: true },
            reportHeadCells,
            tableBody,
            [],
            companyName
          );
          handleDownload();
        }}
        initialFilterValue={getSelectedFilter(FilterReportsList)}
        filterList={FilterReportsList}
        handleSubmitCustomDateFilter={handleSubmitCustomDateFilter}
        handleChangeFilter={handleChangeFilter}
        customFilterInputsList={customReportCustomFilter}
        customFilterInitialValues={customReportCustomerInitialValues}
        customReportInputListValidationSchema={customReportInputListValidationSchema}
      />
      <Card className="custom-receipt-main-container">
        <CardContent>
          <CustomReportsDetailHeader reportTitle={reportTitle} filterInfo={timeInterval} />
          <div className="overflow-auto">
            <table className="table1 w-100 ">
              <CustomeReportTableHead tableHeader={reportHeadCells} />

              {children}
            </table>
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}
CustomCollapseAbleReport.propTypes = {
  reportTitle: PropTypes.string.isRequired,
  reportHeadCells: PropTypes.array.isRequired,
  reportResponse: PropTypes.object,
  tableBody: PropTypes.array,
  children: PropTypes.node,
  customReportCustomFilter: PropTypes.array,
  customReportCustomerInitialValues: PropTypes.object,
  customReportInputListValidationSchema: PropTypes.object,
};
CustomCollapseAbleReport.defaultProps = {
  children: null,
  reportResponse: { data: {} },
  tableBody: [],
  customReportCustomFilter: [],
  customReportCustomerInitialValues: {},
  customReportInputListValidationSchema: null,
};

export default CustomCollapseAbleReport;
