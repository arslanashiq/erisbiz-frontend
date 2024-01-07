import React, { useCallback, useMemo } from 'react';
import { FieldArray, Formik, Form } from 'formik';
import { Card, CardContent } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import TagIcon from '@mui/icons-material/Tag';
// services
import { useGetItemsListQuery } from 'services/private/items';
import {
  useAddCreditNoteMutation,
  useEditCreditNoteMutation,
  useGetSingleCreditNoteQuery,
} from 'services/private/credit-notes';
import { useGetSaleInvoicesListQuery } from 'services/private/sale-invoice';
import { useGetReceiptVoucherListQuery } from 'services/private/receipt-voucher';
import { useGetChartOfAccountListQuery } from 'services/private/chart-of-account';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikSelect from 'shared/components/form/FormikSelect';
import {
  handleChangeSaleItem,
  handleChangeQuantity,
  handleCalculateTotalAmount,
  handleGetFormatedItemsData,
} from 'shared/components/purchase-item/utilities/helpers';
import PurchaseItem from 'shared/components/purchase-item/PurchaseItem';
import useInitialValues from 'shared/custom-hooks/useInitialValues';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FormSubmitButton from 'containers/common/form/FormSubmitButton';
// custom hooks
import useListOptions from 'custom-hooks/useListOptions';
// utilities
import { VAT_CHARGES } from 'utilities/constants';
import getSearchParamsList from 'utilities/getSearchParamsList';
import { PurchaseItemInputList } from 'utilities/purchase-item-input-list';
import { creditNoteInitialValues } from '../utilities/initialValues';
import { creditNoteValidationSchema } from '../utilities/validation-schema';
import 'styles/form/form.scss';

