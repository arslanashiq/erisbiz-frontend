import * as Yup from 'yup';
import { purchaseOrderItemsValidationschema } from 'shared/components/purchase-item/utilities/validation-schema';

export const quotationFormValidationSchema = Yup.object({
  customers: Yup.string().required('Customer is required'),
  quotation_items: purchaseOrderItemsValidationschema,
});
export const test = '';
