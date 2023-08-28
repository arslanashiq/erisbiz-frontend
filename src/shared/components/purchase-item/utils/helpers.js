import { VAT_CHARGES, CURRENCY_ID } from 'utilities/constants';

export const handleChangeValues = (name, index, values, setFieldValue) => {
  const grossTotal = values.price * values.quantity;
  const vatRate = VAT_CHARGES[values.vat || 0].percent;
  const vatAmount = (grossTotal / 100) * VAT_CHARGES[values.vat || 0].percent;
  let netAmount = grossTotal + vatAmount;
  if (values.discount < netAmount) {
    netAmount -= values.discount;
  }
  if (vatRate) {
    setFieldValue(`${name}.${index}.vat_rate`, VAT_CHARGES[values.vat].value);
  }
  if (vatAmount) {
    setFieldValue(`${name}.${index}.vat_amount`, vatAmount);
  }
  if (grossTotal && grossTotal > 0) {
    setFieldValue(`${name}.${index}.total`, grossTotal);
  }
  if (netAmount && netAmount > 0) {
    setFieldValue(`${name}.${index}.net_amount`, netAmount.toFixed(2));
  }
  setFieldValue(`${name}.${index}.currency`, CURRENCY_ID);
};
export const handleChangeItem = (name, index, key, value, values, setFieldValue, itemsListOptions) => {
  const selectedItem = itemsListOptions.filter(item => item.label === value);
  setFieldValue(`${name}.${index}.price`, selectedItem[0].price);
  setFieldValue(`${name}.${index}.service_type`, selectedItem[0].type);
  setFieldValue(`${name}.${index}.name`, selectedItem[0].label);
  const newValues = {
    ...values,
    price: selectedItem[0].price,
  };

  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeQuantity = (name, index, key, value, values, setFieldValue) => {
  const newValues = { ...values, quantity: value };
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const hanldeVATChange = (name, index, key, value, values, setFieldValue) => {
  const newValues = { ...values, vat: value };
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
    amountTotal += item.total;
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
