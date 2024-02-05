import { useLocation, useNavigate } from 'react-router';
import getSearchParamsList from 'utilities/getSearchParamsList';

function useReportHeaderFilters() {
  const navigate = useNavigate();
  const location = useLocation();

  const validateValue = (values, input) => {
    if (values[input] === '') return false;
    if (typeof values[input] === 'undefined') return false;
    if (typeof values[input] === 'object' && values[input]?.length > 0) return true;
    return true;
  };

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
  const handleSubmitCustomDateFilter = async (values, { setSubmitting }, handleClose) => {
    let newSearchQuery = findKeyInQueryParamsAndReplace('', 'duration', null);
    Object.keys(values).forEach(input => {
      if (validateValue(values, input)) {
        newSearchQuery = findKeyInQueryParamsAndReplace(newSearchQuery, input, values[input] || '');
      }
    });

    navigate({
      pathname: `${location.pathname}`,
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
        location.search,
        'duration',
        selectedFilterOption.value
      );
      navigate({
        pathname: `${location.pathname}`,
        search: newSearchQuery,
      });
    }
  };
  return { handleChangeFilter, handleSubmitCustomDateFilter };
}

export default useReportHeaderFilters;
