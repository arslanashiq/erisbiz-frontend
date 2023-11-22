import * as Yup from 'yup';

export const categoryFormValidationSchema = Yup.object({
  category_name: Yup.string().required('Category Name is required'),
});
export const test = '';
