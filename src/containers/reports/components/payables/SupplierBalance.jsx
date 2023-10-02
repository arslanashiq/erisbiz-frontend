import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetSupplierPayableBalanceQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { supplierPaybleBalanceReportHeadCells } from 'containers/reports/utilities/head-cells';
// styles
import 'styles/reports/reports.scss';
import ReportsHeader from '../ReportsHeader';

function SupplierBalance() {
  const location = useLocation();
  const supplierPayableBalanceResponse = useGetSupplierPayableBalanceQuery(location.search);
  const { tableBody, totalBalance } = useMemo(() => {
    let balance = 0;
    const body = [];
    supplierPayableBalanceResponse?.data?.data.forEach(item => {
      balance += item.balance_bcy;
      body.push([
        { value: item.supplier__supplier_name, style: { textAlign: 'start' } },
        { value: item.bill_balance },
        { value: item.credit_balance },
        { value: item.balance_bcy },
      ]);
    });
    return { tableBody: body, totalBalance: balance };
  }, [supplierPayableBalanceResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: `AED ${totalBalance.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalBalance]
  );
  return (
    <SectionLoader options={[supplierPayableBalanceResponse.isLoading]}>
      <ReportsHeader tableHeader={supplierPaybleBalanceReportHeadCells} />
      <Card>
        <CardContent>
          <div className="reports mx-auto">
            <div className="text-center mb-5">
              <h4>Luxury Events and VIP Travel DMCC</h4>
              <h3>Supplier Balances</h3>
            </div>
            <CustomReport
              tableHeader={supplierPaybleBalanceReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default SupplierBalance;
