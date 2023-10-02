import * as Yup from 'yup';

export const brandsFormValidationSchema = Yup.object({
  brand_name: Yup.string().required('Required'),
  brand_region: Yup.string().required('Required'),
});
export const test = '';
