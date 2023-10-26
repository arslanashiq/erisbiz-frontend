export const getSelectedFilter = FilterReportsList => {
  const searchQuery = window.location.search;
  let selectedFilter = '';
  let filterDuration = 'this+month';
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
  }
  return selectedFilter;
};

export const test = '';
