import React, { useState } from 'react';
import { useParams } from 'react-router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button, ButtonGroup, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
// services
import { useGetBankTransactionsQuery, useGetSingleBankAccountQuery } from 'services/private/banking';
// shared
import MuiTable from 'shared/components/table/MuiTable';
import FilterDropdown from 'shared/components/filters/FilterDropdown';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { bankTransactionsHeadCells } from '../utilities/head-cells';
import { bankTransactionFilterList } from '../utilities/constants';
// components
import BankDetailPopup from './components/BankDetailPopup';

function BankDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('1');
  const [transactionFilter, setTransactionFilter] = useState('this month');
  const [showBankDetailPopup, setShowBankDetailPopup] = useState(false);
  const bankAccountDetail = useGetSingleBankAccountQuery(id);

  const bankTransactionsResponse = useGetBankTransactionsQuery({
    id: bankAccountDetail?.data?.chart_of_account,
    params: {
      duration: transactionFilter,
    },
  });
  const handleChangeButton = e => {
    setActiveTab(e.target.value);
  };
  const handleShowBankDetailPopup = () => {
    setShowBankDetailPopup(true);
  };

  return (
    <SectionLoader options={[bankAccountDetail.isLoading, bankTransactionsResponse.isLoading]}>
      <BankDetailPopup
        open={showBankDetailPopup}
        setOpen={setShowBankDetailPopup}
        bankDetail={bankAccountDetail.data}
      />
      <Card sx={{ minHeight: '80vh' }}>
        <CardContent>
          <Grid container sx={{ marginBottom: 2 }}>
            <Grid xs={12} md={6}>
              <Typography variant="h5">{bankAccountDetail?.data?.bank_account_name}</Typography>
              <Typography variant="body2">
                Account Number : *****{bankAccountDetail?.data?.account_number?.slice(5)}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              md={6}
              sx={{ display: 'flex', justifyContent: { xs: 'start', md: 'end' }, alignItems: 'center' }}
            >
              <Stack>
                <Button className="text-capitalize" onClick={handleShowBankDetailPopup}>
                  <RemoveRedEyeIcon sx={{ marginRight: 1, fontSize: 18 }} />
                  View Bank Detail
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Grid container sx={{ marginBottom: 2 }}>
            <Grid xs={12} md={6}>
              <Typography variant="body2">Amount</Typography>
              <Typography variant="body1 color-dark font-weight-bold">AED-140.00</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}>
            <Grid xs={12} md={10}>
              <ButtonGroup onClick={handleChangeButton}>
                <Button
                  variant={activeTab === '1' ? 'contained' : 'outlined'}
                  value={1}
                  className="text-capitalize"
                >
                  All Transaction
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid
              xs={12}
              md={2}
              sx={{ display: 'flex', justifyContent: { xs: 'start', md: 'end' }, alignItems: 'center' }}
            >
              {activeTab === '1' && (
                <FilterDropdown
                  className="mt-2 mt-md-0"
                  initialValue={transactionFilter}
                  setFilterValue={setTransactionFilter}
                  filterList={bankTransactionFilterList}
                />
              )}
            </Grid>
          </Grid>

          <MuiTable
            data={bankTransactionsResponse?.data?.data}
            totalDataCount={bankTransactionsResponse?.data?.data.length}
            headCells={bankTransactionsHeadCells}
            tableHeight="50vh"
            customRows={[
              {
                column: [
                  { colSpan: 1 },
                  { data: 'Total Debits and Credits' },
                  { data: 'AED-140.0' },
                  { colSpan: 2 },
                ],
              },
              {
                column: [
                  { colSpan: 1 },
                  { data: 'Closing Balance' },
                  { data: `AED-${bankTransactionsResponse?.data?.closing_balance}.0` },
                  { colSpan: 2 },
                ],
              },
            ]}
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default BankDetail;
