function sumNumbers(root) {
  function dfs(node, currentSum) {
    if (node === null) return 0;

    currentSum = currentSum * 10 + node.val;
    note("At node " + node.val + ": accumulated path number = " + currentSum);

    if (node.left === null && node.right === null) {
      note("Reached leaf node " + node.val + ", contributing " + currentSum + " to total sum");
      return currentSum;
    }

    return dfs(node.left, currentSum) + dfs(node.right, currentSum);
  }

  return dfs(root, 0);
}
