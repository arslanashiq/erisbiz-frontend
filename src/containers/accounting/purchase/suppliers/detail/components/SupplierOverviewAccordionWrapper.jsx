import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function SupplierOverviewAccordionWrapper({ title, addNewContactLink, children }) {
  const navigate = useNavigate(0);
  return (
    <Accordion
      sx={{
        boxShadow: 'none',
        backgroundColor: 'transparent',
        borderRadius: '0px !important',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Stack
          direction="row"
          sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>{title}</Typography>
          {addNewContactLink && (
            <Tooltip title="Add Contact Person" arrow placement="top">
              <IconButton
                onClick={() => {
                  navigate(addNewContactLink);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

SupplierOverviewAccordionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  addNewContactLink: PropTypes.string,
};
SupplierOverviewAccordionWrapper.defaultProps = {
  addNewContactLink: '',
};

export default SupplierOverviewAccordionWrapper;
