import * as Yup from 'yup';
import { purchaseOrderItemsValidationschema } from 'shared/components/purchase-item/utilities/validation-schema';

export const proformaInvoiceValidationSchema = Yup.object({
  customer: Yup.number().required('Customer is required'),
  quotation: Yup.string().required('Quotation is required'),
  quotation_items: purchaseOrderItemsValidationschema,
});
export const test = '';
