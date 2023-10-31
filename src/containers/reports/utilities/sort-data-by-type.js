export const sortDataByType = (unSorteData, key = 'group') => {
  const data = {};
  if (unSorteData?.length >= 0) {
    unSorteData.forEach(item => {
      if (data[item[key]]) {
        data[item[key]].push(item);
      } else {
        data[item[key]] = [];
        data[item[key]].push(item);
      }
    });
  }
  return data;
};
export const test = '';
