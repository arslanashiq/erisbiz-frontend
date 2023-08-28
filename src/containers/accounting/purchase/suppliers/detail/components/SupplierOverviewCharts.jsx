/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Typography } from '@mui/material';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import ActionMenu from 'shared/components/action-menu/ActionMenu';

function SupplierOverviewCharts({ supplierDetail, supplierIncome, activityLogDuration, handleClickMenu }) {
  const currencySymbol = supplierDetail?.currency_symbol ? supplierDetail?.currency_symbol : 'AED';
  const graphData = supplierIncome
    ? supplierIncome.map(item => ({
        name: `${item.month} ${item.year}`,
        [currencySymbol]: item.income,
        amt: item.income,
      }))
    : [];
  return (
    <Grid sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 4, paddingBottom: 3 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography>Expenses</Typography>

        <ActionMenu
          buttonTitle={activityLogDuration}
          variant="outlined"
          actionsList={[
            { label: 'This Fiscal Year', handleClick: handleClickMenu },
            { label: 'Last 12 Month', handleClick: handleClickMenu },
            { label: 'Last 6 month', handleClick: handleClickMenu },
          ]}
        />
      </Stack>
      <ResponsiveContainer height={300}>
        <BarChart
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 20,
            right: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar maxBarSize={15} dataKey={currencySymbol} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Grid>
  );
}
SupplierOverviewCharts.propTypes = {
  supplierDetail: PropTypes.object,
  activityLogDuration: PropTypes.string.isRequired,
  supplierIncome: PropTypes.array.isRequired,
  handleClickMenu: PropTypes.func.isRequired,
};
SupplierOverviewCharts.defaultProps = {
  supplierDetail: {},
};

export default SupplierOverviewCharts;
