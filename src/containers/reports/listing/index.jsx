import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from '@mui/material';
import ReportCard from '../components/ReportCard';
import {
  accountant,
  activity,
  financialReports,
  payableReports,
  // purchaseAndExpenses,
  receivableReports,
  // reciptVoucher,
  // sales,
  taxes,
} from '../utilities/constants';

function ReportsList() {
  // const reportsList = [payableReports, activity, accountant, receivableReports, taxes, financialReports];
  return (
    <>
      <Helmet>
        <title>Reports - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>

      {/* <Box sx={{ columnGap: 2, columnCount: { xs: 1, md: 2 } }}>
        {reportsList.map(report => (
          <Grid item xs={12} md={6}>
            <ReportCard cardData={report} />
          </Grid>
        ))}
      </Box> */}
      <Grid container spacing={2} className="mb-5">
        <Grid item xs={12} md={6}>
          <ReportCard cardData={payableReports} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReportCard cardData={receivableReports} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReportCard cardData={taxes} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReportCard cardData={activity} />
        </Grid>

        <Grid item xs={12} md={6}>
          <ReportCard cardData={accountant} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReportCard cardData={financialReports} />
        </Grid>
      </Grid>
    </>
  );
}

export default ReportsList;
