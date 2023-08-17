import React from 'react';
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import SupplierAddress from './SupplierAddress';
import SupplierOtherInfo from './SupplierOtherInfo';

function SupplierOverviewCard() {
  return (
    <Card sx={{ borderRadius: 0, boxShadow: 'none', backgroundColor: '#FBFAFA', height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography>Supplier Name</Typography>
          <Divider sx={{ height: 1, backgroundColor: 'black' }} />
          <Avatar
            sx={{ height: 100, width: 100 }}
            src="https://stagingcrm.beyonderissolutions.com/img/avatar.png"
          />
        </Stack>
        <Box sx={{ marginTop: 2 }}>
          <SupplierAddress address="albania" />
          <SupplierOtherInfo
            otherInfo={[
              { label: 'Supplier ID', value: '123' },
              { label: 'Currency Code', value: 'CNH' },
              { label: 'Credit Days', value: 'Net 0' },
              { label: 'Tax Treatment', value: 'Non GCC' },
              { label: 'Source of Supply', value: 'Albania' },
            ]}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default SupplierOverviewCard;
