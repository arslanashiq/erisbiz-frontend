import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { convertURLToFile } from 'utilities/helpers';

function useInitialValues(values, fetchDetailQuery, fileName = null, useInititalValues = false) {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({ ...values });
  const [stateUpdated, setStateUpdated] = useState(false);
  const queryResponse = fetchDetailQuery(id, { skip: !id });

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
    if (queryResponse.isSuccess) handleUpdateInitialValues(queryResponse.data);
  }, [values, fetchDetailQuery, id, queryResponse]);

  return {
    initialValues,
    queryResponse,
    setInitialValues,
    stateUpdated,
    setStateUpdated,
  };
}

export default useInitialValues;
