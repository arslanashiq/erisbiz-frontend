import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import {
  useDeleteSupplierCreditsDocumentsMutation,
  useDeleteSupplierCreditsMutation,
  useGetSingleSupplierCreditsQuery,
  useGetSupplierCreditsDocumentsQuery,
  useUploadSupplierCreditsDocumentsMutation,
} from 'services/private/debit-note';
// shared
import OrderDocument from 'shared/components/order-document/OrderDocument';
import DetailPageHeader from 'shared/components/detail-page-heaher-component/DetailPageHeader';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';

const keyValue = 'supplier_credit_items';
function SupplierCreditDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openInfoPopup, setOpenInfoPopup] = useState({
    open: false,
    infoDescription: 'You cannot delete this Payment Voucher beacuse this Voucher has debit Notes',
  });
  const supplierCreditResponse = useGetSingleSupplierCreditsQuery(id);
  const SupplierCreditDocumentsResponse = useGetSupplierCreditsDocumentsQuery(id);
  const orderInfo = useMemo(
    () => ({
      type: 'Supplier Credit',
      formated_order_number: supplierCreditResponse?.data?.supplier_credit_formatted_number || '',
      date: supplierCreditResponse?.data?.invoice_date || '',
      supplier: supplierCreditResponse?.data?.supplier || {},
      location: supplierCreditResponse?.data?.location || '',
    }),
    [supplierCreditResponse]
  );
  const SupplierCreditsActionList = useMemo(
    () => [
      {
        label: 'Edit',
        handleClick: () => {
          navigate(`/pages/accounting/purchase/debit-notes/edit/${id}`);
        },
      },
      {
        label: 'Delete',
        handleClick: () => {
          let infoDescription = 'This Debit Note is either applied to bill or refunded.';
          let showActionButton = false;
          const cantDelete = supplierCreditResponse.data.is_applied;
          if (!cantDelete) {
            infoDescription = 'Are you sure you want to delete?';
            showActionButton = true;
          }
          setOpenInfoPopup({ ...openInfoPopup, open: true, infoDescription, showActionButton });
        },
      },
    ],
    [supplierCreditResponse]
  );
  return (
    <SectionLoader options={[supplierCreditResponse.isLoading]}>
      <DetailPageHeader
        title={`Purchase Debit Note:${supplierCreditResponse?.data?.supplier_credit_formatted_number}`}
        filesList={SupplierCreditDocumentsResponse?.data}
        keyValue={keyValue}
        orderInfo={orderInfo}
        orderDetail={supplierCreditResponse?.data}
        actionsList={SupplierCreditsActionList}
        useDeleteItemMutation={useDeleteSupplierCreditsMutation}
        useUploadDocumentFileMutation={useUploadSupplierCreditsDocumentsMutation}
        useDeleteDocumentFileMutation={useDeleteSupplierCreditsDocumentsMutation}
        openPopup={openInfoPopup}
        setOpenPopup={setOpenInfoPopup}
        pdfOptions={{
          showItemsTable: true,
          showVoucherTable: false,
        }}
      />
      <Card>
        <CardContent>
          <OrderDocument
            keyValue={keyValue}
            orderInfo={orderInfo}
            orderDetail={supplierCreditResponse.data}
          />
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default SupplierCreditDetail;
