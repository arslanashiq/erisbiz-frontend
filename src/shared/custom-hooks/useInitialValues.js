/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { convertURLToFile } from 'utilities/helpers';

function useInitialValues(
  values,
  fetchDetailQuery,
  fileName = null,
  useInititalValues = false,
  isRefetch = false,
  alternateId = null,
  extraValues = {}
) {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({ ...values });
  const { data: queryData, isLoading } = fetchDetailQuery(id || alternateId, {
    skip: !id && !alternateId,
    refetchOnMountOrArgChange: isRefetch,
  });

  const handleUpdateInitialValues = async data => {
    let file = null;
    const fetchedData = {};
    Object.keys(useInititalValues ? values : data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        fetchedData[key] = data[key];
      }
    });

    if (fileName && data[fileName]) {
      file = await convertURLToFile(data[fileName]);
      fetchedData[fileName] = file;
    }

    const newData = { ...fetchedData, ...extraValues };
    setInitialValues(newData);
    return newData;
  };

  useEffect(() => {
    (async () => {
      if (queryData) {
        const updatedData = await handleUpdateInitialValues(queryData);
        setInitialValues(updatedData);
      }
    })();
  }, [values, fetchDetailQuery, id, queryData]);

  return {
    initialValues: { ...initialValues, ...extraValues },
    queryResponse: queryData,
    setInitialValues,
    isLoading,
  };
}

export default useInitialValues;
