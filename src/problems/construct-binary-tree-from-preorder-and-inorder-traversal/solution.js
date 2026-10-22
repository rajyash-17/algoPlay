function buildTree(preorder, inorder) {
  const inorderIndexMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderIndexMap.set(inorder[i], i);
  }

  let preIdx = 0;

  function helper(left, right) {
    if (left > right) return null;

    const rootVal = preorder[preIdx];
    preIdx++;
    const root = { val: rootVal, left: null, right: null };
    const mid = inorderIndexMap.get(rootVal);

    note("Creating node " + rootVal + " with inorder range [" + left + ", " + right + "]");
    root.left = helper(left, mid - 1);
    root.right = helper(mid + 1, right);

    return root;
  }

  return helper(0, inorder.length - 1);
}
