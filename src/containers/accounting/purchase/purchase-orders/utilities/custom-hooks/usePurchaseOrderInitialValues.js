import moment from 'moment';
import { useEffect, useState } from 'react';
import { useGetSinglePurchaseOrderQuery } from 'services/private/purchase-orders';
import copyFetchedValues from 'utilities/copyFetchedValues';
import { convertURLToFile } from 'utilities/helpers';

function usePurchaseOrderInitialValues(id) {
  const [initialValues, setInitialValues] = useState({
    pur_order_num: '',
    date: moment().format('yyyy-MM-DD'),
    location: '',
    supplier_id: '',
    reference_num: '',
    exchange_rate: 1,
    attachment: '',
    remarks: '',
    currency: 'AED',
    pur_order_items: [
      {
        service_type: 'Apple',
        currency: 1,
        num_units: 0,
        num_nights: 0,
        unit_price_ex_vat: 0,
        gross_amount: 0,
        discount: 0,
        vat_amount: 0,
        net_amount: 0,
      },
    ],

    pur_order_suffix: 'LPO',
    pur_order_docs: [
      {
        doc_file: '',
        doc_type: '',
        doc_name: '',
        doc_size_bytes: 0,
      },
    ],
  });
  if (id) {
    const purchaseOrderDetailResponse = useGetSinglePurchaseOrderQuery(id);
    const handleSetInitialValues = async () => {
      if (id && purchaseOrderDetailResponse.isSuccess) {
        let file = null;
        if (purchaseOrderDetailResponse?.data?.pur_order_docs.length > 0) {
          file = await convertURLToFile(purchaseOrderDetailResponse.data.pur_order_docs[0].doc_file);
        }
        let purchaseOrderItems = [];

        if (purchaseOrderDetailResponse?.data?.pur_order_items) {
          purchaseOrderItems = purchaseOrderDetailResponse.data.pur_order_items.map(item => ({
            item: item.service_type.toString(),
            quantity: item.num_nights,
            units: item.num_nights,
            price: item.unit_price_ex_vat,
            total: item.gross_amount,
            discount: item.discount,
            vat: item?.vat_rate ? item.vat_rate.toString() : 0,
            net_amount: item.net_amount,
            vat_amount: item.vat_amount,
            service_type: item.service_type,
            vat_rate: item.vat_rate,
          }));
        }

        setInitialValues({
          ...initialValues,
          ...copyFetchedValues(initialValues, purchaseOrderDetailResponse.data),
          supplier_id: purchaseOrderDetailResponse.data.supplier_id.toString(),
          attachment: file,
          pur_order_items: [...purchaseOrderItems],
        });
      }
    };

    useEffect(() => {
      handleSetInitialValues();
    }, [id, purchaseOrderDetailResponse]);
  }

  return {
    initialValues,
    setInitialValues,
  };
}

export default usePurchaseOrderInitialValues;
