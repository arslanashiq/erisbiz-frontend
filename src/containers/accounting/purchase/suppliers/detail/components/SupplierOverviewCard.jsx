import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { DEFAULT_IMG } from 'utilities/constants';
import SupplierAddress from './SupplierAddress';
import SupplierOtherInfo from './SupplierOtherInfo';
import useSupplierDetail from '../../utils/custom-hooks/useSupplierDetail';
import SupplierContactPerson from './SupplierContactPerson';

function SupplierOverviewCard({ supplierDetail }) {
  const { address, otherInfo, contactPerson } = useSupplierDetail(supplierDetail);
  return (
    <Card sx={{ borderRadius: 0, boxShadow: 'none', backgroundColor: '#FBFAFA', height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography>{supplierDetail?.supplier_name}</Typography>
          <Divider sx={{ height: 1, backgroundColor: 'black' }} />
          <Avatar sx={{ height: 100, width: 100 }} src={DEFAULT_IMG} />
        </Stack>
        <Box sx={{ marginTop: 2 }}>
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
