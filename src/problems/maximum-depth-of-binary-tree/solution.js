function maxDepth(root) {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  const depth = 1 + Math.max(leftDepth, rightDepth);

  note("At node " + root.val + ": left depth = " + leftDepth + ", right depth = " + rightDepth + ", max depth = " + depth);
  return depth;
}
