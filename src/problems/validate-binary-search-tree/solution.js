function isValidBST(root) {
  function validate(node, min, max) {
    if (node === null) return true;

    if (min !== null && node.val <= min) {
      note("Violation: node " + node.val + " <= minimum allowed " + min);
      return false;
    }
    if (max !== null && node.val >= max) {
      note("Violation: node " + node.val + " >= maximum allowed " + max);
      return false;
    }

    note("Node " + node.val + " is valid within (" + min + ", " + max + ")");
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }

  return validate(root, null, null);
}
