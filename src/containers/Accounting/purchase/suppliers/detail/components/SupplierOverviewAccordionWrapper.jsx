import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

function SupplierOverviewAccordionWrapper({ title, children }) {
  return (
    <Accordion
      sx={{
        boxShadow: 'none',
        backgroundColor: 'transparent',
        borderRadius: '0px !important',
        borderBottom: 1,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

SupplierOverviewAccordionWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default SupplierOverviewAccordionWrapper;
