import React from 'react';
import moment from 'moment';
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
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
// utilities
import { DATE_FILTER_REPORT } from 'utilities/constants';
import 'styles/reports/custom-report.scss';
import ReportsHeader from './ReportsHeader';
import CustomReportsDetailHeader from './CustomReportsDetailHeader';

function CustomCollapseAbleReport({ reportResponse, reportTitle, reportHeadCells, tableBody, children }) {
  const { name: companyName } = useSelector(state => state?.user?.company);

  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();
  const startDate = moment(reportResponse?.data?.start_date).format(DATE_FILTER_REPORT);
  const endDate = moment(reportResponse?.data?.end_date).format(DATE_FILTER_REPORT);
  const timeInterval = `From ${startDate} To ${endDate}`;

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
        customFilterInitialValues={PayableReportFilterInitialValues}
        customFilterInputsList={payableReportsFilterInputList}
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
};
CustomCollapseAbleReport.defaultProps = {
  children: null,
  reportResponse: { data: {} },
  tableBody: [],
};

export default CustomCollapseAbleReport;
