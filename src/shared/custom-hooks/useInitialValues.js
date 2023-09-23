import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { convertURLToFile } from 'utilities/helpers';

function useInitialValues(
  values,
  fetchDetailQuery,
  fileName = null,
  useInititalValues = false,
  isRefetch = false
) {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({ ...values });
  const [stateUpdated, setStateUpdated] = useState(false);
  const { data: queryData, isLoading } = fetchDetailQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: isRefetch,
  });

  const handleUpdateInitialValues = async data => {
    let file = null;
    const fetchedData = {};

    Object.keys(useInititalValues ? values : data).forEach(key => {
      if (data[key] !== null || data[key] !== undefined) {
        // if (typeof data[key] === 'boolean') {
        // fetchedData[key] = data[key];
        // } else {
        fetchedData[key] = data[key];
        // }
      }
    });

    if (fileName && data[fileName]) {
      file = await convertURLToFile(data[fileName]);
      fetchedData[fileName] = file;
    }
    setInitialValues({ ...initialValues, ...fetchedData });
  };

  useEffect(() => {
    if (queryData) handleUpdateInitialValues(queryData);
  }, [values, fetchDetailQuery, id, queryData]);

  return {
    initialValues,
    queryResponse: queryData,
    setInitialValues,
    stateUpdated,
    setStateUpdated,
    isLoading,
  };
}

export default useInitialValues;
