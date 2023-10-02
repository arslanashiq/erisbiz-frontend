import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Card, CardContent, IconButton, Tooltip } from '@mui/material';
// services
import {
  useDeleteTaxReturnPaymentMutation,
  useGetTaxReturnListQuery,
  useGetTaxReturnPaymentsListQuery,
} from 'services/private/tax-returns';
// shared
import InfoPopup from 'shared/modals/InfoPopup';
import MuiTable from 'shared/components/table/MuiTable';
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
// utilities
import { taxReturnsHeadCell, taxReturnsPaymentsHeadCell } from '../utilities/head-cells';
import AddTaxPaymentsModal from './components/AddTaxPaymentsModal';

function TaxReturnListing() {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [activeTab, setActiveTab] = useState(0);
  const [paymentId, setPaymentId] = useState('');
  const [selectedTax, setSelectedTax] = useState({});
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    showActionButton: true,
    infoDescription: 'Are you sure you want to delete Payment?',
  });
  const [addTaxPaymentModal, setAddTaxPaymentModal] = useState(false);

  const TaxReturnsResponse = useGetTaxReturnListQuery(location.search);
  const TaxReturnsPaymentsResponse = useGetTaxReturnPaymentsListQuery(location.search);

  const [deletePayment] = useDeleteTaxReturnPaymentMutation();

  const handleCloseModal = () => {
    setAddTaxPaymentModal(false);
  };
  const handleCloseDeletePopup = () => {
    setOpenInfoPopup({ ...openInfoPopup, open: false });
  };
  const handleDeleteItem = async () => {
    await deletePayment(paymentId);
    enqueueSnackbar('Purchase Order Deleted', { variant: 'success' });
    handleCloseDeletePopup();
  };

  return (
    <SectionLoader options={[TaxReturnsResponse.isLoading, TaxReturnsPaymentsResponse.isLoading]}>
      <Helmet>
        <title>Tax Return - ErisBiz</title>
        <meta name="description" content="ErisBiz" />
      </Helmet>
      <AddTaxPaymentsModal
        open={addTaxPaymentModal}
        handleClose={handleCloseModal}
        selectedTax={selectedTax}
      />
      <InfoPopup
        open={openInfoPopup.open}
        showActionButton={openInfoPopup.showActionButton}
        handleClose={handleCloseDeletePopup}
        handleYes={handleDeleteItem}
        infoDescription={openInfoPopup.infoDescription}
      />
      <Card>
        <CardContent>
          <DetailTabsWrapper
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabsList={['TAX DUES', 'PAYMENT HISTORY']}
          >
            {activeTab === 0 && (
              <MuiTable
                data={TaxReturnsResponse?.data?.results}
                totalDataCount={TaxReturnsResponse?.data?.count}
                headCells={taxReturnsHeadCell}
                customActionButton={[
                  {
                    title: 'Actions',
                    handleClick: selectedTaxId => {
                      const selectedTaxDetail = TaxReturnsResponse.data.results.filter(
                        tax => tax.id === selectedTaxId
                      );
                      setSelectedTax(selectedTaxDetail[0]);
                      setAddTaxPaymentModal(true);
                    },
                    element: <Button>Record Payment</Button>,
                  },
                ]}
              />
            )}
            {activeTab === 1 && (
              <MuiTable
                data={TaxReturnsPaymentsResponse?.data?.results}
                totalDataCount={TaxReturnsResponse?.data?.count}
                headCells={taxReturnsPaymentsHeadCell}
                customActionButton={[
                  {
                    title: 'Actions',
                    handleClick: selectedPaymentId => {
                      setPaymentId(selectedPaymentId.transaction_num);
                      setOpenInfoPopup({ ...openInfoPopup, open: true });
                    },
                    element: (
                      <Tooltip title="Delete Payment" placement="top" arrow>
                        <IconButton>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    ),
                  },
                ]}
              />
            )}
          </DetailTabsWrapper>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default TaxReturnListing;
