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
        newSearchQuery += `${queryKey}=${newQuery}&`;
      } else {
        newSearchQuery += `${singleQuery}&`;
      }
    });
    if (!foundQueryKey && newQuery) {
      newSearchQuery += `${queryKey}=${newQuery}&`;
    }
    return newSearchQuery.slice(0, -1);
  };
  const handleSubmitCustomDateFilter = async (values, { setSubmitting }, handleClose) => {
    let newSearchQuery = findKeyInQueryParamsAndReplace(
      window.location.search,
      'custom_start_date',
      values.start_date
    );
    newSearchQuery = findKeyInQueryParamsAndReplace(newSearchQuery, 'custom_end_date', values.end_date);
    navigate({
      pathname: `${window.location.pathname}`,
      search: newSearchQuery,
    });

    setSubmitting(false);
    handleClose();
  };

  const handleChangeFilter = selectedFilterOption => {
    if (selectedFilterOption.value) {
      const newSearchQuery = findKeyInQueryParamsAndReplace(
        window.location.search,
        'duration',
        selectedFilterOption.value
      );
      navigate({
        pathname: `${window.location.pathname}`,
        search: newSearchQuery,
      });
    }
  };
  return { handleChangeFilter, handleSubmitCustomDateFilter };
}

export default useReportHeaderFilters;
