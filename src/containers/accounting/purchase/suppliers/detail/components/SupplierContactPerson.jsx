import React from 'react';
import PropTypes from 'prop-types';
import EmailIcon from '@mui/icons-material/Email';
import { Avatar, Divider, Stack, Typography } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// components
import { supplierCardDividerStyle } from 'styles/mui/container/accounting/purchase/supplier/detail/components/supplier-overview-card';
import SupplierOverviewAccordionWrapper from './SupplierOverviewAccordionWrapper';

const IconStyle = { height: 15, width: 15, mr: 1 };
function SupplierContactPerson({ contactPerson, addNewContactLink }) {
  return (
    <SupplierOverviewAccordionWrapper
      addNewContactLink={addNewContactLink}
      title={`Contact Person (${contactPerson.length})`}
      showIcon
    >
      <div className="row supplier-overview-wrapper">
        {contactPerson.map((contact, index) => (
          <>
            {index > 0 && <Divider sx={supplierCardDividerStyle} />}

            <Stack
              key={contact.email}
              spacing={2}
              direction="row"
              alignItems="start"
              justifyContent="start"
              sx={index === 0 ? { paddingBottom: 2 } : { paddingTop: 2 }}
            >
              <Avatar src={contact.image} />
              <Stack>
                <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>
                  {contact.name} ({contact.designation})
                </Typography>
                <Typography sx={{ fontSize: 13 }}>
                  <EmailIcon sx={IconStyle} />
                  {contact.email}
                </Typography>
                <Typography sx={{ fontSize: 13 }}>
                  <PhoneAndroidIcon sx={IconStyle} />
                  {contact.mobile_num}
                </Typography>
                {/* <Typography>{contact.notes}</Typography> */}
              </Stack>
            </Stack>
          </>
        ))}
      </div>
    </SupplierOverviewAccordionWrapper>
  );
}
SupplierContactPerson.propTypes = {
  addNewContactLink: PropTypes.string.isRequired,
  contactPerson: PropTypes.array.isRequired,
};

export default SupplierContactPerson;
