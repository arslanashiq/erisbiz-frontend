export const sortDataByType = unSorteData => {
  const data = {};
  if (unSorteData?.length >= 0) {
    unSorteData.forEach(item => {
      if (data[item.group]) {
        data[item.group].push(item);
      } else {
        data[item.group] = [];
        data[item.group].push(item);
      }
    });
  }
  return data;
};
export const test = '';
