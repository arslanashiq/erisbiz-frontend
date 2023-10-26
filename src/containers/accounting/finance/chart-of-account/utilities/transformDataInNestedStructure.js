function transformDataInNestedStructure(data, key = 'id') {
  const nodesById = {};
  const roots = [];
  try {
    if (data === undefined || data.length === 0) return [];

    data.forEach(item => {
      nodesById[item[key]] = {
        ...item,
        child_accounts: [],
      };

      if (item.parent_account === null) {
        roots.push(nodesById[item[key]]);
      }
    });

    data.forEach(item => {
      const node = nodesById[item[key]];
      if (item.parent_account === null) {
        return;
      }
      const parent = nodesById[item.parent_account];
      if (parent) {
        parent.child_accounts.push(node);
      }
    });
    data.forEach(item => {
      if (nodesById[item[key]]?.child_accounts?.length === 0) {
        delete nodesById[item[key]].child_accounts;
      }
    });

    return roots;
  } catch (error) {
    return roots;
  }
}

export default transformDataInNestedStructure;
