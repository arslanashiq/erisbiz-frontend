import React from 'react';
import moment from 'moment';
import { Card, CardContent } from '@mui/material';
import { useLocation } from 'react-router';
// services
import { useGetPayableBillDetailsQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import useGetBillDetailData from 'containers/reports/custom-hooks/payables/useGetBillDetailData';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { payableBillDetailsReportHeadCells } from 'containers/reports/utilities/head-cells';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
// utilities
import { DATE_FILTER_REPORT } from 'utilities/constants';
// components
import ReportsHeader from '../ReportsHeader';
import CustomReportsDetailHeader from '../CustomReportsDetailHeader';
// styles
import 'styles/reports/reports.scss';

const reportTitle = 'Bill Detail';
function BillDetails() {
  const location = useLocation();

  const billDetailReportResponse = useGetPayableBillDetailsQuery(location.search);

  const { tableBody, tableFooter } = useGetBillDetailData(billDetailReportResponse);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();

  return (
    <SectionLoader options={[billDetailReportResponse.isLoading]}>
      <ReportsHeader
        tableHeader={payableBillDetailsReportHeadCells}
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
              filterInfo={`From ${moment(billDetailReportResponse?.data?.start_date).format(
                DATE_FILTER_REPORT
              )} To ${moment(billDetailReportResponse?.data?.end_date).format(DATE_FILTER_REPORT)}`}
            />

            <CustomReport
              tableHeader={payableBillDetailsReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default BillDetails;
