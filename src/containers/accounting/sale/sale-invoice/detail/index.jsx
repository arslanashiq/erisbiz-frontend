import { Card, CardContent, Grid, IconButton, Tooltip } from '@mui/material';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
// services
import {
  useChangeSaleInvoiceStatusToSentMutation,
  useChangeSaleInvoiceStatusToVoidMutation,
  useDeleteSaleInvoiceDocumentsMutation,
  useDeleteSaleInvoiceMutation,
  useGetSaleInvoiceJournalsQuery,
  useGetSaleInvoicePaymentsQuery,
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
import { displayJournalActionButton } from 'utilities/display-journals';
import PaymentTable from 'containers/accounting/purchase/purchase-invoice/detail/components/PaymentTable';
import {
  paymentsAgainstSaleInvoiceHeadCells,
  saleCreditNoteAgainstSaleInvoiceHeadCells,
} from 'containers/accounting/purchase/purchase-invoice/utilities/head-cells';

const keyValue = 'invoice_items';
const handleCheck = status => {
  if (!status) return true;
  if (status === 'draft' || status === 'void') return true;
  return false;
};
function SaleInvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'Cannot delete  this Sale Invoice because its status is not draft',
  });
  const [openVoidModal, setOpenVoidModal] = useState(false);
  const [defaultExpanded, setDefaultExpanded] = useState(false);

  const saleInvoiceDetailResponse = useGetSingleSaleInvoiceQuery(id);
  const saleInvoiceJournalsResponse = useGetSaleInvoiceJournalsQuery(id, {
    skip: handleCheck(saleInvoiceDetailResponse?.data?.status),
  });
  const saleInvoicePaymentsResponse = useGetSaleInvoicePaymentsQuery(id);

  const [changeStatusToSent] = useChangeSaleInvoiceStatusToSentMutation();
  const [changeStatusToVoid] = useChangeSaleInvoiceStatusToVoidMutation();

  const handleChangeStatus = useCallback(async (changeInvoiceStatus, payload, successMessage) => {
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
  }, []);
  const handleChangeStatusToVoid = useCallback(async values => {
    const { reason } = values;
    await handleChangeStatus(changeStatusToVoid, { id, reason }, 'Invoice status change to Void');
    setOpenVoidModal(false);
  }, []);

  const orderInfo = useMemo(
    () => ({
      type: 'Sales Invoice',
      order_number: `#${saleInvoiceDetailResponse?.data?.invoice_num}`,
      formated_order_number: saleInvoiceDetailResponse?.data?.invoice_formatted_number,
      sale_person: saleInvoiceDetailResponse?.data?.sale_person,
      currency_symbol: saleInvoiceDetailResponse?.data?.currency_symbol,
      bankDetail: '',
      date: saleInvoiceDetailResponse?.data?.date,
      supplier: null,
      invoiceToDetail: {
        customer_name: saleInvoiceDetailResponse?.data?.customer_info?.customer_name || '',
        attention_to: saleInvoiceDetailResponse?.data?.customer_info?.contact_person || '',
        address: saleInvoiceDetailResponse?.data?.customer_info?.invoice_address_line1 || '',
        city: saleInvoiceDetailResponse?.data?.customer_info?.invoice_city || '',
        country: saleInvoiceDetailResponse?.data?.customer_info?.invoice_country || '',
      },
      location: saleInvoiceDetailResponse?.data?.location,

      box1: [
        {
          label: 'Invoice No',
          value: saleInvoiceDetailResponse?.data?.invoice_formatted_number,
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
          value: saleInvoiceDetailResponse?.data?.currency_symbol,
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
          let infoDescription = 'Are you sure you want to delete?';
          let showActionButton = true;
          const canDelete = status === 'draft';
          if (!canDelete) {
            infoDescription = 'Cannot delete  this Sale Invoice because its status is not draft';
            showActionButton = false;
          }

          setOpenInfoPopup({
            ...openInfoPopup,
            open: true,
            infoDescription,
            showActionButton,
          });
        },
      },
    ];
    if (status !== 'void' || status !== 'draft') {
      actionsList.splice(actionsList.length, 0, {
        label: 'View Journal',
        handleClick: () => displayJournalActionButton(setDefaultExpanded),
      });
    }
    if (status !== 'paid' && status !== 'partially paid') {
      actionsList.splice(0, 0, {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/sales/sale-invoice/edit/${id}`);
        },
      });
    }
    if (status === 'draft') {
      actionsList.splice(actionsList.length - 1, 0, {
        label: 'Mark as sent',
        handleClick: () => {
          handleChangeStatus(changeStatusToSent, id, 'Invoice status changed');
        },
      });
    }
    if (status !== 'draft' && status !== 'paid' && status !== 'partially paid') {
      actionsList.splice(2, 0, {
        label: 'Void',
        handleClick: () => {
          setOpenVoidModal(true);
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
    if (status === 'partially paid' || status === 'paid') {
      actionsList.push({
        label: 'Create Credit Note',
        handleClick: async () => {
          navigate(`/pages/accounting/sales/credit-notes/add?saleId=${id}`);
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
          {saleInvoicePaymentsResponse?.data?.payment?.length > 0 && (
            <Grid item style={{ maxWidth: 900, margin: '20px auto' }} md={12}>
              <PaymentTable
                heading="Receipt Voucher"
                headCells={paymentsAgainstSaleInvoiceHeadCells}
                payments={saleInvoicePaymentsResponse.data?.payment}
              />
            </Grid>
          )}
          {saleInvoicePaymentsResponse?.data?.credits_applied?.length > 0 && (
            <Grid item style={{ maxWidth: 900, margin: '20px auto' }} md={12}>
              <PaymentTable
                heading="Debit Applied"
                headCells={saleCreditNoteAgainstSaleInvoiceHeadCells}
                payments={saleInvoicePaymentsResponse.data?.credits_applied}
                customActionButton={[
                  {
                    title: 'Actions',
                    handleClick: () => {},
                    element: (
                      <Tooltip title="Delete Credit" arrow placement="top">
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    ),
                  },
                ]}
              />
            </Grid>
          )}
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={saleInvoiceDetailResponse.data}
            topStatusCard={{
              label: 'Mark as Sent',
              description: 'Invoice has been created. You can mark it as sent.',
            }}
            handleChangeStatus={() => handleChangeStatus(changeStatusToSent, id, 'Invoice status changed')}
          />
          {saleInvoiceJournalsResponse?.data?.invoice_journal_items && (
            <Grid container>
              <Grid item xs={12} style={{ maxWidth: 900, margin: '20px auto' }}>
                <Grid marginTop={4} id="Journal">
                  <JournalTable
                    key={uuid()}
                    journalItems={saleInvoiceJournalsResponse?.data?.invoice_journal_items}
                    defaultValue={defaultExpanded}
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