function index() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saleId } = getSearchParamsList();

  const receiptVouchersListResponse = useGetReceiptVoucherListQuery();
  const saleInvoiceListResponse = useGetSaleInvoicesListQuery();
  const itemsListResponse = useGetItemsListQuery({ is_active: 'True' });
  const bankAccountResponse = useGetChartOfAccountListQuery({ account_type: 'accounts_receivable' });

  const [addCreditNote] = useAddCreditNoteMutation();
  const [editCreditNote] = useEditCreditNoteMutation();

  const { optionsList: saleInvoiceListOptions } = useListOptions(
    saleInvoiceListResponse?.data?.results,
    {
      value: 'id',
      label: 'invoice_formatted_number',
    },
    ['status']
  );
  const filteredSaleInvoiceOptionList = saleInvoiceListOptions?.filter(invoice => invoice.status !== 'draft');
  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      value: 'item_name',
      label: 'item_name',
    },
    ['sale_price', 'item_type', 'cost_price', 'remaining_stock', 'weighted_cost_price']
  );
  const { optionsList: bankAccountOptions } = useListOptions(bankAccountResponse?.data?.results, {
    value: 'id',
    label: 'account_name',
  });

  const { initialValues, isLoading } = useInitialValues(
    creditNoteInitialValues,
    useGetSingleCreditNoteQuery,
    null,
    true,
    false,
    null
  );

  const saleItemsInputList = useMemo(
    () => [
      {
        ...PurchaseItemInputList.service_type,
        options: itemsListOptions || [],
        onChange: handleChangeSaleItem,
      },
      { ...PurchaseItemInputList.num_nights, onChange: handleChangeQuantity },
      { ...PurchaseItemInputList.unit_price_ex_vat, disabled: true },
      { ...PurchaseItemInputList.gross_amount },
      { ...PurchaseItemInputList.discount, disabled: true },
      { ...PurchaseItemInputList.vat_rate, options: VAT_CHARGES || [], disabled: true },
      {
        ...PurchaseItemInputList.net_amount,
        options: itemsListOptions || [],
        onChange: handleChangeSaleItem,
      },
    ],
    [itemsListOptions]
  );

  const handleChangeSaleInvoice = useCallback(
    (value, setFieldValue) => {
      const selectedSaleInvoice = saleInvoiceListResponse.data.results.filter(
        saleInvoice => saleInvoice.id === value
      );

      const selectedInvoiceItemsList = selectedSaleInvoice[0]?.invoice_items?.map(invoiceItems => ({
        ...invoiceItems,
        invoice_num_nights: invoiceItems.num_nights,
      }));
      if (setFieldValue) setFieldValue('credit_note_items', selectedInvoiceItemsList);
      return selectedInvoiceItemsList;
    },
    [saleInvoiceListResponse]
  );
  const handleSubmitForm = useCallback(async (values, { setErrors }) => {
    const payload = {
      ...values,
      credit_note_items: handleGetFormatedItemsData(values.credit_note_items),
      ...handleCalculateTotalAmount(values.credit_note_items),
    };
    let response = null;
    if (id) {
      response = await editCreditNote({ id, payload });
    } else {
      response = await addCreditNote(payload);
    }
    if (response.error) {
      setErrors(response.error.data);
      return;
    }
    if (saleId) {
      navigate('/pages/accounting/sales/credit-notes', { replace: true });
      return;
    }
    navigate(-1);
  }, []);

  const updatedInitialValues = useMemo(() => {
    let newData = {
      ...initialValues,
    };
    if (id && initialValues?.invoice?.id) {
      newData = {
        ...newData,
        invoice: initialValues?.invoice?.id,
        credit_note_items: initialValues?.invoice?.invoice_items?.map((invoiceItems, idx) => ({
          ...invoiceItems,
          num_nights: initialValues?.credit_note_items[idx]?.num_nights,
          invoice_num_nights: invoiceItems.num_nights,
        })),
      };
    }
    if (saleId && saleInvoiceListResponse?.data?.results) {
      const saleItemsData = handleChangeSaleInvoice(Number(saleId));
      newData = { ...newData, invoice: Number(saleId), credit_note_items: saleItemsData };
    }
    return newData;
  }, [initialValues, saleId, saleInvoiceListResponse]);

  return (
    <SectionLoader
      options={[
        itemsListResponse.isLoading,
        saleInvoiceListResponse.isLoading,
        bankAccountResponse.isLoading,
        receiptVouchersListResponse.isLoading,
        isLoading,
      ]}
    >
      <Card>
        <CardContent>
          <FormHeader title="Credit Note" />
          <Formik
            enableReinitialize
            validationSchema={creditNoteValidationSchema}
            initialValues={updatedInitialValues}
            onSubmit={handleSubmitForm}
          >
            {({ setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                <FormikSelect
                  options={filteredSaleInvoiceOptionList}
                  name="invoice"
                  //  placeholder="Invoice Number"
                  label="Invoice Number"
                  startIcon={<TagIcon />}
                  disabled={Boolean(saleId)}
                  isRequired
                  onChange={value => handleChangeSaleInvoice(value, setFieldValue)}
                />
                <FormikDatePicker
                  name="credit_note_date"
                  type="text"
                  //  placeholder="Date"
                  displayFormat="yyyy-MM-dd"
                  label="Date"
                />

                {/* <FormikSelect
                  options={bankAccountOptions}
                  name="account_num"
                  //  placeholder="Account"
                  label="Account"
                /> */}
                <FormikSelect
                  options={bankAccountOptions}
                  name="credit_account_num"
                  //  placeholder="Credit Account Number"
                  label="Credit Acc"
                  isRequired
                  className="col-12"
                />

                <FieldArray
                  render={props => (
                    <PurchaseItem
                      {...props}
                      disableAdd
                      name="credit_note_items"
                      inputList={saleItemsInputList}
                      // newList={NEW_PURCHASE_ITEM_OBJECT}
                    />
                  )}
                />

                <FormikField
                  name="customer_notes"
                  textArea
                  //  placeholder="Remarks"
                  label="Remarks"
                  className="col-12"
                />

                <FormSubmitButton />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default index;
