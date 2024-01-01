import { DEFAULT_PARAMS, ROWS_PER_PAGE } from './constants';

// General
export const getRowsPerPage = search => {
  const query = {};
  const limit = search.get('limit') || '';
  const offset = search.get('offset') || '';
  if (limit) {
    query.limit = limit;
  } else {
    query.limit = ROWS_PER_PAGE;
  }
  if (offset && offset !== '0') {
    query.offset = offset;
  } else {
    query.offset = 0;
  }
  return query;
};
export const getsearchQueryOffsetAndLimitParams = location => {
  let query = {};
  const search = new URLSearchParams(location.search);
  if (!search) return query;
  const limit = getRowsPerPage(search);
  query = { ...limit };
  return query;
};
export const handlePersonlizedFilterString = values => {
  let filter = '';
  Object.keys(values).forEach(key => {
    if (values[key]) {
      filter += `${key}=${values[key]}&`;
    }
  });
  return filter;
};

// Items
export const getItemStatusAndType = search => {
  const query = {};
  const filter = search.get('filter') || '';
  if (filter === 'True' || filter === 'False') {
    query.is_active = filter;
  }
  if (filter === 'Service' || filter === 'Goods') {
    query.item_type = filter;
  }
  return query;
};
export const getItemSearchQueryParams = location => {
  let query = {};
  const search = new URLSearchParams(location.search);
  if (!search) return query;
  const limit = getsearchQueryOffsetAndLimitParams(location);
  const filters = getItemStatusAndType(search);
  if (limit) {
    query = { ...filters, ...limit };
  } else {
    query = { ...filters, ...DEFAULT_PARAMS };
  }
  return query;
};

// Suppliers
export const getSupplierSearchQueryParams = location => location.search;
