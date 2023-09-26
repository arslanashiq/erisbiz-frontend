import { Card, CardContent } from '@mui/material';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  useDeleteJournalVoucherDocumentsMutation,
  useDeleteJournalVoucherMutation,
  useGetJournalVoucherDocumentsQuery,
  useGetSingleJournalVoucherQuery,
  useUploadJournalVoucherDocumentsMutation,
} from 'services/private/journal-voucher';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
import OrderDocument from 'shared/components/order-document/OrderDocument';
import { DATE_FORMAT_PRINT } from 'utilities/constants';
import { journalVoucherAccountTable } from '../utilities/head-cells';

const keyValue = 'journal_items';
function DetailJournalVoucher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Purchase Order beacuse this order is used in purchase invoice',
  });

  const journalVoucherResponse = useGetSingleJournalVoucherQuery(id);
  const journalVoucherDocumentsResponse = useGetJournalVoucherDocumentsQuery(id);

  const orderInfo = useMemo(
    () => ({
      type: 'Journal',
      order_number: `#${journalVoucherResponse?.data?.journal_formatted_number}`,
      formated_order_number: journalVoucherResponse?.data?.journal_formatted_number,
      date: journalVoucherResponse?.data?.date,
      location: journalVoucherResponse?.data?.location,
      box1: [
        {
          label: 'Journal No',
          value: journalVoucherResponse?.data?.journal_formatted_number,
        },
        {
          label: 'Quotation Date',
          value: moment(journalVoucherResponse?.data?.journal_date).format(DATE_FORMAT_PRINT),
        },
        {
          label: 'Amount',
          value: `${journalVoucherResponse?.data?.currency_symbol} ${journalVoucherResponse?.data?.total}`,
        },
        {
          label: 'Refernce',
          value: journalVoucherResponse?.data?.reference_num,
        },
      ],
      showCustomOptions: true,
      headCells: journalVoucherAccountTable,
      // showSaleSectionFooter: true,
    }),
    [journalVoucherResponse]
  );

  const quotationsActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/finance/journal-voucher/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          const infoDescription = 'Are you sure you want to delete?';
          const showActionButton = true;

          setOpenInfoPopup({
            ...openInfoPopup,
            open: true,
            infoDescription,
            showActionButton,
          });
        },
      },
    ],
    [journalVoucherResponse]
  );
  console.log(journalVoucherDocumentsResponse, 'journalVoucherDocumentsResponse');
  return (
    <SectionLoader options={[journalVoucherResponse.isLoading]}>
      <DetailPageHeader
        title={`Journal: #${journalVoucherResponse?.data?.journal_formatted_number}`}
        filesList={journalVoucherDocumentsResponse?.data}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={journalVoucherResponse?.data}
        actionsList={quotationsActionList}
        useDeleteItemMutation={useDeleteJournalVoucherMutation}
        useUploadDocumentFileMutation={useUploadJournalVoucherDocumentsMutation}
        useDeleteDocumentFileMutation={useDeleteJournalVoucherDocumentsMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: false,
          showVoucherTable: false,
          showJournalVoucher: true,
        }}
        navigateAfterDelete="/pages/accounting/finance/journal-voucher"
      />
      <Card>
        <CardContent>
          <OrderDocument
            orderInfo={orderInfo}
            keyValue={keyValue}
            orderDetail={journalVoucherResponse.data}
            showOrderVoucher={false}
            showItemsTable={false}
            showJournalVoucher
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default DetailJournalVoucher;
