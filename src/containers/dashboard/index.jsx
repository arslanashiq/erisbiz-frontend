/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
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
  const currencySymbol = useSelector(state => state?.user?.company?.currency_detail?.currency_symbol);

  const totalReceivablesValue = useMemo(() => {
    const receivablesData = totalReceivables?.data?.data;
    if (!receivablesData) {
      return [];
    }
    const saleInvoiceData = [];
    receivablesData?.sale_invoices?.map(saleInvoice =>
      saleInvoice?.invoices?.forEach(sale => {
        saleInvoiceData.push({
          date: sale?.date,
          payer_name: saleInvoice?.name,
          payment_num: sale?.invoice_formatted_number,
          amount_total: sale?.without_change_grand_total,
          amount_due: sale?.amount_due,
          status: sale?.status,
          payer_link: `/pages/accounting/sales/customers/${saleInvoice?.id}/detail`,
          payment_link: `/pages/accounting/sales/sale-invoice/${sale?.id}/detail`,
        });
      })
    );
    const saleCreditNotesData = [];
    receivablesData?.sale_credit_notes?.map(saleCreditNote =>
      saleCreditNote?.credit_notes?.forEach(credit => {
        saleCreditNotesData.push({
          date: credit?.date,
          payer_name: saleCreditNote?.name,
          payment_num: credit?.credit_note_formatted_number,
          amount_total: credit?.without_change_grand_total,
          amount_due: (credit?.without_change_grand_total || 0) - (credit?.refunded_amount || 0),
          status: credit?.status,
          payer_link: `/pages/accounting/sales/customers/${saleCreditNote?.id}/detail`,
          payment_link: `/pages/accounting/sales/credit-notes/${credit?.id}/detail`,
        });
      })
    );
    const purchaseDebitNoteData = [];
    receivablesData?.purchase_debit_notes?.forEach(purchaseDebitNote => {
      purchaseDebitNoteData.push({
        date: purchaseDebitNote?.supplier_credit_date,
        payer_name: purchaseDebitNote?.supplier_name,
        payment_num: purchaseDebitNote?.supplier_credit_formatted_number,
        amount_total: purchaseDebitNote?.without_change_grand_total,
        amount_due: purchaseDebitNote?.credits_remaining_debitnote_currency || 0,
        status: purchaseDebitNote?.status,
        payer_link: `/pages/accounting/purchase/suppliers/${purchaseDebitNote?.supplier_id}/detail`,
        payment_link: `/pages/accounting/purchase/debit-notes/${purchaseDebitNote?.id}/detail`,
      });
    });
    return [...saleInvoiceData, ...saleCreditNotesData, ...purchaseDebitNoteData];
  }, [totalReceivables]);
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
      <Box sx={{ flexGrow: 1, margin: 'auto auto auto 15px' }}>
        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Dashboard</Typography>
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
          <Grid item xs={12} xl={6} className="dashboard-table-left">
            <Stack
              sx={{
                height: 310,
                width: '100%',
                backgroundColor: 'white',
                marginTop: 0.3,
                borderRadius: 3,
                padding: '20px 20px 0px 20px',
              }}
            >
              <Typography sx={{ fontSize: 19, fontWeight: 500, marginBottom: 1 }}>Sales by Month</Typography>
              <ResponsiveContainer height={245}>
                <BarChart
                  data={graphData}
                  margin={{
                    left: -6,
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
            data={totalReceivablesValue || []}
            className="dashboard-table-right"
          />
        </Grid>
      </Box>
    </SectionLoader>
  );
}

export default Dasbboard;
