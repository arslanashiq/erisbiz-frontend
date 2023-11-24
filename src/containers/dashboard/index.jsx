/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
// services
import {
  useGetDashboardCurrentMonthSaleQuery,
  useGetDashboardDetailQuery,
  useGetDashboardProductCategoryDetailQuery,
  useGetDashboardSaleByMonthQuery,
  useGetDashboardTotalReceivablesQuery,
} from 'services/private/dashboard';
// complonents and styles
import SectionLoader from 'containers/common/loaders/SectionLoader';
import formatAmount from 'utilities/formatAmount';
import DashboardCards from './components/DashboardCards';
import DashboardTable from './components/DashboardTable';
import {
  currentMonthSalesHeadCells,
  productCategoryStockPositionHeadCells,
  totalReceivablesHeadCells,
} from './utilities/head-cells';
import 'styles/dashboard/dashboard.scss';

function Dasbboard() {
  const currentMonthSale = useGetDashboardCurrentMonthSaleQuery();
  const saleByMonth = useGetDashboardSaleByMonthQuery();
  const dashboardDetail = useGetDashboardDetailQuery();
  const productCategory = useGetDashboardProductCategoryDetailQuery();
  const totalReceivables = useGetDashboardTotalReceivablesQuery();
  const currencySymbol = useSelector(state => state?.user?.company?.currency?.currency_code);

  const cardsList = useMemo(
    () => [
      {
        icon: <BarChartIcon fontSize="70px" />,
        title: `${currencySymbol} ${formatAmount(dashboardDetail?.data?.today_sale)}`,
        sub_title: "Today's Sale",
        link: '',
        number: 2,
      },
      {
        icon: <BarChartIcon fontSize="70px" />,
        title: `${currencySymbol} ${formatAmount(dashboardDetail?.data?.today__cash_sale)}`,
        sub_title: "Today's Cash Sale",
        link: '',
        number: 3,
      },
      {
        icon: <BarChartIcon fontSize="70px" />,
        title: `${currencySymbol} ${formatAmount(dashboardDetail?.data?.total_receivable)}`,
        sub_title: 'Receivables',
        link: '',
        number: 4,
      },
      {
        icon: <BarChartIcon fontSize="70px" />,
        title: `${currencySymbol} ${formatAmount(dashboardDetail?.data?.today_card_sale)}`,
        sub_title: "Today's Card Sale",
        link: '',
        number: 6,
      },
      {
        icon: <BarChartIcon fontSize="70px" />,
        title: `${currencySymbol} ${formatAmount(dashboardDetail?.data?.cash_on_hand)}`,
        sub_title: 'Cash on hand',
        link: '',
        number: 7,
      },
      {
        icon: <BarChartIcon fontSize="70px" />,
        title: `${currencySymbol} ${formatAmount(dashboardDetail?.data?.outstanding_payment)}`,
        sub_title: 'Outstanding Payment',
        link: '',
        number: 8,
      },
    ],
    [dashboardDetail]
  );
  return (
    <SectionLoader
      options={[
        dashboardDetail.isLoading,
        currentMonthSale.isLoading,
        saleByMonth.isLoading,
        productCategory.isLoading,
      ]}
    >
      <Helmet>
        <title>Dashboard - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontWeight: 500, fontSize: 19 }}>Dashboard</Typography>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'white',
            marginTop: 0.3,
            borderRadius: 3,
            padding: '1px 8px 15px 1px',
          }}
        >
          {cardsList?.map(card => (
            <Grid key={card.number} item xs={12} sm={6} lg={4} sx={{ width: '100%' }}>
              <DashboardCards card={card} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            marginTop: 0.3,
            borderRadius: 3,
          }}
          className="hide-scrolbar"
        >
          <Grid item xs={12} lg={12} xl={6} className="dashboard-table-left">
            <Stack
              sx={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                marginTop: 0.3,
                borderRadius: 3,
                padding: '20px 20px',
              }}
            >
              <Typography sx={{ fontSize: 19, fontWeight: 500 }}>Sale By Month</Typography>
              <ResponsiveContainer height={180}>
                <BarChart
                  data={[]}
                  margin={{
                    top: 5,
                    left: -55,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar maxBarSize={15} dataKey="Data" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Stack>
          </Grid>
          <DashboardTable
            title="Current Month Sale"
            headCells={currentMonthSalesHeadCells}
            data={currentMonthSale?.data?.results || []}
            className="dashboard-table-right"
          />
          <DashboardTable
            title="Product Category Stock Position"
            headCells={productCategoryStockPositionHeadCells}
            data={productCategory?.data || []}
            className="dashboard-table-left"
          />
          <DashboardTable
            title="Total Receivables"
            headCells={totalReceivablesHeadCells}
            data={totalReceivables?.data?.data || []}
            className="dashboard-table-right"
          />
        </Grid>
      </Box>
    </SectionLoader>
  );
}

export default Dasbboard;
