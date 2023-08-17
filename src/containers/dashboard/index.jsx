import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardCards from './components/DashboardCards';
import 'styles/dashboard.scss';

const cardsList = [
  {
    icon: <BarChartIcon sx={{ fontSize: 70 }} />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 2,
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 70 }} />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 3,
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 70 }} />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 4,
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 70 }} />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 6,
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 70 }} />,
    title: 'AED 183.75',
    sub_title: "Today's Sale",
    link: '',
    number: 7,
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 70 }} />,
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
            <DashboardCards card={card} />
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Dasbboard;
