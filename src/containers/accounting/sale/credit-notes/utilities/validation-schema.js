import * as Yup from 'yup';

export const creditNoteValidationSchema = Yup.object({
  invoice: Yup.string().required('Invoice# is required'),

  credit_note_items: Yup.array().of(
    Yup.object().shape({
      num_nights: Yup.number()
        .required('Required')
        .integer('Value must be an integer (without decimal)')
        .max(Yup.ref('invoice_num_nights'), 'Must be less than Invoice item quantity')
        .min(1, 'Must be more than 0')
        .test('max-digits', 'Maximum 10 digits are allowed', value => `${value}`.length <= 10),
    })
  ),
});

export const test = '';
