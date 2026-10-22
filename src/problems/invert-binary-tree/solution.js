function invertTree(root) {
  if (root === null) return null;

  note("At node " + root.val + ": swapping left and right subtrees");
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
}
