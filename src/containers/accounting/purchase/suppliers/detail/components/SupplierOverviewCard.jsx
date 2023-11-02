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
import useSupplierDetail from '../../utilities/custom-hooks/useSupplierDetail';

import SupplierAddress from './SupplierAddress';
import SupplierOtherInfo from './SupplierOtherInfo';
import SupplierContactPerson from './SupplierContactPerson';

function SupplierOverviewCard({ supplierDetail }) {
  const { address, otherInfo, contactPerson } = useSupplierDetail(supplierDetail);
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
};
SupplierOverviewCard.defaultProps = {
  supplierDetail: {},
};
export default SupplierOverviewCard;
