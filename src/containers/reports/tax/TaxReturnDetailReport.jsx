import React, { useState } from 'react';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RibbonContainer, Ribbon } from 'react-ribbons';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useChangeTaxReturnStatusMutation, useGetTaxReturnDetailQuery } from 'services/private/reports';
import FormHeader from 'shared/components/form-header/FormHeader';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import TaxReturnDetailTable from './components/TaxReturnDetailTable';
import {
  taxReturnDetailTableHeadCells,
  taxReturnDetailTableHeadCellsWithoutTablableAmount,
} from '../utilities/head-cells';
import {
  vatReturnDetailTable1Body,
  vatReturnDetailTable2Body,
  vatReturnDetailTable3Body,
} from '../utilities/vat-return-detail-table';
import ChangeTaxReturnStatus from './components/ChangeTaxReturnStatus';

function TaxReturnDetailReport() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const { name: companyName } = useSelector(state => state.user.company);

  const [openPopup, setOpenPopup] = useState(false);

  const taxResturnDetailResponse = useGetTaxReturnDetailQuery(id);
  const [changeTaxReturnStatus] = useChangeTaxReturnStatusMutation();

  const handleClick = () => {
    setOpenPopup(true);
  };
  const changeStatus = async (values, { setErrors }) => {
    const response = await changeTaxReturnStatus({ id, payload: values });
    if (response.error) {
      enqueueSnackbar(response.error.data.Message, { variant: 'error' });
      if (setErrors) setErrors(response.error.data);
      return true;
    }
    setOpenPopup(false);
    return true;
  };
  const isFiled = taxResturnDetailResponse?.data?.status === 'filed' || false;
  return (
    <SectionLoader options={[taxResturnDetailResponse.isLoading]}>
      <ChangeTaxReturnStatus
        open={openPopup}
        setOpen={setOpenPopup}
        handleSubmit={changeStatus}
        status={isFiled}
      />
      <FormHeader direction="row-reverse" title="" className="mb-3" />

      <RibbonContainer>
        <Ribbon
          side="left"
          type="edge"
          size="normal"
          backgroundColor={isFiled ? '#50A150' : '#f59d00'}
          color="#ffffff"
          withStripes
        >
          {isFiled ? 'Filed' : 'Unfiled'}
        </Ribbon>
        <Card>
          <CardContent>
            <Card className="mt-5">
              <CardContent>
                <Grid container className="tax-return-detail" padding="0px 30px">
                  <Grid item xs={6} md={4}>
                    <Stack spacing={1}>
                      <Typography>Tax Period :</Typography>

                      {isFiled && <Typography>Date of Filing :</Typography>}
                      <Typography>Tax Basis :</Typography>
                      <Typography>Due Date :</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Stack spacing={1}>
                      <Typography>
                        {moment(taxResturnDetailResponse?.data?.start_date).format(DATE_FILTER_REPORT)}-
                        {moment(taxResturnDetailResponse?.data?.end_date).format(DATE_FILTER_REPORT)}
                      </Typography>
                      {isFiled && (
                        <Typography>
                          {moment(taxResturnDetailResponse?.data?.filed_on).format(DATE_FILTER_REPORT)}
                        </Typography>
                      )}
                      <Typography>Accural</Typography>
                      <Typography>
                        {moment(taxResturnDetailResponse?.data?.due_date).format(DATE_FILTER_REPORT)}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4} display="flex" justifyContent="end" alignItems="center">
                    <Button onClick={handleClick}>{isFiled ? 'Mark as Unflie' : 'Mark as Filed'}</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Stack width="100%" justifyContent="center" textAlign="center" marginTop={5}>
              <Typography fontSize={24}>{companyName}</Typography>
              <Typography>
                {moment(taxResturnDetailResponse?.data?.start_date).format(DATE_FILTER_REPORT)}-
                {moment(taxResturnDetailResponse?.data?.end_date).format(DATE_FILTER_REPORT)}
              </Typography>
            </Stack>
            <TaxReturnDetailTable
              taxReturnResponse={taxResturnDetailResponse?.data}
              mainTitle="VAT on Expenses and all other Inputs"
              headCells={taxReturnDetailTableHeadCells}
              tableBody={vatReturnDetailTable1Body}
            />
            <TaxReturnDetailTable
              taxReturnResponse={taxResturnDetailResponse?.data}
              mainTitle="VAT on Expenses and all other Inputs"
              headCells={taxReturnDetailTableHeadCells}
              tableBody={vatReturnDetailTable2Body}
            />
            <TaxReturnDetailTable
              taxReturnResponse={taxResturnDetailResponse?.data}
              mainTitle="Net VAT due"
              headCells={taxReturnDetailTableHeadCellsWithoutTablableAmount}
              tableBody={vatReturnDetailTable3Body}
              tableStyles={{ maxWidth: 900 }}
            />
          </CardContent>
        </Card>
      </RibbonContainer>
    </SectionLoader>
  );
}

export default TaxReturnDetailReport;
