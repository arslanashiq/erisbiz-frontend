import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useParams } from 'react-router';
import { Button, Stack } from '@mui/material';
// services
import { useAddSupplierCommentMutation } from 'services/private/suppliers';
// shares
import FormikField from 'shared/components/form/FormikField';
// styles
import 'styles/form/form.scss';

function CommentsForm() {
  const initialValues = {
    comments: '',
  };
  const { id } = useParams();
  const [addComment] = useAddSupplierCommentMutation();
  return (
    <div className="grey-bg p-4 border" style={{ maxWidth: 500, marginBottom: 20 }}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          comments: Yup.string().required('Comment is required').max(255, 'Cannot exceed 255 characters'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
          const payload = {
            supplier_id: id,
            comments: values.comments,
          };
          const commentResponse = await addComment(payload);
          if (commentResponse.data) {
            setSubmitting(false);
            resetForm(initialValues);
          }
          if (commentResponse.error) {
            setSubmitting(false);
            setErrors(commentResponse.error.data);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form form--horizontal row pt-3">
            <div className="form__form-group">
              <div className="form__form-group-field">
                <FormikField textArea name="comments" type="text" placeholder="Add Comment..." />
              </div>
            </div>
            <div>
              <Stack direction="row">
                <Button color="primary" type="submit" disabled={isSubmitting} className="icon-btn">
                  Add Comment
                </Button>
              </Stack>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CommentsForm;
