import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from '@mui/material';
import ReportCard from './components/ReportCard';

const payableReports = {
  title: 'Payable Reports',
  reports: [
    {
      label: 'Supplier',
      link: '/pages/reports/supplierBalances?duration=today',
    },
    {
      label: 'Supplier Ledger',
      link: '/pages/reports/cashFlowStatement?duration=this+year&filter_accounts=accounts_without_zero_balance',
    },
    {
      label: 'Aging Supplier Balance',
      link: '/pages/reports/balanceSheet?duration=this+year&filter_accounts=accounts_without_zero_balance',
    },
  ],
};
const receivableReports = {
  title: 'Receivable Reports',
  reports: [
    {
      label: 'Customer',
      link: '/pages/reports/profitAndLoss?duration=this+year&filter_accounts=accounts_without_zero_balance',
    },
    {
      label: 'Customer Ledger',
      link: '/pages/reports/cashFlowStatement?duration=this+year&filter_accounts=accounts_without_zero_balance',
    },
    {
      label: 'Aging Customer Balance',
      link: '/pages/reports/balanceSheet?duration=this+year&filter_accounts=accounts_without_zero_balance',
    },
  ],
};
function ReportsList() {
  return (
    <>
      <Helmet>
        <title>Reports - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <ReportCard cardData={payableReports} />
        </Grid>
        <Grid item md={6}>
          <ReportCard cardData={receivableReports} />
        </Grid>
      </Grid>
    </>
  );
}

export default ReportsList;
