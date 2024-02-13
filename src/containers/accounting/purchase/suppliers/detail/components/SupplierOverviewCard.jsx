import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material';
// components and styles
import {
  supplierCardAvatarStyle,
  supplierCardDividerStyle,
  supplierCardStyle,
} from 'styles/mui/container/accounting/purchase/supplier/detail/components/supplier-overview-card';
import { DEFAULT_IMG } from 'utilities/constants';

import SupplierAddress from './SupplierAddress';
import SupplierOtherInfo from './SupplierOtherInfo';
import SupplierContactPerson from './SupplierContactPerson';

function SupplierOverviewCard({ supplierDetail, useDetailHook, addNewContactLink }) {
  const { address, otherInfo, contactPerson } = useDetailHook(supplierDetail);
  return (
    <Card sx={supplierCardStyle}>
      <Stack spacing={2} pl={1}>
        <Typography>{supplierDetail?.supplier_name || supplierDetail?.customer_name}</Typography>
        <Divider sx={supplierCardDividerStyle} />
        <Avatar sx={supplierCardAvatarStyle} src={DEFAULT_IMG} />
      </Stack>
      <Box mt={2}>
        <SupplierAddress address={address} />
        <SupplierOtherInfo otherInfo={otherInfo} />
        <SupplierContactPerson addNewContactLink={addNewContactLink} contactPerson={contactPerson} />
      </Box>
    </Card>
  );
}
SupplierOverviewCard.propTypes = {
  supplierDetail: PropTypes.object,
  useDetailHook: PropTypes.func,
  addNewContactLink: PropTypes.string,
};
SupplierOverviewCard.defaultProps = {
  supplierDetail: {},
  useDetailHook: () => ({ address: {}, otherInfo: {}, contactPerson: {} }),
  addNewContactLink: '',
};
export default SupplierOverviewCard;
