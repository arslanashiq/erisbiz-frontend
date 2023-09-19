import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetPurchaseOrderDetailQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { payablePurchaseOrderDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
// styles
import 'styles/reports/reports.scss';

function PurchaseOrderDetail() {
  const location = useLocation();
  const supplierPayableBalanceResponse = useGetPurchaseOrderDetailQuery(location.search);
  const { tableBody, totalBalance } = useMemo(() => {
    let balance = 0;
    const body = [];
    supplierPayableBalanceResponse?.data?.data.forEach(item => {
      balance += item.amount;
      body.push([
        { value: item.status, style: { textAlign: 'start' } },
        { value: item.pur_order_date },
        { value: item.pur_order_formatted_number },
        { value: item.supplier__supplier_name },
        { value: item.amount },
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
      <Card>
        <CardContent>
          <div className="reports mx-auto">
            <div className="text-center mb-5">
              <h4>Luxury Events and VIP Travel DMCC</h4>
              <h3>Supplier Balances</h3>
            </div>
            <CustomReport
              tableHeader={payablePurchaseOrderDetailReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default PurchaseOrderDetail;
