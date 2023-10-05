import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetPaymentMadeDetailsQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import useGetPaymentMadeData from 'containers/reports/custom-hooks/payables/useGetPaymentMadeData';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { paymentMadeReportHeadCells } from 'containers/reports/utilities/head-cells';
import { PayableReportFilterInitialValues } from 'containers/reports/utilities/initial-values';
import { payableReportsFilterInputList } from 'containers/reports/utilities/filter-input-list';
// utilities
import { DATE_FILTER_REPORT } from 'utilities/constants';
// components
import ReportsHeader from '../ReportsHeader';
import CustomReportsDetailHeader from '../CustomReportsDetailHeader';
// styles
import 'styles/reports/reports.scss';

function PaymentsMade() {
  const location = useLocation();
  const paymentMadeResponse = useGetPaymentMadeDetailsQuery(location.search);
  const { tableBody, tableFooter } = useGetPaymentMadeData(paymentMadeResponse);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();

  const reportTitle = 'Payment Made';
  return (
    <SectionLoader options={[paymentMadeResponse.isLoading]}>
      <ReportsHeader
        tableHeader={paymentMadeReportHeadCells}
        reportTitle={reportTitle}
        tableBody={tableBody}
        tableFooter={tableFooter}
        initialFilterValue={FilterReportsList[4]}
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
              filterInfo={`From ${moment(paymentMadeResponse?.data?.start_date).format(
                DATE_FILTER_REPORT
              )} To ${moment(paymentMadeResponse?.data?.end_date).format(DATE_FILTER_REPORT)}`}
            />
            <CustomReport
              tableHeader={paymentMadeReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PaymentsMade;
