import * as Yup from 'yup';

export const purchaseOrderItemsValidationschema = Yup.array().of(
  Yup.object().shape({
    service_type: Yup.string().required('Item is required'),
    unit_price_ex_vat: Yup.number().moreThan(-1, 'Must be more than 0').required('Required'),
    discount: Yup.number()
      .positive('Must be greater than 0')
      .max(Yup.ref('gross_amount'), 'Must be less than gross amount'),
    num_nights: Yup.number()
      .required('Required')
      .moreThan(0, 'Must be more than 0')
      .integer('Value must be an integer (without decimal)')
      .moreThan(-1, 'Must be more than 0')
      .test('max-digits', 'Maximum 10 digits are allowed', value => `${value}`.length <= 10),

    gross_amount: Yup.number().required('Required').moreThan(-1, 'Must be more than 0'),
  })
);
export const saleOrderItemsValidationschema = Yup.array().of(
  Yup.object().shape({
    service_type: Yup.string().required('Item is required'),
    discount: Yup.number()
      .positive('Must be greater than 0')
      .max(Yup.ref('gross_amount'), 'Must be less than gross amount'),
    num_nights: Yup.number()
      .required('Required')
      .when('item_service_type', {
        is: 'Service',
        then: () => Yup.number()
          .required('Required')
          .integer('Value must be an integer (without decimal)')
          .moreThan(-1, 'Must be more than 0')
          .test('max-digits', 'Maximum 10 digits are allowed', value => `${value}`.length <= 10),
      })
      .max(Yup.ref('remaining_stock'), 'Must be less than Remaining Stock of Item')
      .integer('Value must be an integer (without decimal)')
      .moreThan(-1, 'Must be more than 0')
      .test('max-digits', 'Maximum 10 digits are allowed', value => `${value}`.length <= 10),

    gross_amount: Yup.number().required('Required').moreThan(-1, 'Must be more than 0'),
  })
);

export const test = '';
