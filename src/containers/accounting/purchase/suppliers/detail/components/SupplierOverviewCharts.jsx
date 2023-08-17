import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

function SupplierOverviewCharts({ graphData }) {
  return (
    <Grid sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 4, paddingBottom: 3 }}>
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
          <Bar maxBarSize={15} dataKey="CNH" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Grid>
  );
}
SupplierOverviewCharts.propTypes = {
  graphData: PropTypes.array.isRequired,
};

export default SupplierOverviewCharts;
