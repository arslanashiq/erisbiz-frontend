export const displayJournalActionButton = setDefaultExpanded => {
  try {
    setDefaultExpanded(true);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 10);
  } catch (error) {
    // console.log(error)
  }
};

export const test = '';
