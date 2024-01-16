import { useNavigate } from 'react-router';
import getSearchParamsList from 'utilities/getSearchParamsList';

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
    let newSearchQuery = findKeyInQueryParamsAndReplace('', 'duration', null);
    customInputList.forEach(input => {
      newSearchQuery = findKeyInQueryParamsAndReplace(newSearchQuery, input.name, values[input.name] || '');
    });

    navigate({
      pathname: `${window.location.pathname}`,
      search: newSearchQuery,
    });

    setSubmitting(false);
    handleClose();
  };

  const handleChangeFilter = selectedFilterOption => {
    if (selectedFilterOption.value) {
      const paramsList = getSearchParamsList();
      let newSearchQuery = '';
      Object.keys(paramsList).forEach(key => {
        newSearchQuery = findKeyInQueryParamsAndReplace(newSearchQuery, key, null);
      });
      newSearchQuery = findKeyInQueryParamsAndReplace(
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
