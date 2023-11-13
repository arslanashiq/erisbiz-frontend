import * as Yup from 'yup';
import { purchaseOrderItemsValidationschema } from 'shared/components/purchase-item/utilities/validation-schema';

export const purchaseInvoiceFormValidationSchema = Yup.object({
  supplier_id: Yup.string().required('Supplier is required'),
  pur_order_id: Yup.string().required('Purchase Order is required'),
  credit_account: Yup.string().required('Credit Account is required'),
  supplier_invoice_num: Yup.number('Supplier Invoicemust be a number'),

  bill_items: purchaseOrderItemsValidationschema,
});
export const test = '';
