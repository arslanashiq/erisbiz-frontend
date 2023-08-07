import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

function ReportCardItem({ report }) {
  const navigate = useNavigate(0);
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{report.label}</Typography>
        <Button
          onClick={() => {
            navigate(report.link);
          }}
          className="text-capitalize"
          sx={{ padding: '1px 14px' }}
        >
          Go
        </Button>
      </Stack>
      <Typography sx={{ fontSize: 11, paddingBottom: 1.5, paddingRight: 10 }}>
        Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.
      </Typography>
    </>
  );
}
ReportCardItem.propTypes = {
  report: PropTypes.object.isRequired,
};
export default ReportCardItem;
