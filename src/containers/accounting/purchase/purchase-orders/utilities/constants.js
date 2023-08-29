export const purchaseOrderStatusList = [
  { label: 'All', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Closed', value: 'closed' },
  { label: 'Issued', value: 'issued' },
];

export const purchaseOrderFilterInitialValues = {
  date: '',
  supplier_name: '',
  purchase_order_number: '',
  status: '',
};

export const purchaseOrderFiltersOptionsList = [
  {
    name: 'date',
    date: true,
    fullWidth: true,
    placeholder: 'Date',
  },
  {
    name: 'supplier_name',
    fullWidth: true,
    placeholder: 'Supplier Name',
  },
  {
    name: 'purchase_order_number',
    fullWidth: true,
    placeholder: 'Purchase Order Number',
  },
  {
    name: 'status',
    fullWidth: true,
    placeholder: 'Status',
    options: purchaseOrderStatusList,
  },
];
