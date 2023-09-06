import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from '@mui/material';
import ReportCard from './components/ReportCard';
import {
  accountant,
  activity,
  financialReports,
  payableReports,
  purchaseAndExpenses,
  receivableReports,
  reciptVoucher,
  sales,
  taxes,
} from './utilities/constants';

// const allReports = [activity, taxes, financialReports, receivableReports, payableReports];
function ReportsList() {
  return (
    <>
      <Helmet>
        <title>Reports - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <Grid container spacing={2} className="mb-5">
        <Grid item xs={12} md={6}>
          <ReportCard cardData={payableReports} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ReportCard cardData={receivableReports} />
            </Grid>
            <Grid item xs={12}>
              <ReportCard cardData={taxes} />
            </Grid>
            <Grid item xs={12}>
              <ReportCard cardData={activity} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <ReportCard cardData={purchaseAndExpenses} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReportCard cardData={sales} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReportCard cardData={accountant} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ReportCard cardData={financialReports} />
            </Grid>
            <Grid item xs={12}>
              <ReportCard cardData={reciptVoucher} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ReportsList;
