import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
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

function SupplierOverviewCard({ supplierDetail, useDetailHook }) {
  const { address, otherInfo, contactPerson } = useDetailHook(supplierDetail);
  return (
    <Card sx={supplierCardStyle}>
      <CardContent>
        <Stack spacing={2}>
          <Typography>{supplierDetail?.supplier_name}</Typography>
          <Divider sx={supplierCardDividerStyle} />
          <Avatar sx={supplierCardAvatarStyle} src={DEFAULT_IMG} />
        </Stack>
        <Box mt={2}>
          <SupplierAddress address={address} />
          <SupplierOtherInfo otherInfo={otherInfo} />
          <SupplierContactPerson contactPerson={contactPerson} />
        </Box>
      </CardContent>
    </Card>
  );
}
SupplierOverviewCard.propTypes = {
  supplierDetail: PropTypes.object,
  useDetailHook: PropTypes.func,
};
SupplierOverviewCard.defaultProps = {
  supplierDetail: {},
  useDetailHook: () => ({ address: {}, otherInfo: {}, contactPerson: {} }),
};
export default SupplierOverviewCard;
