import { useEffect, useState } from 'react';

function useListOptions(dataList, requiredKeys, extraKeys = []) {
  const [optionsList, setOptionsList] = useState([]);
  useEffect(() => {
    if (dataList?.length > 0) {
      const options = [];
      dataList.forEach(data => {
        const singleOption = {
          label: data[requiredKeys.label],
          value: data[requiredKeys.value],
        };

        extraKeys.forEach(key => {
          singleOption[key] = data[key];
        });
        options.push(singleOption);
      });
      setOptionsList(options);
    }
  }, [dataList]);

  return {
    optionsList,
  };
}

export default useListOptions;
