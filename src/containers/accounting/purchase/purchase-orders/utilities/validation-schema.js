import { purchaseOrderItemsValidationschema } from 'shared/components/purchase-item/utilities/validation-schema';
import * as Yup from 'yup';

export const purchaseOrderFormValidationSchema = Yup.object({
  supplier_id: Yup.string().required('Supplier is required'),
  pur_order_items: purchaseOrderItemsValidationschema,
});
export const test = '';
