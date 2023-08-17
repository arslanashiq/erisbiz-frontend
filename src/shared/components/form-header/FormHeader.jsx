import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

function FormHeader({ title }) {
  const navigate = useNavigate();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6">{title}</Typography>
      <Button
        className="text-capitalize"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </Stack>
  );
}
FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
export default FormHeader;
