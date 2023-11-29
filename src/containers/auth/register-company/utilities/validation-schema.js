import * as Yup from 'yup';

export const CompanyFormValidationSchema = Yup.object({
  name: Yup.string().required('Company Name is required'),
  country: Yup.string().required('Country is required'),
  currency: Yup.string().required('Currency is required'),
  location: Yup.string().required('Location is required'),
  remarks: Yup.string(),
  total: Yup.number().min(0),

  security_question: Yup.array()
    .min(1, '1 Secturity Question is required')
    .of(
      Yup.object({
        question: Yup.string().required('Question is required'),
        answer: Yup.string().required('Answer is required'),
      })
    ),
});

export const test = '';
