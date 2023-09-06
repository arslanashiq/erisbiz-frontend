/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { convertURLToFile } from 'utilities/helpers';

function useInitialValues(values, fetchDetailQuery, fileName = null, iseInititalValues = false) {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({ ...values });
  const queryResponse = fetchDetailQuery(id, { skip: !id });

  const handleUpdateInitialValues = async data => {
    let file = null;
    const fetchedData = {};
    Object.keys(iseInititalValues ? initialValues : data).forEach(key => {
      if (data[key] !== null || data[key] !== undefined) {
        if (typeof data[key] === 'number' || typeof data[key] === 'boolean') {
          fetchedData[key] = data[key].toString();
        } else {
          fetchedData[key] = data[key];
        }
      }
    });

    if (fileName && data[fileName]) {
      file = await convertURLToFile(data[fileName]);
      fetchedData[fileName] = file;
    }
    setInitialValues({ ...initialValues, ...fetchedData });
  };
  useEffect(() => {
    if (queryResponse.isSuccess) handleUpdateInitialValues(queryResponse.data);
    return () => {
      values = {};
    };
  }, [values, fetchDetailQuery, id, queryResponse]);
  return {
    initialValues,
    queryResponse,
    setInitialValues,
  };
}

export default useInitialValues;
