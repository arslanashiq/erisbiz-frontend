import * as Yup from 'yup';
import { purchaseOrderItemsValidationschema } from 'shared/components/purchase-item/utilities/validation-schema';

export const saleInvoiceValidationSchema = Yup.object({
  customer: Yup.number().required('Customer is required'),
  pro_invoice: Yup.string().required('Proforma Invoice is required'),
  invoice_items: purchaseOrderItemsValidationschema,
});
export const test = '';
