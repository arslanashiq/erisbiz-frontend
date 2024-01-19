import { NEW_PURCHASE_ITEM_OBJECT, VAT_CHARGES } from 'utilities/constants';

const handleSetValue = (setFieldValue, name, index, key, value) => {
  if (value >= 0) {
    setFieldValue(`${name}.${index}.${key}`, value);
  } else {
    setFieldValue(`${name}.${index}.${key}`, 0);
  }
};
export const handleChangeValues = (name, index, values, setFieldValue) => {
  setFieldValue(`${name}.${index}.service_type_name`, `${values.service_type}${index}`);

  // grossTotal
  const grossTotal = values.unit_price_ex_vat * values.num_nights;

  // discount
  const { discount } = values;

  // VAT
  const {
    value: selectedVatValue,
    percent: selectedVatPercent,
    label: selectedVatLabel,
  } = VAT_CHARGES.filter(vat => values.vat_rate === vat.value)[0] || VAT_CHARGES[0];
  const vatAmount = ((grossTotal - discount) / 100) * selectedVatPercent;

  const netAmount = grossTotal - discount + vatAmount;

  if (selectedVatValue) {
    setFieldValue(`${name}.${index}.vat_rate`, selectedVatValue);
    setFieldValue(`${name}.${index}.vat_rate_name`, selectedVatLabel);
  }
  handleSetValue(setFieldValue, name, index, 'vat_amount', Number(vatAmount.toFixed(2)));
  handleSetValue(setFieldValue, name, index, 'gross_amount', grossTotal);
  handleSetValue(setFieldValue, name, index, 'net_amount', netAmount.toFixed(2));
  setFieldValue(`${name}.${index}.amount_ex_vat`, (grossTotal || 0 - values.discount || 0).toFixed(2));
};

