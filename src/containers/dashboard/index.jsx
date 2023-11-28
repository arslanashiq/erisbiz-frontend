/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import palette from 'styles/mui/theme/palette';
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
        link: '/pages/accounting/sales/sale-invoice',

        number: 2,
      },
      {
        icon: <BarChartIcon fontSize="70px" />,
        title: `${currencySymbol} ${formatAmount(dashboardDetail?.data?.today_cash_sale)}`,
        sub_title: "Today's Cash Sale",
        link: '/pages/accounting/sales/receipt-voucher',
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
        link: '/pages/accounting/sales/receipt-voucher',
        number: 6,
      },
      {
        icon: <BarChartIcon fontSize="70px" />,
        title: `${currencySymbol} ${formatAmount(dashboardDetail?.data?.cash_on_hand)}`,
        sub_title: 'Cash on hand',
        link: '/pages/accounting/finance/chart-of-account',
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

  const graphData = useMemo(() => {
    if (saleByMonth?.data) {
      return Object.keys(saleByMonth?.data).map(key => ({
        name: key.slice(0, 3),
        [currencySymbol]: saleByMonth?.data[key],
        amt: saleByMonth?.data[key],
      }));
    }
    return [];
  }, [saleByMonth]);
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
      <Box sx={{ flexGrow: 1, marginBottom: 4, margin: 'auto 20px 20px 20px' }}>
        <Typography sx={{ fontWeight: 700, fontSize: 19 }}>Dashboard</Typography>
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
              <Typography sx={{ fontSize: 19, fontWeight: 500 }}>Sales by Month</Typography>
              <ResponsiveContainer height={250}>
                <BarChart
                  width={500}
                  height={300}
                  data={graphData}
                  margin={{
                    top: 20,
                    right: 40,
                  }}
                >
                  <CartesianGrid strokeDasharray="0" />
                  <XAxis dataKey="name" />
                  <YAxis st />
                  <Tooltip />
                  <Bar maxBarSize={15} dataKey={currencySymbol} fill={palette.primary.main} />
                </BarChart>
              </ResponsiveContainer>
            </Stack>
          </Grid>
          <DashboardTable
            title="Current Month Sales"
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
