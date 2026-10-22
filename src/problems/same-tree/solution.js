function isSameTree(p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) {
    note("Structure mismatch: one node is null and the other is not");
    return false;
  }

  if (p.val !== q.val) {
    note("Value mismatch: p.val (" + p.val + ") !== q.val (" + q.val + ")");
    return false;
  }

  note("Values match at (" + p.val + "); checking subtrees");
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
