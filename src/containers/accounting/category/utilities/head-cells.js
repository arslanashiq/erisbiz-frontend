export const test = '';

export const categoryHeadCells = [
  {
    id: 'category_name',
    numeric: true,
    disablePadding: false,
    label: 'Category Name',
    align: 'left',
  },
  {
    id: 'created_by',
    numeric: false,
    disablePadding: true,
    label: 'Created By',
    align: 'left',
    cellValueAction: ({ username }) => username || '-',
    isLink: false,
  },
];
