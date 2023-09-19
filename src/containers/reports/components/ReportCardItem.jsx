import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

function ReportCardItem({ report }) {
  const navigate = useNavigate();
  return (
    <Stack direction="row" className="justify-content-between align-items-center mb-2">
      <Typography sx={{ fontSize: 12 }}>{report.label}</Typography>
      <Button
        onClick={() => {
          navigate(report.link);
        }}
        className="text-capitalize"
        sx={{ padding: '1px 10px', fontSize: 12 }}
      >
        Go
      </Button>
    </Stack>
  );
}
ReportCardItem.propTypes = {
  report: PropTypes.object.isRequired,
};
export default ReportCardItem;
