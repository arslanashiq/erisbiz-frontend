import React, { useMemo } from 'react';
import * as Yup from 'yup';
import { FieldArray, Formik, Form } from 'formik';
import { Card, CardContent } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import TagIcon from '@mui/icons-material/Tag';
// services
import { useGetItemsListQuery } from 'services/private/items';
import { useGetBankAccountsListQuery } from 'services/private/banking';
import {
  useAddCreditNoteMutation,
  useEditCreditNoteMutation,
  useGetSingleCreditNoteQuery,
} from 'services/private/credit-notes';
import { useGetSaleInvoicesListQuery } from 'services/private/sale-invoice';
import { useGetReceiptVoucherListQuery } from 'services/private/receipt-voucher';
// shared
import FormHeader from 'shared/components/form-header/FormHeader';
import FormikField from 'shared/components/form/FormikField';
import FormikDatePicker from 'shared/components/form/FormikDatePicker';
import FormikSelect from 'shared/components/form/FormikSelect';
import {
  handleChangeDiscount,
  handleChangeItem,
  handleChangeQuantity,
  hanldeVATChange,
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
import { creditNoteInitialValues } from '../utilities/initialValues';
import 'styles/form/form.scss';

function index() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saleId } = getSearchParamsList();

  const receiptVouchersListResponse = useGetReceiptVoucherListQuery();
  const saleInvoiceListResponse = useGetSaleInvoicesListQuery();
  const itemsListResponse = useGetItemsListQuery({ is_active: 'True' });
  const bankAccountResponse = useGetBankAccountsListQuery();

  const [addCreditNote] = useAddCreditNoteMutation();
  const [editCreditNote] = useEditCreditNoteMutation();

  const { optionsList: saleInvoiceListOptions } = useListOptions(saleInvoiceListResponse?.data?.results, {
    value: 'id',
    label: 'invoice_formatted_number',
  });
  const { optionsList: itemsListOptions } = useListOptions(
    itemsListResponse?.data?.results,
    {
      value: 'item_name',
      label: 'item_name',
    },
    ['sale_price', 'item_type', 'cost_price', 'remaining_stock', 'weighted_cost_price']
  );
  const { optionsList: bankAccountOptions } = useListOptions(bankAccountResponse?.data?.results, {
    value: 'chart_of_account',
    label: 'bank_account_name',
  });

  const { initialValues, isLoading } = useInitialValues(
    creditNoteInitialValues,
    useGetSingleCreditNoteQuery,
    null,
    true,
    false,
    null
  );

  const purchaseItemsInputList = useMemo(
    () => [
      {
        name: 'service_type',
        placeholder: 'Item',
        isSelect: true,
        disabled: true,
        options: itemsListOptions || [],
        width: '15%',
        onChange: handleChangeItem,
      },
      {
        name: 'num_nights',
        placeholder: 'Quantity',
        type: 'number',
        onChange: handleChangeQuantity,
      },
      {
        name: 'unit_price_ex_vat',
        placeholder: 'Unit Price',
        type: 'number',
        disabled: true,
      },
      {
        name: 'gross_amount',
        placeholder: 'Gross Total',
        type: 'number',
        disabled: true,
      },
      {
        name: 'discount',
        placeholder: 'Discount',
        type: 'number',
        disabled: true,
        onChange: handleChangeDiscount,
      },
      {
        name: 'vat_rate',
        placeholder: 'VAT',
        isSelect: true,
        options: VAT_CHARGES,
        width: '15%',
        disabled: true,
        onChange: hanldeVATChange,
      },
      {
        name: 'net_amount',
        placeholder: 'Net Amount',
        type: 'number',
        disabled: true,
      },
    ],
    [itemsListOptions]
  );

  const handleChangeSaleInvoice = (value, setFieldValue) => {
    const selectedSaleInvoice = saleInvoiceListResponse.data.results.filter(
      saleInvoice => saleInvoice.id === value
    );

    const selectedInvoiceItemsList = selectedSaleInvoice[0]?.invoice_items?.map(invoiceItems => ({
      ...invoiceItems,
      invoice_num_nights: invoiceItems.num_nights,
    }));
    if (setFieldValue) setFieldValue('credit_note_items', selectedInvoiceItemsList);
    return selectedInvoiceItemsList;
  };

  const updatedInitialValues = useMemo(() => {
    let newData = {
      ...initialValues,
    };
    if (id && initialValues?.invoice?.id) {
      newData = {
        ...newData,
        invoice: initialValues?.invoice?.id,
        credit_note_items: initialValues?.invoice?.invoice_items?.map(invoiceItems => ({
          ...invoiceItems,
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
            validationSchema={Yup.object({
              invoice: Yup.string().required('Invoice# is required'),

              credit_note_items: Yup.array().of(
                Yup.object().shape({
                  num_nights: Yup.number()
                    .required('Required')
                    .integer('Value must be an integer (without decimal)')
                    .max(Yup.ref('invoice_num_nights'), 'Must be less than Invoice item quantity')
                    .min(1, 'Must be more than 0')
                    .test('max-digits', 'Maximum 10 digits are allowed', value => `${value}`.length <= 10),
                })
              ),
            })}
            initialValues={updatedInitialValues}
            onSubmit={async (values, { setErrors }) => {
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
            }}
          >
            {({ setFieldValue }) => (
              <Form className="form form--horizontal mt-3 row">
                <FormikSelect
                  options={saleInvoiceListOptions}
                  name="invoice"
                  placeholder="Invoice Number"
                  label="Invoice Number"
                  startIcon={<TagIcon />}
                  disabled={Boolean(saleId)}
                  isRequired
                  onChange={value => handleChangeSaleInvoice(value, setFieldValue)}
                />
                <FormikDatePicker
                  name="credit_note_date"
                  type="text"
                  placeholder="Date"
                  displayFormat="yyyy-MM-dd"
                  label="Date"
                />

                <FormikSelect
                  options={bankAccountOptions}
                  name="account_num"
                  placeholder="Account"
                  label="Account"
                />
                <FormikSelect
                  options={bankAccountOptions}
                  name="credit_account_num"
                  placeholder="Credit Account Number"
                  label="Credit Acc No"
                />

                <FieldArray
                  render={props => (
                    <PurchaseItem
                      {...props}
                      disableAdd
                      name="credit_note_items"
                      inputList={purchaseItemsInputList}
                      // newList={NEW_PURCHASE_ITEM_OBJECT}
                    />
                  )}
                />

                <FormikField
                  name="customer_notes"
                  textArea
                  placeholder="Remarks"
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
