import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import ReportCardItem from './ReportCardItem';

function ReportCard({ cardData }) {
  return (
    <Card sx={{ padding: '10px 0px' }}>
      <Typography sx={{ padding: '5px 20px', fontWeight: 500, fontSize: 18 }}>{cardData.title}</Typography>
      <Divider sx={{ height: 2, backgroundColor: '#000' }} />
      <CardContent>
        {/* <Stack spacing={1}> */}
        {cardData.reports.map(report => (
          <ReportCardItem report={report} />
        ))}
        {/* </Stack> */}
      </CardContent>
    </Card>
  );
}
ReportCard.propTypes = {
  cardData: PropTypes.object.isRequired,
};

export default ReportCard;
