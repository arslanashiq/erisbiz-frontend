import React from 'react';
import { PropTypes } from 'prop-types';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import BarChartIcon from '@mui/icons-material/BarChart';

import { Box, Card, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function DashboardCards({ card }) {
  return (
    <Card
      sx={{
        backgroundColor: card.number % 2 === 0 ? '#08517e' : 'grey',
        color: 'white',
        borderRadius: 4,
      }}
    >
      <Box sx={{ padding: '10px 20px 12px 10px' }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'start' }}>
          {/* {card.icon} */}
          <BarChartIcon sx={{ fontSize: 50 }} />
          <Stack sx={{ alignItems: 'end' }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{card.title}</Typography>
            <Typography sx={{ fontSize: 11, fontWeight: 400 }}>{card.sub_title}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ marginTop: 2, justifyContent: 'space-between', alignItems: 'end' }}>
          <Link to={card.link}>
            <Typography sx={{ color: 'white', fontSize: 11, cursor: 'pointer', textDecoration: 'underline' }}>
              View Detail
            </Typography>
          </Link>

          <ArrowCircleRightIcon />
        </Stack>
      </Box>
    </Card>
  );
}

DashboardCards.propTypes = {
  card: PropTypes.object.isRequired,
};
export default DashboardCards;
