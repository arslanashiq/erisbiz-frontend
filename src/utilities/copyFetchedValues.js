export default function copyFetchedValues(keyObject, dataObject) {
  const newData = {};
  Object.keys(keyObject).forEach(key => {
    newData[key] = dataObject[key];
  });

  return newData;
}
