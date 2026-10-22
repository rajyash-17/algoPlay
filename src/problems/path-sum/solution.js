function hasPathSum(root, targetSum) {
  if (root === null) return false;

  const remaining = targetSum - root.val;
  note("At node " + root.val + ": remaining sum needed = " + remaining);

  if (root.left === null && root.right === null) {
    const isMatch = remaining === 0;
    note("Leaf reached. Sum matches: " + isMatch);
    return isMatch;
  }

  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}
