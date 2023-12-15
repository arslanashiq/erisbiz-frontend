import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import BarChartIcon from '@mui/icons-material/BarChart';

import { Box, Card, Stack, Typography } from '@mui/material';
import {
  dashboardEvenCardStyle,
  dashboardCardChildWrapperStyle,
  dashboardCardStackIconStyle,
  dashboardCardStackLeftStyle,
  dashboardCardStackTitleStyle,
  dashboardOddCardStyle,
  dashboardCardStackSubTitleStyle,
  dashboardCardDetailStackStyle,
  dashboardCardDetailStackTextStyle,
} from 'styles/mui/container/dashboard/components/dashboard-cards';

function DashboardCards({ card }) {
  return (
    <Card sx={card.number % 2 === 0 ? dashboardEvenCardStyle : dashboardOddCardStyle}>
      <Box sx={dashboardCardChildWrapperStyle}>
        <Stack direction="row" sx={dashboardCardStackLeftStyle}>
          {/* {card.icon} */}
          <BarChartIcon sx={dashboardCardStackIconStyle} />
          <Stack alignItems="end">
            <Typography sx={dashboardCardStackTitleStyle}>{card.title}</Typography>
            <Typography sx={dashboardCardStackSubTitleStyle}>{card.sub_title}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" sx={dashboardCardDetailStackStyle}>
          <Link to={card.link}>
            <Typography sx={dashboardCardDetailStackTextStyle}>View Detail</Typography>
          </Link>

          <Link to={card.link}>
            <ArrowCircleRightIcon sx={{ color: 'white' }} />
          </Link>
        </Stack>
      </Box>
    </Card>
  );
}

DashboardCards.propTypes = {
  card: PropTypes.object.isRequired,
};
export default DashboardCards;
