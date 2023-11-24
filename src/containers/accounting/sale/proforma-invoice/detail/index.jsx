import { Card, CardContent } from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  useChangeProformaInvoiceStatusMutation,
  useDeleteProformaInvoiceDocumentFileMutation,
  useDeleteProformaInvoiceMutation,
  useGetSingleProformaInvoiceQuery,
  useUploadProformaInvoiceDocumentFileMutation,
} from 'services/private/proforma-invoices';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import { DATE_FORMAT_PRINT } from 'utilities/constants';

const keyValue = 'pro_invoice_items';
function ProfomaInvoiceDetail() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });
  const proformaInvoiceDetailResponse = useGetSingleProformaInvoiceQuery(id);
  const [changeProfomaInvoiceStatus] = useChangeProformaInvoiceStatusMutation();

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
  const purchaseOrderActionList = useMemo(() => {
    const status = proformaInvoiceDetailResponse?.data?.status;
    if (status === 'cancelled') return [];
    let actionList = [
      {
        label: 'Edit & clone',
        handleClick: () => {
          navigate(`/pages/accounting/sales/proforma-invoice/add?proformaInvoice=${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription = 'Are you sure you want to delete?';
          let showActionButton = true;
          const cantDelete = status === 'invoiced';
          if (cantDelete) {
            infoDescription =
              'You cannot delete this Proforma Invoice beacuse this invoice is used in sale invoice';
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
    if (status === 'draft') {
      actionList.splice(0, 0, {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/sales/proforma-invoice/edit/${id}`);
        },
      });
    }
    if (status !== 'invoiced') {
      actionList = [
        ...actionList,

        {
          label: 'cancel',
          handleClick: () => {
            handleChangeStatus(
              changeProfomaInvoiceStatus,
              { id, status: 'cancelled' },
              'Proforma Invoice status changed'
            );
          },
        },
        {
          label: 'create Invoice',
          handleClick: () => {
            navigate(`/pages/accounting/sales/sale-invoice/add?proformaInvoice=${id}`);
          },
        },
      ];
    }

    return actionList;
  }, [proformaInvoiceDetailResponse]);

  const orderInfo = useMemo(
    () => ({
      type: 'Proforma Invoice',
      order_number: `#${proformaInvoiceDetailResponse?.data?.pro_invoice_num}`,
      formated_order_number: proformaInvoiceDetailResponse?.data?.pro_invoice_formatted_number,
      date: proformaInvoiceDetailResponse?.data?.pro_invoice_date,
      supplier: null,
      location: proformaInvoiceDetailResponse?.data?.location,
      box1: [
        {
          label: 'Quotation No',
          value: proformaInvoiceDetailResponse?.data?.pro_invoice_formatted_number,
        },
        {
          label: 'Quotation Date',
          value: moment(proformaInvoiceDetailResponse?.data?.quotation_num).format(DATE_FORMAT_PRINT),
        },
        {
          label: 'Location',
          value: proformaInvoiceDetailResponse?.data?.location,
        },
        {
          label: 'Currency',
          value: proformaInvoiceDetailResponse?.data?.currency_symbol,
        },
      ],
      box2: [
        {
          label: 'Customer',
          value: proformaInvoiceDetailResponse?.data?.customer_info?.customer_name,
        },
        {
          label: 'Country',
          value: proformaInvoiceDetailResponse?.data?.customer_info?.invoice_country_name,
        },
        {
          label: 'City',
          value: proformaInvoiceDetailResponse?.data?.customer_info?.invoice_city,
        },
        {
          label: 'Address ',
          value: proformaInvoiceDetailResponse?.data?.customer_info?.invoice_address_line1,
        },
      ],
      showCustomOptions: true,
    }),
    [proformaInvoiceDetailResponse]
  );
  return (
    <SectionLoader options={[proformaInvoiceDetailResponse.isLoading]}>
      <DetailPageHeader
        title={`Po:#${proformaInvoiceDetailResponse?.data?.pro_invoice_formatted_number}`}
        filesList={proformaInvoiceDetailResponse?.data?.pro_invoice_docs}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={proformaInvoiceDetailResponse?.data}
        actionsList={purchaseOrderActionList}
        useDeleteItemMutation={useDeleteProformaInvoiceMutation}
        useUploadDocumentFileMutation={useUploadProformaInvoiceDocumentFileMutation}
        useDeleteDocumentFileMutation={useDeleteProformaInvoiceDocumentFileMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: true,
          showVoucherTable: false,
        }}
        navigateAfterDelete="/pages/accounting/sales/proforma-invoice"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={proformaInvoiceDetailResponse.data}
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ProfomaInvoiceDetail;
