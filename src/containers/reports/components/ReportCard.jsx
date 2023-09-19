import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import ReportCardItem from './ReportCardItem';

function ReportCard({ cardData }) {
  return (
    <Card sx={{ padding: 0, height: '100%' }}>
      <Typography sx={{ padding: '5px 20px', fontWeight: 500, fontSize: 16 }}>{cardData.title}</Typography>
      <Divider sx={{ height: 2, backgroundColor: '#000' }} />
      <CardContent className="pb-0">
        {/* <Stack spacing={1}> */}
        {cardData.reports.map(report => (
          <ReportCardItem key={uuid()} report={report} />
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
