function kthSmallest(root, k) {
  let count = 0;
  let result = null;

  function inorder(node) {
    if (node === null || result !== null) return;

    inorder(node.left);

    if (result === null) {
      count++;
      note("Visited node " + node.val + " (rank #" + count + ")");
      if (count === k) {
        result = node.val;
        note("Found " + k + "-th smallest element: " + result);
        return;
      }
    }

    inorder(node.right);
  }

  inorder(root);
  return result;
}
