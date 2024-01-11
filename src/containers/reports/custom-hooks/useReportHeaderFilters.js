import { useNavigate } from 'react-router';

function useReportHeaderFilters() {
  const navigate = useNavigate();
  const findKeyInQueryParamsAndReplace = (search, queryKey, newQuery) => {
    const searchQuery = search.replace('?', '');
    let foundQueryKey = false;
    let newSearchQuery = '?';
    searchQuery.split('&').forEach(singleQuery => {
      if (singleQuery.includes(queryKey)) {
        foundQueryKey = true;
        if (newQuery) {
          newSearchQuery += `${queryKey}=${newQuery}&`;
        }
      } else {
        newSearchQuery += `${singleQuery}&`;
      }
    });
    if (newQuery) {
      if (!foundQueryKey && newQuery) {
        newSearchQuery += `${queryKey}=${newQuery}&`;
      }
    }
    return newSearchQuery.slice(0, -1);
  };
  const handleSubmitCustomDateFilter = async (values, { setSubmitting }, handleClose, customInputList) => {
    let newSearchQuery = '';
    customInputList.forEach(input => {
      newSearchQuery = findKeyInQueryParamsAndReplace(newSearchQuery, input.name, values[input.name] || '');
    });

    newSearchQuery = findKeyInQueryParamsAndReplace(newSearchQuery, 'duration', null);
    navigate({
      pathname: `${window.location.pathname}`,
      search: newSearchQuery,
    });

    setSubmitting(false);
    handleClose();
  };

  const handleChangeFilter = selectedFilterOption => {
    if (selectedFilterOption.value) {
      let newSearchQuery = findKeyInQueryParamsAndReplace(
        window.location.search,
        'duration',
        selectedFilterOption.value
      );
      newSearchQuery = findKeyInQueryParamsAndReplace(newSearchQuery, 'custom_start_date', null);
      newSearchQuery = findKeyInQueryParamsAndReplace(newSearchQuery, 'custom_end_date', null);
      navigate({
        pathname: `${window.location.pathname}`,
        search: newSearchQuery,
      });
    }
  };
  return { handleChangeFilter, handleSubmitCustomDateFilter };
}

export default useReportHeaderFilters;
