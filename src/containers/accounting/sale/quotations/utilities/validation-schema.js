import * as Yup from 'yup';
import { saleOrderItemsValidationschema } from 'shared/components/purchase-item/utilities/validation-schema';

export const quotationFormValidationSchema = Yup.object({
  customers: Yup.string().required('Customer is required'),
  sales_person: Yup.string().required('Sales Person is required'),
  quotation_items: saleOrderItemsValidationschema,
  remarks: Yup.string().max(255, 'Must be less than 255 characters'),
});
export const test = '';
