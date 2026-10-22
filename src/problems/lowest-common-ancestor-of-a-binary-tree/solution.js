function lowestCommonAncestor(root, pVal, qVal) {
  function findLCA(node) {
    if (node === null) return null;
    if (node.val === pVal || node.val === qVal) {
      note("Matched search target node (" + node.val + ")");
      return node;
    }

    const left = findLCA(node.left);
    const right = findLCA(node.right);

    if (left !== null && right !== null) {
      note("Node " + node.val + " is the LCA because targets are split across left and right branches");
      return node;
    }

    return left !== null ? left : right;
  }

  const result = findLCA(root);
  return result !== null ? result.val : null;
}
