import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetPayableBillDetailsQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { payableBillDetailsReportHeadCells } from 'containers/reports/utilities/head-cells';
// styles
import 'styles/reports/reports.scss';

function BillDetails() {
  const location = useLocation();
  const supplierPayableBalanceResponse = useGetPayableBillDetailsQuery(location.search);
  const { tableBody, totalBillAmount } = useMemo(() => {
    let billAmount = 0;
    const body = [];
    supplierPayableBalanceResponse?.data?.data.forEach(item => {
      billAmount += item.bcy_sales_with_tax_amount;

      body.push([
        { value: item.status, style: { textAlign: 'start' } },
        { value: item.date },
        { value: item.due_date },
        { value: item.formatted_number },
        { value: item.account_name },
        { value: item.bcy_sales_with_tax_amount },
      ]);
    });
    return {
      tableBody: body,
      totalBillAmount: billAmount,
    };
  }, [supplierPayableBalanceResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `AED ${totalBillAmount.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalBillAmount]
  );
  return (
    <SectionLoader options={[supplierPayableBalanceResponse.isLoading]}>
      <Card>
        <CardContent>
          <div className="reports mx-auto">
            <div className="text-center mb-5">
              <h4>Luxury Events and VIP Travel DMCC</h4>
              <h3>AP Aging Details By Bill Date</h3>
            </div>
            <CustomReport
              tableHeader={payableBillDetailsReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default BillDetails;
