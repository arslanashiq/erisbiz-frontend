const checkSelectedDataUsed = (data, selected, key) => {
  if (data.length > 0 && selected.length > 0 && key) {
    return data.filter(row => selected.includes(row.id) && row[key]);
  }
  return [];
};

export default checkSelectedDataUsed;
