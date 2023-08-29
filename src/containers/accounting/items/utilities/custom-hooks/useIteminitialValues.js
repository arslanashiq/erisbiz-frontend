import { useEffect, useState } from 'react';
import { useGetSingleItemQuery } from 'services/private/items';
import copyFetchedValues from 'utilities/copyFetchedValues';
import { convertURLToFile } from 'utilities/helpers';

function useIteminitialValues(id) {
  const [initialValues, setInitialValues] = useState({
    item_name: '',
    sku_hs_code: '',
    sale_price: '',
    cost_price: '',
    item_type: 'Goods',
    is_active: 'true',
    account_no: '',
    bar_code: '',
    unit: 'kg',
    recorder: '',
    description: '',
    // item_image: '',
    part_number: '',
    supplier: '',
    brand: '',

    current_value: 0.0,
    sale_account_label: 'Cash in Bank -  MCB AED',
    cost_account_label: 'Cash in Bank -  MCB AED',
    inventory_coa_label: 'Cash in Bank -  MCB AED',
    is_digital_service: false,
    item_sale_amount_prefix: 'AED',
    sale_description: null,
    item_cost_amount_prefix: 'AED',
    cost_description: null,
    is_tracking_inventory: false,
    opening_stock: 0.0,
    opening_stock_per_unit: 0.0,
    dynamic_opening_stock: 0.0,
    dynamic_opening_stock_per_unit: 0.0,
  });
  if (id) {
    const detailResponse = useGetSingleItemQuery(id);
    const setResponseToInitialValues = async () => {
      if (id && detailResponse.isSuccess) {
        let itemImageFile = null;
        if (detailResponse.data.item_image) {
          itemImageFile = await convertURLToFile(detailResponse.data.item_image);
        }
        setInitialValues({
          ...initialValues,
          ...copyFetchedValues(initialValues, detailResponse.data),
          item_type: detailResponse.data.item_type.toString(),
          is_active: detailResponse.data.is_active.toString(),
          supplier: detailResponse.data.supplier.toString(),
          account_no: detailResponse.data.account_no.toString(),
          item_image: itemImageFile,
        });
      }
    };

    useEffect(() => {
      if (detailResponse.isSuccess) {
        setResponseToInitialValues();
      }
    }, [id, detailResponse]);
  }
  return {
    initialValues,
  };
}

export default useIteminitialValues;
