/**
 *
 * @param {URLSearchParams} query Pass object, returned by URLSearchParams
 * @param {object} queryObject Query parameters in form key value pair in object
 * @returns {string} Returns stringify query params
 */
const changeQueryParameters = (query, queryObject) => {
  Object.entries(queryObject).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    } else {
      query.delete(key);
    }
  });
  return query.toString();
};

export default changeQueryParameters;
