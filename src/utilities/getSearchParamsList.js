function getSearchParamsList(location = window.location) {
  let paramsList = {};
  const list = [];
  if (!window?.location?.search) return paramsList;
  const search = location?.search?.replace('?', '');
  if (!search) return paramsList;

  const searchList = search.split('&') || [];
  if (searchList.length === 0) return paramsList;
  paramsList = searchList.forEach(item => {
    const [key, value] = item.split('=');

    if (key) {
      paramsList[key] = value;
      list.push(paramsList);
    }
  });

  return list[list.length - 1];
}

export default getSearchParamsList;
