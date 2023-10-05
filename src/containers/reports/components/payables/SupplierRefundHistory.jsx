import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetSupplierRefundHistoryQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { FilterReportsList } from 'containers/reports/utilities/constants';
import useReportHeaderFilters from 'containers/reports/custom-hooks/useReportHeaderFilters';
import { supplierRefundHistoryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSupplierBalanceData from 'containers/reports/custom-hooks/payables/useGetSupplierBalanceData';
// utilities
import { DATE_FILTER_REPORT } from 'utilities/constants';
import { payableReportsFilterInputList } from '../../utilities/filter-input-list';
import { PayableReportFilterInitialValues } from '../../utilities/initial-values';
// components
import ReportsHeader from '../ReportsHeader';
import CustomReportsDetailHeader from '../CustomReportsDetailHeader';
// styles
import 'styles/reports/reports.scss';

const reportTitle = 'Supplier Refund History';

function SupplierRefundHistory() {
  const location = useLocation();

  const supplierRefundHistoryResponse = useGetSupplierRefundHistoryQuery(location.search);

  const { tableBody, tableFooter } = useGetSupplierBalanceData(supplierRefundHistoryResponse);
  const { handleSubmitCustomDateFilter, handleChangeFilter } = useReportHeaderFilters();

  return (
    <SectionLoader options={[supplierRefundHistoryResponse.isLoading]}>
      <ReportsHeader
        tableHeader={supplierRefundHistoryReportHeadCells}
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
              filterInfo={`As of ${moment(supplierRefundHistoryResponse?.data?.end_date).format(
                DATE_FILTER_REPORT
              )}`}
            />
            <CustomReport
              tableHeader={supplierRefundHistoryReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default SupplierRefundHistory;
