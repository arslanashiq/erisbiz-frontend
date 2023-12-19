import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

function FormHeader({ title, direction, className }) {
  const navigate = useNavigate();
  return (
    <Stack
      className={`pb-2 ${className}`}
      direction={direction}
      justifyContent="space-between"
      alignItems="center"
    >
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
  title: PropTypes.string,
  direction: PropTypes.string,
  className: PropTypes.string,
};
FormHeader.defaultProps = {
  title: '',
  direction: 'row',
  className: '',
};
export default FormHeader;
