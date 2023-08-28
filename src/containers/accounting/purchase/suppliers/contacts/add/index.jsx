import { Button, Card, CardContent, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router';
import {
  useAddSupplierContactMutation,
  useEditSupplierContactMutation,
  useGetSupplierSingleContactQuery,
} from 'services/private/suppliers';
import ErrorFocus from 'shared/components/error-focus/ErrorFocus';
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikModernField from 'shared/components/form/FormikModernField';
import 'styles/form.scss';

function AddSupplierContact() {
  const { id, supplierId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    designation: '',
    email: '',
    mobile_num: '',
    notes: '',
    supplier_id: supplierId,
  });
  const [addSupplierContact] = useAddSupplierContactMutation();
  const [editSupplierContact] = useEditSupplierContactMutation();

  if (id) {
    const singleSupplierContactResponse = useGetSupplierSingleContactQuery(id);
    useEffect(() => {
      if (id && singleSupplierContactResponse.isSuccess) {
        setInitialValues({ ...singleSupplierContactResponse?.data });
      }
    }, [id, singleSupplierContactResponse]);
  }
  return (
    <>
      <Helmet>
        <title>Supplier Contact - ErisBiz</title>
        <meta name="description" content="CRM - Luxury Explorers" />
      </Helmet>
      <Card>
        <CardContent>
          <FormHeader title="Brands" />
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
                if (err.response && err.response.status === 400) {
                  setSubmitting(true);
                  setErrors(err.response.data);
                  setSubmitting(false);
                } else {
                  // doReturnErrors(err.response.data, err.response.status);
                }
              }
            }}
          >
            {({ isSubmitting, touched, resetForm }) => (
              <Form className="form form--horizontal row mt-3">
                {/* Name */}
                <div className="form__form-group col-md-6">
                  <span className="form__form-group-label col-lg-3 required">Name</span>
                  <div className="form__form-group-field ">
                    <FormikModernField name="first_name" type="text" placeholder="Name" />
                  </div>
                </div>
                {/* Designation */}
                <div className="form__form-group col-md-6">
                  <span className="form__form-group-label col-lg-3">Designation</span>
                  <div className="form__form-group-field ">
                    <FormikModernField name="designation" type="text" placeholder="Designation" />
                  </div>
                </div>
                {/* Email */}
                <div className="form__form-group col-md-6">
                  <span className="form__form-group-label col-lg-3">Email</span>
                  <div className="form__form-group-field ">
                    <FormikModernField name="email" type="email" placeholder="Email" />
                  </div>
                </div>
                {/* Mobile Number */}
                <div className="form__form-group col-md-6">
                  <span className="form__form-group-label col-lg-3">Mobile Number</span>
                  <div className="form__form-group-field ">
                    <FormikModernField name="mobile_num" type="text" placeholder="Mobile Number" />
                  </div>
                </div>
                {/* Notes */}

                <div className="form__form-group">
                  <span className="form__form-group-label col-lg-3">Notes</span>
                  <div className="form__form-group-field ">
                    <FormikModernField name="notes" textArea placeholder="Notes" />
                  </div>
                </div>

                <ErrorFocus />
                <Stack spacing={2} direction="row">
                  <Button type="submit" disabled={isSubmitting} color="primary" className="text-capitalize">
                    Save
                  </Button>

                  <Button
                    color="secondary"
                    onClick={() => resetForm(initialValues)}
                    disabled={!touched || isSubmitting}
                    className="text-capitalize"
                  >
                    {id ? 'Reset' : 'Clear'}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </>
  );
}

export default AddSupplierContact;
