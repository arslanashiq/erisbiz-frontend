import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import {
  useAddSupplierContactMutation,
  useEditSupplierContactMutation,
  useGetSupplierSingleContactQuery,
} from 'services/private/suppliers';
// shared
import ErrorFocus from 'shared/components/error-focus/ErrorFocus';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
// styles
import 'styles/form/form.scss';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';

function AddSupplierContact() {
  const navigate = useNavigate();
  const { id, supplierId } = useParams();

  const [initialValues, setInitialValues] = useState({
    first_name: '',
    designation: '',
    email: '',
    mobile_num: '',
    notes: '',
    supplier_id: supplierId,
  });

  const singleSupplierContactResponse = useGetSupplierSingleContactQuery(id, { skip: !id });

  const [addSupplierContact] = useAddSupplierContactMutation();
  const [editSupplierContact] = useEditSupplierContactMutation();

  useEffect(() => {
    if (id && singleSupplierContactResponse.isSuccess) {
      setInitialValues({ ...singleSupplierContactResponse?.data });
    }
  }, [id, singleSupplierContactResponse]);
  return (
    <>
      <Helmet>
        <title>Supplier Contact - ErisBiz</title>
        <meta name="description" content="CRM - Luxury Explorers" />
      </Helmet>
      <Card>
        <CardContent>
          <FormHeader title="Supplier Contact" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={bankFormValidationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                let response = null;
                if (id) {
                  response = await editSupplierContact({ id, payload: values });
                } else {
                  response = await addSupplierContact(values);
                }
                setSubmitting(false);
                if (response.data) {
                  navigate(-1);
                }
                if (response.error) {
                  setErrors(response.error.data);
                }
              } catch (err) {
                if (err?.response?.status === 400) {
                  setSubmitting(true);
                  setErrors(err.response.data);
                  setSubmitting(false);
                }
              }
            }}
          >
            <Form className="form form--horizontal row mt-3">
              {/* Name */}

              <FormikField name="first_name" type="text" placeholder="Name" label="Name" />

              {/* Designation */}
              <FormikField name="designation" type="text" placeholder="Designation" label="Designation" />

              {/* Email */}

              <FormikField name="email" type="email" placeholder="Email" label="Email" />

              {/* Mobile Number */}

              <FormikField name="mobile_num" type="text" placeholder="Mobile Number" label="Mobile Number" />

              {/* Notes */}

              <FormikField name="notes" textArea placeholder="Notes" label="Notes" className="col-12" />

              <ErrorFocus />
              <FormSubmitButton />
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </>
  );
}

export default AddSupplierContact;
