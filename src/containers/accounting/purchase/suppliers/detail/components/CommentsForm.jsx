import React, { useMemo } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useParams } from 'react-router';
import { Box, Button, Stack } from '@mui/material';
// services
import { useAddSupplierCommentMutation } from 'services/private/suppliers';
// shares
import FormikField from 'shared/components/form/FormikField';
// styles
import 'styles/form/form.scss';

function CommentsForm() {
  const { id } = useParams();

  const [addComment] = useAddSupplierCommentMutation();

  const initialValues = useMemo(
    () => ({
      comments: '',
    }),
    []
  );
  return (
    <Box className="grey-bg p-4 border" style={{ maxWidth: 500, marginBottom: 20 }}>
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
          <Form className="form form--horizontal row">
            <Box className="form__form-group">
              <Box className="form__form-group-field">
                <FormikField
                  textArea
                  name="comments"
                  type="text"
                  placeholder="Add Comment..."
                  className="col-12"
                />
              </Box>
            </Box>
            <Box>
              <Stack direction="row">
                <Button color="primary" type="submit" disabled={isSubmitting} className="icon-btn">
                  Add Comment
                </Button>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default CommentsForm;
