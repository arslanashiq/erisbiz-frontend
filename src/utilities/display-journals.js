export const displayJournalActionButton = setDefaultExpanded => {
  try {
    const Journal = document.getElementById('Journal');

    Journal.scrollIntoView({ behavior: 'smooth', });
    setDefaultExpanded(true);
  } catch (error) {
    // console.log(error)
  }
};

export const test = '';
