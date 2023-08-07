const checkSelectedDataUsed = (data, selected, key) => {
  if (data && data.length > 0 && selected && selected.length > 0 && key && data[0][key]) {
    return data.filter(row => selected.includes(row.id) && row[key]);
  }
  return [];
};

export default checkSelectedDataUsed;
