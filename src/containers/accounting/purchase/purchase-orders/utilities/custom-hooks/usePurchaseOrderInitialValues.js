import moment from 'moment';
import { useEffect, useState } from 'react';
import { useGetSinglePurchaseOrderQuery } from 'services/private/purchase-orders';
import { DATE_FORMAT } from 'utilities/constants';
import copyFetchedValues from 'utilities/copyFetchedValues';

function usePurchaseOrderInitialValues(id) {
  const [initialValues, setInitialValues] = useState({
    pur_order_num: '',
    date: moment().format(DATE_FORMAT),
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
    pur_order_docs: [],
  });
  if (id) {
    const purchaseOrderDetailResponse = useGetSinglePurchaseOrderQuery(id);
    const handleSetInitialValues = async () => {
      if (id && purchaseOrderDetailResponse.isSuccess) {
        setInitialValues({
          ...initialValues,
          ...copyFetchedValues(initialValues, purchaseOrderDetailResponse.data),
          supplier_id: purchaseOrderDetailResponse.data.supplier_id.toString(),
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
