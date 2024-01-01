import * as Yup from 'yup';
import { purchaseOrderItemsValidationschema } from 'shared/components/purchase-item/utilities/validation-schema';

export const purchaseInvoiceFormValidationSchema = Yup.object({
  supplier_id: Yup.string().required('Supplier is required'),
  pur_order_id: Yup.string().required('Purchase Order is required'),
  credit_account: Yup.string().required('Credit Account is required'),

  supplier_invoice_num: Yup.string().required('Supplier Invoice Number is required'),

  bill_items: purchaseOrderItemsValidationschema,
  notes: Yup.string(''),
});
export const test = '';
