import getSearchParamsList from 'utilities/getSearchParamsList';

export const getSelectedFilter = FilterReportsList => {
  const searchQuery = window.location.search;
  let selectedFilter = '';
  const paramsList = getSearchParamsList();
  let filterDuration = searchQuery ? '' : 'this+month';
  if (searchQuery) {
    searchQuery.split('&').forEach(singleQuery => {
      if (singleQuery.includes('duration')) {
        let temp = singleQuery.replace('?', '');
        temp = temp.replace('%20', ' ');
        temp = temp.replace('+', ' ');
        temp = temp.replace('duration=', '');
        filterDuration = temp;
      }
    });
  }

  if (filterDuration) {
    selectedFilter = FilterReportsList.filter(filter => filter.value === filterDuration);
    if (selectedFilter.length > 0) {
      [selectedFilter] = selectedFilter;
    } else {
      [, , selectedFilter] = FilterReportsList;
    }
  } else {
    selectedFilter = FilterReportsList[FilterReportsList.length - 1];
  }
  const filterLength = Object.keys(paramsList)?.filter(key => key?.length > 0);

  return filterLength > 1 ? FilterReportsList[FilterReportsList.length - 1] : selectedFilter;
};

export const test = '';
