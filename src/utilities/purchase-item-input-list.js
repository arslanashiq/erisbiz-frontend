export const PurchaseItemInputList = {
  service_type: {
    name: 'service_type',
    placeholder: 'Item',
    isSelect: true,
    // width: '20% !important',
    style: { minWidth: '200px !important' },
  },
  remaining_stock: {
    name: 'remaining_stock',
    placeholder: 'Available Stock',
    disabled: true,
    type: 'number',
    commonClassName: 'text-end',
    inputClassName: 'text-end',
  },
  num_nights: {
    name: 'num_nights',
    placeholder: 'Quantity',
    type: 'number',
    commonClassName: 'text-end',
    inputClassName: 'text-end',
  },
  unit_price_ex_vat: {
    name: 'unit_price_ex_vat',
    placeholder: 'Unit Price',
    type: 'number',
    commonClassName: 'text-end',
    inputClassName: 'text-end',
  },
  gross_amount: {
    name: 'gross_amount',
    placeholder: 'Gross Total',
    type: 'number',
    disabled: true,
    commonClassName: 'text-end',
    inputClassName: 'text-end',
  },
  discount: {
    name: 'discount',
    placeholder: 'Discount',
    type: 'number',
    commonClassName: 'text-end',
    inputClassName: 'text-end',
  },
  vat_rate: {
    name: 'vat_rate',
    placeholder: 'VAT',
    isSelect: true,
    width: '15%',
  },
  net_amount: {
    name: 'net_amount',
    placeholder: 'Net Amount',
    type: 'number',
    disabled: true,
    commonClassName: 'text-end',
    inputClassName: 'text-end',
  },
  cost_price: {
    name: 'cost_price',
    placeholder: 'Cost Price',
    type: 'number',
    commonClassName: 'text-end',
    inputClassName: 'text-end',
  },
};
export const test = '';
