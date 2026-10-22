function getMinimumDifference(root) {
  let minDiff = Infinity;
  let prevVal = null;

  function inorder(node) {
    if (node === null) return;

    inorder(node.left);

    if (prevVal !== null) {
      const diff = node.val - prevVal;
      if (diff < minDiff) {
        minDiff = diff;
        note("New minimum difference: " + minDiff + " (between " + prevVal + " and " + node.val + ")");
      } else {
        note("Difference: " + diff + " (between " + prevVal + " and " + node.val + ")");
      }
    } else {
      note("First inorder node: " + node.val);
    }
    prevVal = node.val;

    inorder(node.right);
  }

  inorder(root);
  return minDiff;
}
