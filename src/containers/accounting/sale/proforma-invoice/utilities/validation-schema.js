import * as Yup from 'yup';
import { saleOrderItemsValidationschema } from 'shared/components/purchase-item/utilities/validation-schema';

export const proformaInvoiceValidationSchema = Yup.object({
  customer: Yup.number().required('Customer is required'),
  quotation: Yup.string().required('Quotation is required'),
  sales_person: Yup.string().required('Sales Person is required'),
  pro_invoice_items: saleOrderItemsValidationschema,
});
export const test = '';
