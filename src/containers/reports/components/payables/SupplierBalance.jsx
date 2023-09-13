import React from 'react';
import { Card, CardContent } from '@mui/material';
// services
import { useGetSupplierPayableBalanceQuery } from 'services/private/reports';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// components
import CustomReport from './CustomReport';
// styles
import 'styles/reports/reports.scss';

function SupplierBalance() {
  const supplierPayableBalanceResponse = useGetSupplierPayableBalanceQuery();
  return (
    <SectionLoader options={[supplierPayableBalanceResponse.isLoading]}>
      <Card>
        <CardContent>
          <div className="reports mx-auto">
            <div className="text-center mb-5">
              <h4>Luxury Events and VIP Travel DMCC</h4>
              <h3>Supplier Balances</h3>
            </div>
            <CustomReport />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default SupplierBalance;
