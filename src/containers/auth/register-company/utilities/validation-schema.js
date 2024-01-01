import * as Yup from 'yup';

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}
export const CompanyFormValidationSchema = Yup.object({
  name: Yup.string().required('Company Name is required'),
  country: Yup.string().required('Country is required'),
  currency: Yup.string().required('Currency is required'),
  location: Yup.string().required('Location is required'),
  website: Yup.string().required('Website Link is required'),
  remarks: Yup.string(),
  logo: Yup.mixed()
    .required('Logo is required')
    .test('is-valid-type', 'Not a valid image type', value => isValidFileType(value?.name?.toLowerCase(), 'image')),
  total: Yup.number().min(0),

  security_question: Yup.array().of(
    Yup.object({
      question: Yup.string().min(1, 'Question is required').required('Question is required'),
      answer: Yup.string().min(1, 'Answer is required').required('Answer is required'),
    })
  ),
});

export const test = '';
