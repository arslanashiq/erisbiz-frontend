import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import globalize from 'globalize';
import 'styles/calender/calender.scss';

const localizer = globalizeLocalizer(globalize);

function CalenderPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>My Calender</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={10}>
        <Card>
          <CardContent>
            <Calendar
              localizer={localizer}
              //   events={myEventsList}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={2}>
        <Card>
          <CardContent>
            <p className="typography-message">
              <span className="calendar-label calender-label--golden" />
              123
            </p>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CalenderPage;
