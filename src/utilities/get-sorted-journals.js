export const handleGetSortedData = (journalObject, sortedList) => {
  const journalObjects = { ...journalObject };
  const sortedJournals = [];
  sortedList.forEach((COA, index) => {
    if (journalObject[COA]) {
      sortedJournals.splice(index, 0, { ...journalObjects[COA] });
      delete journalObjects[COA];
    }
  });
  const otherAccountsIndex = sortedList.indexOf('otherAccounts');
  Object.keys(journalObjects).forEach(journal => {
    sortedJournals.splice(otherAccountsIndex, 0, journalObjects[journal]);
  });

  return sortedJournals;
};

export const test = '';
