import { Card, CardContent, Grid } from '@mui/material';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
// services
import {
  useChangeSaleInvoiceStatusToSentMutation,
  useChangeSaleInvoiceStatusToVoidMutation,
  useDeleteSaleInvoiceDocumentsMutation,
  useDeleteSaleInvoiceMutation,
  useGetSaleInvoiceJournalsQuery,
  useGetSingleSaleInvoiceQuery,
  useUploadSaleInvoiceDocumentsMutation,
} from 'services/private/sale-invoice';
// shared
import JournalTable from 'shared/components/accordion/JournalTable';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import OrderDocument from 'shared/components/order-document/OrderDocument';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import ChangeStatusToVoid from 'containers/accounting/purchase/purchase-invoice/detail/components/ChangeStatusToVoidModal';
// utilities
import { DATE_FORMAT_PRINT } from 'utilities/constants';

const keyValue = 'invoice_items';
function SaleInvoiceDetailPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });
  const [openVoidModal, setOpenVoidModal] = useState(false);
  const saleInvoiceDetailResponse = useGetSingleSaleInvoiceQuery(id);
  const saleInvoiceJournalsResponse = useGetSaleInvoiceJournalsQuery(id);
  const [changeStatusToSent] = useChangeSaleInvoiceStatusToSentMutation();
  const [changeStatusToVoid] = useChangeSaleInvoiceStatusToVoidMutation();

  const handleChangeStatus = async (changeInvoiceStatus, payload, successMessage) => {
    const response = await changeInvoiceStatus(payload);
    if (response.error) {
      enqueueSnackbar('Somthing went wrong', {
        variant: 'error',
      });
      return false;
    }
    enqueueSnackbar(successMessage, {
      variant: 'success',
    });
    return true;
  };
  const handleChangeStatusToVoid = async values => {
    const { reason } = values;
    await handleChangeStatus(changeStatusToVoid, { id, reason }, 'Invoice status change to Void');
    setOpenVoidModal(false);
  };
  const orderInfo = useMemo(
    () => ({
      type: 'Sales Invoice',
      order_number: `#${saleInvoiceDetailResponse?.data?.invoice_formatted_number}`,
      formated_order_number: saleInvoiceDetailResponse?.data?.invoice_num,
      date: saleInvoiceDetailResponse?.data?.date,
      supplier: null,
      location: saleInvoiceDetailResponse?.data?.location,
      box1: [
        {
          label: 'Invoice No',
          value: saleInvoiceDetailResponse?.data?.quotation_formatted_number,
        },
        {
          label: 'Invoice Date',
          value: moment(saleInvoiceDetailResponse?.data?.quotation_num).format(DATE_FORMAT_PRINT),
        },
        {
          label: 'Location',
          value: saleInvoiceDetailResponse?.data?.location,
        },
        {
          label: 'Currency',
          value: saleInvoiceDetailResponse?.data?.location,
        },
      ],
      box2: [
        {
          label: 'Customer',
          value: saleInvoiceDetailResponse?.data?.customer_info?.customer_name,
        },
        {
          label: 'Country',
          value: saleInvoiceDetailResponse?.data?.customer_info?.invoice_country_name,
        },
        {
          label: 'City',
          value: saleInvoiceDetailResponse?.data?.customer_info?.invoice_city,
        },
        {
          label: 'Address ',
          value: saleInvoiceDetailResponse?.data?.customer_info?.invoice_address_line1,
        },
      ],
      showCustomOptions: true,
    }),
    [saleInvoiceDetailResponse]
  );
  const saleInvoiceActionList = useMemo(() => {
    const status = saleInvoiceDetailResponse?.data?.status;
    if (status === 'void') return [];
    const actionsList = [
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription =
            'You cannot delete this Sales Invoice  beacuse this is used in purchase Receipt Vouchers';
          let showActionButton = false;
          const cantDelete = status === 'paid' || status === 'partially paid';
          if (!cantDelete) {
            infoDescription = 'Are you sure you want to delete?';
            showActionButton = true;
          }

          setOpenInfoPopup({
            ...openInfoPopup,
            open: true,
            infoDescription,
            showActionButton,
          });
        },
      },
      {
        label: 'Void',
        handleClick: () => {
          setOpenVoidModal(true);
        },
      },

      {
        label: 'View Journal',
        handleClick: () => {
          const Journal = document.getElementById('Journal');
          if (Journal) Journal.scrollIntoView({ behavior: 'smooth' });
        },
      },
    ];
    if (status === 'draft') {
      actionsList.splice(0, 0, {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/sales/sale-invoice/edit/${id}`);
        },
      });
      actionsList.splice(actionsList.length - 1, 0, {
        label: 'Mark as sent',
        handleClick: () => {
          handleChangeStatus(changeStatusToSent, id, 'Invoice status changed');
        },
      });
    }
    if (status !== 'draft' && status !== 'paid') {
      actionsList.splice(actionsList.length - 1, 0, {
        label: 'Record Payment',
        handleClick: () => {
          navigate(
            `/pages/accounting/sales/receipt-voucher/add?customerId=${saleInvoiceDetailResponse?.data?.customer}`
          );
        },
      });
    }
    return actionsList;
  }, [saleInvoiceDetailResponse, saleInvoiceJournalsResponse]);
  return (
    <SectionLoader options={[saleInvoiceDetailResponse.isLoading]}>
      <ChangeStatusToVoid
        open={openVoidModal}
        setOpen={setOpenVoidModal}
        handleChangeStatus={handleChangeStatusToVoid}
      />
      <DetailPageHeader
        title={`Sales Invoice: #${saleInvoiceDetailResponse?.data?.invoice_num}`}
        filesList={saleInvoiceDetailResponse?.data?.invoice_docs}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={saleInvoiceDetailResponse?.data}
        actionsList={saleInvoiceActionList}
        useDeleteItemMutation={useDeleteSaleInvoiceMutation}
        useUploadDocumentFileMutation={useUploadSaleInvoiceDocumentsMutation}
        useDeleteDocumentFileMutation={useDeleteSaleInvoiceDocumentsMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: true,
          showVoucherTable: false,
        }}
        navigateAfterDelete="/pages/accounting/sales/sale-invoice"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={saleInvoiceDetailResponse.data}
          />
          {saleInvoiceJournalsResponse?.data?.invoice_journal_items && (
            <Grid container>
              <Grid item xs={12} style={{ maxWidth: 900, margin: '20px auto' }}>
                <Grid marginTop={4} id="Journal">
                  <JournalTable
                    key={uuid()}
                    journalItems={saleInvoiceJournalsResponse?.data?.invoice_journal_items}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default SaleInvoiceDetailPage;
