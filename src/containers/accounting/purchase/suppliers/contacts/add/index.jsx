/* eslint-disable indent */
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
import {
  useAddCustomerContactMutation,
  useEditCustomerContactMutation,
  useGetCustomerContactQuery,
} from 'services/private/customers';

function AddSupplierContact() {
  const navigate = useNavigate();
  const { id, supplierId, customerId } = useParams();

  const [initialValues, setInitialValues] = useState(
    supplierId
      ? {
          first_name: '',
          designation: '',
          email: '',
          mobile_num: '',
          notes: '',
          supplier_id: supplierId,
        }
      : {
          name: '',
          designation: '',
          email: '',
          mobile_num: '',
          notes: '',
          SalesCompany: customerId,
        }
  );

  // suppliers
  const singleSupplierContactResponse = useGetSupplierSingleContactQuery(id, { skip: !id || !supplierId });
  const [addSupplierContact] = useAddSupplierContactMutation();
  const [editSupplierContact] = useEditSupplierContactMutation();

  // customers
  const [addCustomerContact] = useAddCustomerContactMutation();
  const [editCustomerContact] = useEditCustomerContactMutation();
  const singleCustomerContactResponse = useGetCustomerContactQuery(id, { skip: !id || !customerId });

  useEffect(() => {
    if (id && supplierId && singleSupplierContactResponse.isSuccess) {
      setInitialValues({ ...singleSupplierContactResponse?.data });
    }
    if (id && customerId && singleCustomerContactResponse.isSuccess) {
      setInitialValues({ ...singleCustomerContactResponse?.data });
    }
  }, [id, supplierId, customerId, singleSupplierContactResponse, singleCustomerContactResponse]);
  return (
    <>
      <Helmet>
        <title>{supplierId ? 'Supplier' : 'Customer'} Contact - ErisBiz</title>
        <meta name="description" content="CRM - Luxury Explorers" />
      </Helmet>
      <Card>
        <CardContent>
          <FormHeader title={supplierId ? 'Supplier Contact' : 'Customer Contact'} />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={bankFormValidationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                let response = null;
                if (id) {
                  if (supplierId) {
                    response = await editSupplierContact({ id, payload: values });
                  } else {
                    response = await editCustomerContact({ id, payload: values });
                  }
                } else if (supplierId) {
                  response = await addSupplierContact(values);
                } else {
                  response = await addCustomerContact(values);
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

              <FormikField
                name={supplierId ? 'first_name' : 'name'}
                type="text"
                // placeholder="Name"
                label="Name"
              />

              {/* Designation */}
              <FormikField
                name="designation"
                type="text"
                // placeholder="Designation"
                label="Designation"
              />

              {/* Email */}

              <FormikField
                name="email"
                type="email"
                // placeholder="Email"
                label="Email"
              />

              {/* Mobile Number */}

              <FormikField
                name="mobile_num"
                type="text"
                // placeholder="Mobile Number"
                label="Mobile Number"
              />

              {/* Notes */}

              <FormikField
                name="notes"
                textArea
                // placeholder="Notes"
                label="Notes"
                className="col-12"
              />

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
