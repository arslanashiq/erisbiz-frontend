import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';

function QuotationStatusChange({ handleApprove, handleDecline }) {
  return (
    <Stack alignItems="center">
      <Stack maxWidth={900} width="100%" spacing={2} direction="row-reverse" alignItems="end">
        <Button onClick={handleDecline}>Decline</Button>
        <Button onClick={handleApprove}>Approve</Button>
      </Stack>
    </Stack>
  );
}

QuotationStatusChange.propTypes = {
  handleApprove: PropTypes.func.isRequired,
  handleDecline: PropTypes.func.isRequired,
};
export default QuotationStatusChange;
