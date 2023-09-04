import { CURRENCY_ID, VAT_CHARGES } from 'utilities/constants';

export const handleChangeValues = (name, index, values, setFieldValue) => {
  const grossTotal = values.unit_price_ex_vat * values.num_nights;
  const selectedVat = VAT_CHARGES.filter(vat => values.vat_rate === vat.value)[0] || VAT_CHARGES[0];

  const vatAmount = (grossTotal / 100) * selectedVat.percent;
  const vatRate = selectedVat.value;
  let netAmount = grossTotal + vatAmount;
  netAmount -= values.discount;

  if (vatRate) {
    setFieldValue(`${name}.${index}.vat_rate`, vatRate);
  }
  if (vatAmount) {
    setFieldValue(`${name}.${index}.vat_amount`, vatAmount);
  }
  if (grossTotal) {
    setFieldValue(`${name}.${index}.gross_amount`, grossTotal);
  }
  if (netAmount) {
    setFieldValue(`${name}.${index}.net_amount`, netAmount.toFixed(2));
  }
  setFieldValue(`${name}.${index}.currency`, CURRENCY_ID);
};
export const handleChangeItem = (name, index, key, value, values, setFieldValue, itemsListOptions) => {
  const selectedItem = itemsListOptions.filter(item => item.label === value);
  setFieldValue(`${name}.${index}.unit_price_ex_vat`, selectedItem[0].price);
  setFieldValue(`${name}.${index}.service_type`, selectedItem[0].value);
  const newValues = {
    ...values,
    service_type: selectedItem[0].value,
    unit_price_ex_vat: selectedItem[0].price,
  };

  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeQuantity = (name, index, key, value, values, setFieldValue) => {
  const newValues = { ...values, num_nights: value };
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const hanldeVATChange = (name, index, key, value, values, setFieldValue) => {
  const newValues = { ...values, vat_rate: value };
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeDiscount = (name, index, key, value, values, setFieldValue) => {
  const newValues = { ...values, discount: value };
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleCalculateTotalAmount = purchaseOrderItems => {
  let amountTotal = 0;
  let vatTotal = 0;
  let discountTotal = 0;
  let grandTotal = 0;
  purchaseOrderItems.forEach(item => {
    amountTotal += item.gross_amount;
    vatTotal += item.vat_amount;
    discountTotal += item.discount;
  });

  grandTotal = amountTotal - discountTotal + vatTotal;
  return {
    without_change_amount_total: amountTotal.toFixed(2),
    without_change_vat_total: vatTotal.toFixed(2),
    without_change_grand_total: grandTotal.toFixed(2),
    without_change_discount_total: discountTotal.toFixed(2),
  };
};
