function isSymmetric(root) {
  if (root === null) return true;

  function isMirror(t1, t2) {
    if (t1 === null && t2 === null) return true;
    if (t1 === null || t2 === null) {
      note("One subtree is null while other is not; not symmetric");
      return false;
    }
    if (t1.val !== t2.val) {
      note("Value mismatch: t1.val (" + t1.val + ") !== t2.val (" + t2.val + ")");
      return false;
    }

    note("Values match (" + t1.val + "); checking outer pair and inner pair");
    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
  }

  note("Checking if left and right subtrees of root are mirrors");
  return isMirror(root.left, root.right);
}