const handleChangeItem = (...args) => {
  const [name, index, , value, values, setFieldValue, itemsListOptions, allValues] = args;
  const selectedItem = itemsListOptions.filter(item => item.label === value);

  if (selectedItem[0].account_no) {
    setFieldValue(`${name}.${index}.chart_of_account`, selectedItem[0].account_no);
    setFieldValue(`${name}.${index}.expense_account`, selectedItem[0].account_no);
  }
  setFieldValue(`${name}.${index}.item_service_type`, selectedItem[0].item_type);
  setFieldValue(`${name}.${index}.weighted_cost_price`, selectedItem[0].weighted_cost_price);

  setFieldValue(`${name}.${index}.service_type`, selectedItem[0].value);
  setFieldValue(`${name}.${index}.service_type_name`, `${selectedItem[0].value}${index}`);

  if (selectedItem[0].item_type === 'Goods') {
    setFieldValue(`${name}.${index}.cost_price`, '');
    setFieldValue(`${name}.${index}.remaining_stock`, selectedItem[0].remaining_stock);
  } else {
    setFieldValue(`${name}.${index}.cost_price`, 0);
    setFieldValue(`${name}.${index}.remaining_stock`, 0);
  }

  const newValues = {
    ...values,
    service_type: selectedItem[0].value,
    unit_price_ex_vat: selectedItem[0].price,
    credit_account: allValues.credit_account,
  };
  return { newValues, selectedItem };
};
export const handleChangePurchaseItem = (...args) => {
  const { newValues, selectedItem } = handleChangeItem(...args);
  const [name, index, , , , setFieldValue] = args;
  setFieldValue(`${name}.${index}.unit_price_ex_vat`, selectedItem[0].cost_price);
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeSaleItem = (...args) => {
  const { newValues, selectedItem } = handleChangeItem(...args);
  const [name, index, , , , setFieldValue] = args;
  if (selectedItem[0].item_type === 'Goods') {
    setFieldValue(`${name}.${index}.unit_price_ex_vat`, selectedItem[0].price || selectedItem[0].sale_price);
  } else {
    setFieldValue(`${name}.${index}.unit_price_ex_vat`, 0);
  }
  handleChangeValues(name, index, newValues, setFieldValue);
};

export const handleChangeCostPrice = (...args) => {
  const [name, index, , value, values, setFieldValue, allValues] = args;
  const newValues = {
    ...values,
    cost_price: value,
    credit_account: allValues.credit_account,
  };
  setFieldValue(`${name}.${index}.cost_price`, value);
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeUnitPrice = (...args) => {
  const [name, index, , value, values, setFieldValue, allValues] = args;
  const newValues = {
    ...values,
    unit_price_ex_vat: value,
    credit_account: allValues.credit_account,
  };
  setFieldValue(`${name}.${index}.unit_price_ex_vat`, value);
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeQuantity = (...args) => {
  const [name, index, , value, values, setFieldValue, allValues, adjustDiscount] = args;
  if (adjustDiscount) {
    const perUnitDiscount = allValues[name][index].discountPerItem || 0;
    if (perUnitDiscount >= 0) {
      const newAppliedDiscount = Number((perUnitDiscount * value)?.toFixed(2)) || 0;
      setFieldValue(`${name}.${index}.discount`, newAppliedDiscount || 0);
    }
  }
  const newValues = {
    ...values,
    num_nights: value,
    num_units: value,
    credit_account: allValues.credit_account,
  };
  setFieldValue(`${name}.${index}.num_units`, value);
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const hanldeVATChange = (...args) => {
  const [name, index, , value, values, setFieldValue, allValues] = args;
  const newValues = { ...values, vat_rate: value, credit_account: allValues.credit_account };
  handleChangeValues(name, index, newValues, setFieldValue);
};
export const handleChangeDiscount = (...args) => {
  const [name, index, , value, values, setFieldValue, allValues] = args;
  const newValues = { ...values, discount: value, credit_account: allValues.credit_account };
  handleChangeValues(name, index, newValues, setFieldValue);
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

export const handleGetFormatedItemsData = itemsList => {
  if (itemsList?.length > 0) {
    return itemsList.map(item => ({
      service_type: item.service_type,
      service_type_name: item.service_type_name,
      num_units: item.num_nights,
      num_nights: item.num_nights,
      item_service_type: item.item_service_type,
      unit_price_ex_vat: item.unit_price_ex_vat,
      gross_amount: item.gross_amount,
      discount: item.discount,
      vat_amount: item.vat_amount,
      net_amount: item.net_amount,
      vat_rate: item.vat_rate,
      vat_rate_name: item.vat_rate_name || VAT_CHARGES[0].label,
      cost_price: item.cost_price,
      amount_ex_vat: item.amount_ex_vat,
      chart_of_account: item.chart_of_account,
    }));
  }
  return [];
};
const getRemainingStock = (currentItem, singleItem, addexistingQuantity) => {
  if (singleItem?.item_service_type === 'Goods') {
    return addexistingQuantity
      ? (currentItem?.remaining_stock || 0) + (singleItem?.num_nights || 0)
      : currentItem?.remaining_stock || 0;
  }
  return 0;
};
export const handleGetItemWithRemainingStock = (itemsList, itemsListOptions, addexistingQuantity = false) => {
  if (itemsListOptions?.length > 0 && itemsList?.length > 0) {
    const updatedItemsList = itemsList.map(singleItem => {
      const currentItem = itemsListOptions.filter(item => item.label === singleItem.service_type)[0];
      return {
        ...singleItem,
        remaining_stock: getRemainingStock(currentItem, singleItem, addexistingQuantity),
        weighted_cost_price: currentItem?.weighted_cost_price || 0,
      };
    });
    return updatedItemsList;
  }
  return itemsList || [NEW_PURCHASE_ITEM_OBJECT];
};

export const getPaidAmount = orderResponse => {
  let amount = orderResponse.without_change_grand_total || 0;
  if (orderResponse) {
    if (orderResponse?.refunded_amount) amount -= orderResponse.refunded_amount;
    if (orderResponse?.payment_amount) amount -= orderResponse.payment_amount;
    if (orderResponse?.credits_used) amount -= orderResponse.credits_used;
    if (orderResponse?.credit_applied) amount -= orderResponse.credit_applied;
  }
  return amount;
};
