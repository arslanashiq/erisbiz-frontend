import { Card, CardContent } from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDeleteCreditNoteMutation, useGetSingleCreditNoteQuery } from 'services/private/credit-notes';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import { DATE_FORMAT_PRINT } from 'utilities/constants';

const keyValue = 'credit_note_items';
function CreditNoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });

  const creditNoteDetailResponse = useGetSingleCreditNoteQuery(id);
  const orderInfo = useMemo(
    () => ({
      type: 'Credit Note',
      order_number: `#${creditNoteDetailResponse?.data?.credit_note_formatted_number}`,
      formated_order_number: creditNoteDetailResponse?.data?.quotation_num,
      date: creditNoteDetailResponse?.data?.date,
      supplier: null,
      location: creditNoteDetailResponse?.data?.location,
      box1: [
        {
          label: 'Credit No',
          value: creditNoteDetailResponse?.data?.credit_note_formatted_number,
        },
        {
          label: 'invoice No',
          value: creditNoteDetailResponse?.data?.invoice.invoice_formatted_number || '-',
        },
        {
          label: 'Credit Date',
          value: moment(creditNoteDetailResponse?.data?.credit_note_date).format(DATE_FORMAT_PRINT),
        },
      ],
      box2: [
        {
          label: 'Customer',
          value: creditNoteDetailResponse?.data?.invoice?.customer_info?.customer_name,
        },
        {
          label: 'Country',
          value: creditNoteDetailResponse?.data?.invoice?.customer_info?.invoice_country_name,
        },
        {
          label: 'City',
          value: creditNoteDetailResponse?.data?.invoice?.customer_info?.invoice_city,
        },
        {
          label: 'Address ',
          value: creditNoteDetailResponse?.data?.invoice?.customer_info?.invoice_address_line1,
        },
      ],
      showCustomOptions: true,
    }),
    [creditNoteDetailResponse]
  );
  const quotationsActionList = useMemo(() => {
    const actionList = [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/sales/credit-notes/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          setOpenInfoPopup({
            ...openInfoPopup,
            open: true,
            infoDescription: 'Are you sure you want to delete?',
            showActionButton: true,
          });
        },
      },
    ];
    // if (creditNoteDetailResponse?.data?.status === 'open') {
    //   actionList.push({
    //     label: 'Refund',
    //     divider: true,
    //     handleClick: () => {
    //       // setOpenRefundModal(true);
    //     },
    //   });
    // }
    return actionList;
  }, [creditNoteDetailResponse]);
  return (
    <SectionLoader options={[creditNoteDetailResponse.isLoading]}>
      <DetailPageHeader
        title={`Credit Note: #${creditNoteDetailResponse?.data?.credit_note_formatted_number}`}
        // filesList={creditNoteDetailResponse?.data?.quotation_docs}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={creditNoteDetailResponse?.data}
        actionsList={quotationsActionList}
        useDeleteItemMutation={useDeleteCreditNoteMutation}
        // useUploadDocumentFileMutation={useUploadQuotationDocumentsMutation}
        // useDeleteDocumentFileMutation={useDeleteQuotationDocumentsMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: true,
          showVoucherTable: false,
        }}
        navigateAfterDelete="/pages/accounting/sales/credit-notes"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={creditNoteDetailResponse.data}
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default CreditNoteDetail;
