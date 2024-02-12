import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
// services
import { useGetBankTransactionsQuery, useGetSingleBankAccountQuery } from 'services/private/banking';
// shared
import MuiTable from 'shared/components/table/MuiTable';
import FilterDropdown from 'shared/components/filters/FilterDropdown';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import formatAmount from 'utilities/formatAmount';
import { bankTransactionsHeadCells } from '../utilities/head-cells';
import { bankTransactionFilterList } from '../utilities/constants';
// components
import BankDetailPopup from './components/BankDetailPopup';

function BankDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // const [activeTab, setActiveTab] = useState('1');
  const [transactionFilter, setTransactionFilter] = useState('this month');
  const [showBankDetailPopup, setShowBankDetailPopup] = useState(false);

  const bankAccountDetail = useGetSingleBankAccountQuery(id);
  const bankTransactionsResponse = useGetBankTransactionsQuery(
    {
      id: bankAccountDetail?.data?.chart_of_account,
      params: {
        duration: transactionFilter,
      },
    },
    { skip: !bankAccountDetail?.data?.chart_of_account }
  );

  // const handleChangeButton = useCallback(e => {
  //   setActiveTab(e.target.value);
  // }, []);
  const handleShowBankDetailPopup = useCallback(() => {
    setShowBankDetailPopup(true);
  }, []);

  const totalCreditDebit = useMemo(
    () => bankTransactionsResponse?.data?.data?.reduce(
      (initialValues, newValues) => ({
        ...initialValues,
        bcy_debit: initialValues.bcy_debit + newValues.bcy_debit,
        bcy_credit: initialValues.bcy_credit + newValues.bcy_credit,
      }),
      { bcy_credit: 0, bcy_debit: 0 }
    ) || { bcy_credit: 0, bcy_debit: 0 },
    [bankTransactionsResponse]
  );
  return (
    <SectionLoader options={[bankAccountDetail.isLoading, bankTransactionsResponse.isLoading]}>
      <BankDetailPopup
        open={showBankDetailPopup}
        setOpen={setShowBankDetailPopup}
        bankDetail={bankAccountDetail.data}
      />
      <Card sx={{ minHeight: '80vh' }}>
        <CardContent>
          <Grid container className="mb-2">
            <Grid item xs={12} md={6}>
              <Typography variant="h5">{bankAccountDetail?.data?.bank_account_name}</Typography>
              <Typography variant="body2">
                Account Number : *****{bankAccountDetail?.data?.account_number?.slice(5)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className="d-flex align-items-center"
              justifyContent={{ xs: 'start', md: 'end' }}
            >
              <Stack direction="row" spacing={2}>
                <Button
                  className="text-capitalize"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </Button>
                <Button className="text-capitalize" onClick={handleShowBankDetailPopup}>
                  <RemoveRedEyeIcon className="me-1" sx={{ fontSize: 18 }} />
                  View Bank Detail
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Grid container className="mb-2">
            <Grid item xs={12} md={6}>
              <Typography variant="body2">Amount</Typography>
              <Typography variant="body1 color-dark font-weight-bold">
                {formatAmount(bankTransactionsResponse?.data?.closing_balance || 0)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className="mb-2 d-flex d-flex justify-content-center">
            <Grid item xs={12} md={10}>
              {/* <ButtonGroup onClick={handleChangeButton}>
                <Button
                  variant={activeTab === '1' ? 'contained' : 'outlined'}
                  value={1}
                  className="text-capitalize"
                >
                  All Transaction
                </Button>
              </ButtonGroup> */}
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              className="d-flex align-items-center"
              justifyContent={{ xs: 'start', md: 'end' }}
            >
              {/* {activeTab === '1' && ( */}
              <Stack direction="row">
                <FilterDropdown
                  className="mt-2 mt-md-0"
                  initialValue={transactionFilter}
                  setFilterValue={setTransactionFilter}
                  filterList={bankTransactionFilterList}
                />
              </Stack>
              {/* )} */}
            </Grid>
          </Grid>

          <MuiTable
            data={bankTransactionsResponse?.isSuccess ? bankTransactionsResponse?.data?.data : []}
            totalDataCount={bankTransactionsResponse?.data?.data.length}
            headCells={bankTransactionsHeadCells}
            tableHeight="50vh"
            customRows={[
              {
                column: [
                  { colSpan: 1 },
                  { data: 'Total Debits and Credits' },
                  { data: formatAmount(totalCreditDebit?.bcy_debit || 0), style: { textAlign: 'right', padding: '10px' } },
                  { data: formatAmount(totalCreditDebit?.bcy_credit || 0), style: { textAlign: 'right', padding: '10px' } },
                  { colSpan: 1 },
                ],
              },
              {
                column: [
                  { colSpan: 1 },
                  { data: 'Closing Balance' },
                  {
                    data: `${formatAmount(
                      (totalCreditDebit?.bcy_debit || 0) - (totalCreditDebit?.bcy_credit || 0) || 0
                    )}`,
                    style: { textAlign: 'right', padding: '10px' },
                  },
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
