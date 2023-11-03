import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardCards from './components/DashboardCards';
import 'styles/dashboard/dashboard.scss';

const cardsList = [
  {
    icon: <BarChartIcon fontSize="70px" />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 2,
  },
  {
    icon: <BarChartIcon fontSize="70px" />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 3,
  },
  {
    icon: <BarChartIcon fontSize="70px" />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 4,
  },
  {
    icon: <BarChartIcon fontSize="70px" />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 6,
  },
  {
    icon: <BarChartIcon fontSize="70px" />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 7,
  },
  {
    icon: <BarChartIcon fontSize="70px" />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 8,
  },
];
function Dasbboard() {
  return (
    <>
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
          {cardsList.map(card => (
            <Grid key={card.number} item xs={12} sm={6} lg={4} sx={{ width: '100%' }}>
              <DashboardCards card={card} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Dasbboard;
