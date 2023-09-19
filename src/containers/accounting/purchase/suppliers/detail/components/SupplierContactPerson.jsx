import React from 'react';
import PropTypes from 'prop-types';
import EmailIcon from '@mui/icons-material/Email';
import { Avatar, Stack, Typography } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// components
import SupplierOverviewAccordionWrapper from './SupplierOverviewAccordionWrapper';

const IconStyle = { height: 15, width: 15, mr: 1 };
function SupplierContactPerson({ contactPerson }) {
  return (
    <SupplierOverviewAccordionWrapper title={`Contact Person Details (${contactPerson.length})`} showIcon>
      <div className="row supplier-overview-wrapper">
        {contactPerson.map(contact => (
          <Stack key={contact.email} spacing={2} direction="row" alignItems="start" justifyContent="start">
            <Avatar src={contact.image} />
            <Stack>
              <Typography>{`${contact.name} (${contact.designation})`}</Typography>
              <Typography>
                <EmailIcon sx={IconStyle} />
                {contact.email}
              </Typography>
              <Typography>
                <PhoneAndroidIcon sx={IconStyle} />
                {contact.mobile_num}
              </Typography>
              {/* <Typography>{contact.notes}</Typography> */}
            </Stack>
          </Stack>
        ))}
      </div>
    </SupplierOverviewAccordionWrapper>
  );
}
SupplierContactPerson.propTypes = {
  contactPerson: PropTypes.array.isRequired,
};

export default SupplierContactPerson;
