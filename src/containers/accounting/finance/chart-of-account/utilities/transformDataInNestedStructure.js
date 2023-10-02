function transformDataInNestedStructure(data) {
  const nodesById = {};
  const roots = [];
  if (!data) return [];
  data.forEach(item => {
    nodesById[item.id] = {
      ...item,
      child_accounts: [],
    };

    if (item.parent_account === null) {
      roots.push(nodesById[item.id]);
    }
  });

  data.forEach(item => {
    const node = nodesById[item.id];
    if (item.parent_account === null) {
      return;
    }
    const parent = nodesById[item.parent_account];
    if (parent) {
      parent.child_accounts.push(node);
    }
  });

  data.forEach(item => {
    if (nodesById[item.id].child_accounts.length === 0) {
      delete nodesById[item.id].child_accounts;
    }
  });

  return roots;
}

export default transformDataInNestedStructure;
