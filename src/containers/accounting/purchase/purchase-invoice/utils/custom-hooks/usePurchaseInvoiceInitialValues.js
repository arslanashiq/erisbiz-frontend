import moment from 'moment';
import { useEffect, useState } from 'react';
import { useGetSinglePurchaseInvoiceQuery } from 'services/private/purchase-invoice';
import copyFetchedValues from 'utilities/copyFetchedValues';
import { convertURLToFile } from 'utilities/helpers';

function usePurchaseInvoiceInitialValues(id) {
  const [initialValues, setInitialValues] = useState({
    bill_num: '',
    currency: 'AED',
    bill_date: '',
    bill_notes: [],
    invoice_num: '',
    invoice_date: moment('').format('yyyy-mm-dd'),
    due_date: moment('').format('yyyy-mm-dd'),
    location: '',
    supplier_id: '',
    credit_account: '',
    supplier_invoice_num: '',
    notes: '',
    bill_items: [
      {
        num_units: '',
        num_nights: '',
        unit_price_ex_vat: '',
        gross_amount: '',
        discount: '',
        vat_amount: '',
        net_amount: '',
        account_code: '',
        service_type: '',
        currency: 1,
      },
    ],
    attachment: '',
  });
  if (id) {
    const purchaseOrderDetailResponse = useGetSinglePurchaseInvoiceQuery(id);
    const handleSetInitialValues = async () => {
      if (id && purchaseOrderDetailResponse.isSuccess) {
        let file = null;
        if (purchaseOrderDetailResponse?.data?.pur_order_docs.length > 0) {
          file = await convertURLToFile(purchaseOrderDetailResponse.data.pur_order_docs[0].doc_file);
        }
        let purchaseOrderItems = [];

        if (purchaseOrderDetailResponse?.data?.pur_order_items) {
          purchaseOrderItems = purchaseOrderDetailResponse.data.pur_order_items.map(item => ({
            item: item.service_type,
            quantity: item.num_nights,
            units: item.num_nights,
            price: item.unit_price_ex_vat,
            total: item.gross_amount,
            discount: item.discount,
            vat: item.vat_rate.toString() || 0,
            net_amount: item.net_amount,
            vat_amount: item.vat_amount,
            service_type: item.service_type,
            vat_rate: item.vat_rate,
          }));
        }
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setInitialValues({
              ...initialValues,
              ...copyFetchedValues(initialValues, purchaseOrderDetailResponse.data),
              supplier_id: purchaseOrderDetailResponse.data.supplier_id.toString(),
              pur_order_items: [...purchaseOrderItems],
              attachment: null,

              location: purchaseOrderDetailResponse.data.location,
              pur_order_docs: [
                { ...purchaseOrderDetailResponse.data.pur_order_docs[0], doc_file: reader.result },
              ],
            });
          };
        } else {
          setInitialValues({
            ...initialValues,
            ...copyFetchedValues(initialValues, purchaseOrderDetailResponse.data),
            supplier_id: purchaseOrderDetailResponse.data.supplier_id.toString(),
            attachment: null,
            pur_order_items: [...purchaseOrderItems],
          });
        }
      }
    };

    useEffect(() => {
      handleSetInitialValues();
    }, [id, purchaseOrderDetailResponse]);
  }

  return {
    initialValues,
  };
}

export default usePurchaseInvoiceInitialValues;
