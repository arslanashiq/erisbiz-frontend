import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { convertURLToFile } from 'utilities/helpers';

function useInitialValues(values, fetchDetailQuery, fileName = null) {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({ ...values });
  const response = fetchDetailQuery(id, { skip: !id });

  const handleUpdateInitialValues = async data => {
    let file = null;

    const fetchedData = {};
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'number' || typeof data[key] === 'boolean') {
        fetchedData[key] = data[key].toString();
      } else {
        fetchedData[key] = data[key];
      }
    });

    if (fileName && data[fileName]) {
      file = await convertURLToFile(data[fileName]);
      fetchedData[fileName] = file;
    }
    setInitialValues({ ...initialValues, ...fetchedData });
  };
  useEffect(() => {
    if (response.isSuccess) handleUpdateInitialValues(response.data);
  }, [id, response]);

  return {
    initialValues,
    setInitialValues,
  };
}

export default useInitialValues;
