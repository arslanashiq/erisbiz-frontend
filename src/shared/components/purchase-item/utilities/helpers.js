/* eslint-disable implicit-arrow-linebreak */
import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';

export const handleChangeValues = (name, index, values, setFieldValue) => {
  const grossTotal = values.unit_price_ex_vat * values.num_nights;
  const selectedVat = VAT_CHARGES.filter(vat => values.vat_rate === vat.value)[0] || VAT_CHARGES[0];

  const vatAmount = (grossTotal / 100) * selectedVat.percent;
  const vatRate = selectedVat.value;
  let netAmount = grossTotal + vatAmount;
  netAmount -= values.discount;

  setFieldValue(`${name}.${index}.chart_of_account`, values.credit_account);
  if (vatRate) {
    setFieldValue(`${name}.${index}.vat_rate`, vatRate);
  }
  if (vatAmount) {
    setFieldValue(`${name}.${index}.vat_amount`, Number(vatAmount.toFixed(2)));
  }
  if (grossTotal) {
    setFieldValue(`${name}.${index}.gross_amount`, grossTotal);
  }
  if (netAmount) {
    setFieldValue(`${name}.${index}.net_amount`, netAmount.toFixed(2));
  }
  setFieldValue(`${name}.${index}.amount_ex_vat`, (grossTotal || 0 - values.discount || 0).toFixed(2));
};
export const handleChangeItem = (
  name,
  index,
  key,
  value,
  values,
  setFieldValue,
  itemsListOptions,
  allValues
) => {
  const selectedItem = itemsListOptions.filter(item => item.label === value);
  setFieldValue(`${name}.${index}.unit_price_ex_vat`, selectedItem[0].price || selectedItem[0].sale_price);
  setFieldValue(`${name}.${index}.service_type`, selectedItem[0].value);
  setFieldValue(`${name}.${index}.service_type_name`, selectedItem[0].item_type);
  setFieldValue(
    `${name}.${index}.cost_price`,
    selectedItem[0].weighted_cost_price || selectedItem[0].cost_price
  );
  setFieldValue(`${name}.${index}.remaining_stock`, selectedItem[0].remaining_stock);
  const newValues = {
    ...values,
    service_type: selectedItem[0].value,
    unit_price_ex_vat: selectedItem[0].price,
    credit_account: allValues.credit_account,
  };

  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeCostPrice = (name, index, key, value, values, setFieldValue, allValues) => {
  const newValues = {
    ...values,
    cost_price: value,
    credit_account: allValues.credit_account,
  };
  setFieldValue(`${name}.${index}.cost_price`, value);
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeUnitPrice = (name, index, key, value, values, setFieldValue, allValues) => {
  const newValues = {
    ...values,
    unit_price_ex_vat: value,
    credit_account: allValues.credit_account,
  };
  setFieldValue(`${name}.${index}.unit_price_ex_vat`, value);
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeQuantity = (name, index, key, value, values, setFieldValue, allValues) => {
  const newValues = {
    ...values,
    num_nights: value,
    num_units: value,
    credit_account: allValues.credit_account,
  };
  setFieldValue(`${name}.${index}.num_units`, value);
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const hanldeVATChange = (name, index, key, value, values, setFieldValue, allValues) => {
  const newValues = { ...values, vat_rate: value, credit_account: allValues.credit_account };
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeDiscount = (name, index, key, value, values, setFieldValue, allValues) => {
  const newValues = { ...values, discount: value, credit_account: allValues.credit_account };
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeChartOfAccount = (value, allValues, key, setFieldValue) => {
  const newValues = [];
  allValues[key].forEach(item => {
    newValues.push({ ...item, chart_of_account: value });
  });
  setFieldValue(key, newValues);
};
export const handleCalculateTotalAmount = purchaseOrderItems => {
  let amountTotal = 0;
  let vatTotal = 0;
  let discountTotal = 0;
  let grandTotal = 0;
  purchaseOrderItems.forEach(item => {
    amountTotal += item.gross_amount || 0;
    vatTotal += item.vat_amount || 0;
    discountTotal += item.discount || 0;
  });

  grandTotal = amountTotal - discountTotal + vatTotal;
  return {
    without_change_amount_total: amountTotal.toFixed(2),
    without_change_vat_total: vatTotal.toFixed(2),
    without_change_grand_total: grandTotal.toFixed(2),
    without_change_discount_total: discountTotal.toFixed(2),
  };
};

export const handleGetFormatedItemsData = itemsList =>
  itemsList.map(item => ({
    service_type: item.service_type,
    num_units: item.num_nights,
    num_nights: item.num_nights,
    unit_price_ex_vat: item.unit_price_ex_vat,
    gross_amount: item.gross_amount,
    discount: item.discount,
    vat_amount: item.vat_amount,
    net_amount: item.net_amount,
    vat_rate: item.vat_rate,
    cost_price: item.cost_price,
    amount_ex_vat: item.amount_ex_vat,
  }));
export const handleGetItemWithRemainingStock = (itemsList, itemsListOptions, addexistingQuantity = false) => {
  if (itemsListOptions?.length > 0 && itemsList?.length > 0) {
    const updatedItemsList = itemsList.map(singleItem => {
      const currentItem = itemsListOptions.filter(item => item.label === singleItem.service_type)[0];
      return {
        ...singleItem,
        remaining_stock: addexistingQuantity
          ? (currentItem?.remaining_stock || 0) + (singleItem?.num_nights || 0)
          : currentItem?.remaining_stock || 0,
      };
    });
    return updatedItemsList;
  }
  return itemsList || [NEW_PURCHASE_ITEM_OBJECT];
};
