export const handleGetSortedData = (journalObject, sortedList) => {
  const sortedJournals = [];
  const newAccounts = [];
  Object.keys(journalObject).forEach(key => {
    if (sortedList.includes(key)) {
      const index = sortedList.indexOf(key);
      sortedJournals.splice(index, 0, journalObject[key]);
    } else {
      newAccounts.push(journalObject[key]);
    }
  });
  if (newAccounts.length > 0) {
    sortedJournals.splice(1, 0, ...newAccounts);
  }
  return sortedJournals;
};

export const test = '';
