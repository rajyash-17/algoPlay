function buildTree(inorder, postorder) {
  const inorderIndexMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderIndexMap.set(inorder[i], i);
  }

  let postIdx = postorder.length - 1;

  function helper(left, right) {
    if (left > right) return null;

    const rootVal = postorder[postIdx];
    postIdx--;
    const root = { val: rootVal, left: null, right: null };
    const mid = inorderIndexMap.get(rootVal);

    note("Creating node " + rootVal + " from postorder; right subtree recurses first");
    root.right = helper(mid + 1, right);
    root.left = helper(left, mid - 1);

    return root;
  }

  return helper(0, inorder.length - 1);
}
